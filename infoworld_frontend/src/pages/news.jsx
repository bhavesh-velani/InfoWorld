import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";

const API_BASE = "http://localhost:5000/api";

const News = ({ currentUser }) => {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newNews, setNewNews] = useState({ title: "", content: "" });
  const [uploading, setUploading] = useState(false);

  const [commentText, setCommentText] = useState({});
  const [openCommentBox, setOpenCommentBox] = useState({});
  const [commenting, setCommenting] = useState({});

  useEffect(() => {
    if (!currentUser) return;
    fetchNews();
  }, [currentUser]);

  const fetchNews = () => {
    setIsLoading(true);
    axios
      .get(`${API_BASE}/news`)
      .then((res) => {
        setNewsList(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  const handleLike = async (newsId) => {
    if (!currentUser || currentUser.accountType !== "user") return;
    try {
      await axios.post(`${API_BASE}/news/${newsId}/like`, { userId: currentUser.id });
      fetchNews();
    } catch {
      alert("Failed to like news");
    }
  };

  const toggleCommentBox = (newsId) => {
    setOpenCommentBox((prev) => ({
      ...prev,
      [newsId]: !prev[newsId],
    }));
  };

  const handleComment = async (newsId) => {
    if (!commentText[newsId]?.trim()) return;
    setCommenting((prev) => ({ ...prev, [newsId]: true }));
    try {
      await axios.post(`${API_BASE}/news/${newsId}/comment`, {
        userId: currentUser.id,
        userName: currentUser.name,
        comment: commentText[newsId],
      });
      setCommentText((prev) => ({ ...prev, [newsId]: "" }));
      fetchNews();
    } catch {
      alert("Failed to post comment");
    }
    setCommenting((prev) => ({ ...prev, [newsId]: false }));
    setOpenCommentBox((prev) => ({ ...prev, [newsId]: false }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newNews.title || !newNews.content) return;
    setUploading(true);
    try {
      await axios.post(`${API_BASE}/news`, {
        ...newNews,
        reporterName: currentUser.name,
        reporterId: currentUser.id,
        date: new Date().toISOString(),
      });
      setNewNews({ title: "", content: "" });
      fetchNews();
    } catch {
      alert("Failed to upload news");
    }
    setUploading(false);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cyan-700">
        <p>Please log in to view the news.</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col text-cyan-900">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-6 py-25 space-y-12">
        {/* Reporter Upload Form */}
        {currentUser.accountType === "reporter" && (
          <form onSubmit={handleUpload} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
            <h2 className="text-3xl font-semibold text-cyan-700">Upload News</h2>
            <input
              type="text"
              className="w-full border border-cyan-300 rounded-lg px-4 py-3 text-cyan-900 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              placeholder="News Title"
              value={newNews.title}
              onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
              required
            />
            <textarea
              className="w-full border border-cyan-300 rounded-lg px-4 py-3 text-cyan-900 font-semibold resize-y focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              rows={5}
              placeholder="News Content"
              value={newNews.content}
              onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
              required
            />
            <button
              type="submit"
              disabled={uploading}
              className={`bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {uploading ? "Uploading..." : "Upload News"}
            </button>
          </form>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center space-x-3 text-cyan-600">
            <div className="w-14 h-14 border-4 border-cyan-600 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-2xl font-semibold">Loading news...</p>
          </div>
        ) : (
          // News List
          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
            {newsList.map((news) => {
              const isLiked =
                currentUser.accountType === "user" && news.likes.includes(currentUser.id);
              return (
                <article
                  key={news._id}
                  className="bg-white rounded-3xl shadow-lg p-8 space-y-6 border border-cyan-200 hover:shadow-cyan-400/50 transition-shadow duration-300 transform hover:-translate-y-1"
                  tabIndex={0}
                  aria-label={`News: ${news.title}`}
                >
                  <h3 className="text-2xl font-extrabold text-cyan-800">{news.title}</h3>
                  <p className="text-cyan-700 text-base leading-relaxed">{news.content}</p>
                  <div className="text-sm text-cyan-500 mt-1">
                    Uploaded by:{" "}
                    <span className="font-semibold text-cyan-800">
                      {news.reporterName || "Unknown"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    {/* Like Button */}
                    <button
                      onClick={() => handleLike(news._id)}
                      aria-pressed={isLiked}
                      aria-label={isLiked ? "Unlike this news" : "Like this news"}
                      className="flex items-center space-x-2 text-cyan-600 hover:text-red-500 transition-colors font-semibold focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transition-colors ${
                          isLiked ? "fill-red-500 text-red-500" : "text-cyan-600"
                        }`}
                        viewBox="0 0 24 24"
                        fill={isLiked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <span>{news.likes.length}</span>
                    </button>

                    {/* Comment Toggle Button */}
                    <button
                      onClick={() => toggleCommentBox(news._id)}
                      className="text-cyan-600 hover:text-cyan-800 font-semibold focus:outline-none"
                    >
                      Comment ({news.comments.length})
                    </button>
                  </div>

                  {/* Comment Input */}
                  {openCommentBox[news._id] && (
                    <div className="mt-4 space-y-3">
                      <textarea
                        rows={3}
                        placeholder="Write your comment..."
                        className="w-full border border-cyan-300 rounded-lg p-3 text-cyan-900 font-semibold resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                        value={commentText[news._id] || ""}
                        onChange={(e) =>
                          setCommentText((prev) => ({
                            ...prev,
                            [news._id]: e.target.value,
                          }))
                        }
                      />
                      <button
                        onClick={() => handleComment(news._id)}
                        disabled={commenting[news._id]}
                        className={`bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition ${
                          commenting[news._id] ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {commenting[news._id] ? "Posting..." : "Post Comment"}
                      </button>
                    </div>
                  )}

                  {/* Comments List */}
                  {news.comments.length > 0 && (
                    <div className="mt-6 border-t border-cyan-200 pt-4 max-h-52 overflow-y-auto space-y-3 text-cyan-700 text-sm">
                      {news.comments.map((c, idx) => (
                        <p key={idx}>
                          <span className="text-cyan-500 font-semibold">{c.userName}:</span>{" "}
                          {c.comment}
                        </p>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default News;
