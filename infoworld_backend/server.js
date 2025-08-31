import { compare, hash } from 'bcryptjs';
import cors from 'cors';
import { randomBytes } from 'crypto';
import express from 'express';
import mongoose, { Schema, model } from 'mongoose';
import { createTransport } from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/infoworld', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new Schema({
  name: String,
  email: String,
  userId: String,
  password: String
});

const reporterSchema = new Schema({
  name: String,
  email: String,
  reporterId: String,
  password: String,
  education: String,
  address: String,
  mobile: String
});

const User = model('userdata', userSchema);
const Reporter = model('reporterdata', reporterSchema);

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'bhaveshvelani324@gmail.com',
    pass: 'ovaq yflm ujya ymim'
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { accountType, name, email, password, education, address, mobile } = req.body;
    if (!name || !email || !password) return res.status(400).json({ msg: 'Required fields missing' });
    let hashedPassword = await hash(password, 10);

    if (accountType === 'user') {
      const userId = 'U-' + randomBytes(4).toString('hex').toUpperCase();
      const newUser = new User({ name, email, userId, password: hashedPassword });
      await newUser.save();
      await transporter.sendMail({
        from: 'bhaveshvelani324@gmail.com',
        to: email,
        subject: 'Registration Successful',
        text: `Welcome to infoworld, ${name}! Your User ID is ${userId}`
      });
      return res.json({ success: true, type: 'user', userId });
    } else if (accountType === 'reporter') {
      const reporterId = 'R-' + randomBytes(4).toString('hex').toUpperCase();
      if (!education || !address || !mobile)
        return res.status(400).json({ msg: 'All reporter details required' });
      const newReporter = new Reporter({
        name, email, reporterId, password: hashedPassword, education, address, mobile
      });
      await newReporter.save();
      await transporter.sendMail({
        from: 'bhaveshvelani324@gmail.com',
        to: email,
        subject: 'Registration Successful',
        text: `Welcome to infoworld, ${name}! Your Reporter ID is ${reporterId}`
      });
      return res.json({ success: true, type: 'reporter', reporterId });
    } else {
      return res.status(400).json({ msg: 'Invalid account type' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { accountType, id, password } = req.body;
    let user;
    if (accountType === 'user') {
      user = await User.findOne({ userId: id });
    } else if (accountType === 'reporter') {
      user = await Reporter.findOne({ reporterId: id });
    } else {
      return res.status(400).json({ msg: 'Invalid account type' });
    }
    if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    res.json({
      success: true,
      name: user.name,
      id: accountType === 'user' ? user.userId : user.reporterId,
      accountType,
      email: user.email,
      ...(accountType === 'reporter' && {
        education: user.education,
        address: user.address,
        mobile: user.mobile
      })
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// Dashboard Route
app.get('/api/dashboard/:id/:type', async (req, res) => {
  try {
    const { id, type } = req.params;
    let data;
    if (type === 'user') {
      data = await User.findOne({ userId: id }).select('-password');
    } else if (type === 'reporter') {
      data = await Reporter.findOne({ reporterId: id }).select('-password');
    } else {
      return res.status(400).json({ msg: 'Invalid type' });
    }
    if (!data) return res.status(404).json({ msg: 'Not found' });
    res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

const newsSchema = new Schema({
  title: String,
  content: String,
  reporterName: String,
  reporterId: String,
  date: Date,
  likes: [String],
  comments: [
    {
      userId: String,
      userName: String,
      comment: String,
      date: Date
    }
  ]
});

const News = model('news', newsSchema);

// Get all news
app.get('/api/news', async (req, res) => {
  try {
    let news = await News.find().sort({ date: -1 });
    // Populate userName for comments if missing
    const userIds = new Set();
    news.forEach(n => {
      n.comments.forEach(c => {
        if (!c.userName && c.userId) userIds.add(c.userId);
      });
    });
    let userIdToName = {};
    if (userIds.size > 0) {
      const users = await User.find({ userId: { $in: Array.from(userIds) } });
      users.forEach(u => { userIdToName[u.userId] = u.name; });
    }
    // Attach userName to comments if missing
    news = news.map(n => {
      const nObj = n.toObject();
      nObj.comments = nObj.comments.map(c => {
        if (!c.userName && c.userId && userIdToName[c.userId]) {
          return { ...c, userName: userIdToName[c.userId] };
        }
        return c;
      });
      return nObj;
    });
    res.json(news);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create news (reporter only)
app.post('/api/news', async (req, res) => {
  try {
    const { title, content, reporterName, reporterId, date } = req.body;
    if (!title || !content || !reporterName || !reporterId) {
      return res.status(400).json({ msg: 'Missing fields' });
    }
    const news = new News({
      title,
      content,
      reporterName,
      reporterId,
      date: date ? new Date(date) : new Date(),
      likes: [],
      comments: []
    });
    await news.save();
    res.json(news);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Edit news (reporter only)
app.put('/api/news/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!news) return res.status(404).json({ msg: 'Not found' });
    res.json(news);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete news (reporter only)
app.delete('/api/news/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ msg: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

app.post('/api/news/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ msg: 'Not found' });
    if (!news.likes.includes(userId)) {
      news.likes.push(userId);
      await news.save();
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Comment on news (user only)
app.post('/api/news/:id/comment', async (req, res) => {
  try {
    const { userId, userName, comment, date } = req.body;
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ msg: 'Not found' });
    news.comments.push({
      userId,
      userName,
      comment,
      date: date ? new Date(date) : new Date()
    });
    await news.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));