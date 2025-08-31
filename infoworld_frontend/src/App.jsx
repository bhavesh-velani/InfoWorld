import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import IndexPage from './pages/index';
import Login from './pages/Login';
import Register from './pages/register';
import Latest from './pages/latest';
import Category from './pages/category';
import Dashboard from './pages/dashboard';
import News from './pages/news';

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/latest" element={<Latest />} />
      <Route path="/category" element={<Category />} />
      <Route path="/category/:categoryName" element={<Category />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/news" element={<News currentUser={user} />} />
    </Routes>
  );
}

export default App;