import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [uploadedNews, setUploadedNews] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    axios
      .get(`http://localhost:5000/api/dashboard/${parsedUser.id}/${parsedUser.accountType}`)
      .then((res) => setDashboardData(res.data));

    axios.get("http://localhost:5000/api/news").then((res) => setNewsData(res.data));
  }, [navigate]);

  useEffect(() => {
    if (!dashboardData || newsData.length === 0) return;
    if (user.accountType === "reporter") {
      const uploaded = newsData.filter((n) => n.reporterId === dashboardData.reporterId);
      setUploadedNews(uploaded);
    } else if (user.accountType === "user") {
      const liked = newsData.filter((n) => n.likes.includes(dashboardData.userId));
      setUploadedNews(liked);
    }
  }, [dashboardData, newsData, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user || !dashboardData) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-cyan-50 px-4">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-cyan-500 border-b-4 border-cyan-300"></div>
        <p className="mt-6 text-cyan-600 font-bold text-xl">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyan-50 text-cyan-900 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-2 sm:px-4 md:px-10 py-10 sm:py-16 md:py-20 flex flex-col md:flex-row gap-8 md:gap-20">
        {/* Left Sidebar - Profile + Details */}
        <div className="w-full md:w-[375px] lg:w-[450px] bg-cyan-100 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-cyan-300 flex flex-col items-center mb-8 md:mb-0">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              dashboardData.name
            )}&background=06b6d4&color=ffffff&size=160`}
            alt="Profile"
            className="rounded-full w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mb-8 shadow-lg border-8 border-cyan-500 object-cover"
          />
          {/* Personal details below profile photo */}
          <div className="w-full mt-6 text-left text-base sm:text-lg leading-relaxed space-y-4 text-cyan-800">
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-700 border-b-4 border-cyan-500 pb-3 mb-6">
              Personal Info
            </h2>
            <ul className="space-y-3">
              <li>
                <span className="font-semibold text-cyan-700">Name:</span> {dashboardData.name}
              </li>
              <li>
                <span className="font-semibold text-cyan-700">Email:</span> {dashboardData.email}
              </li>
              {user.accountType === "user" && (
                <li>
                  <span className="font-semibold text-cyan-700">User ID:</span> {dashboardData.userId}
                </li>
              )}
              {user.accountType === "reporter" && (
                <>
                  <li>
                    <span className="font-semibold text-cyan-700">Reporter ID:</span>{" "}
                    {dashboardData.reporterId}
                  </li>
                  <li>
                    <span className="font-semibold text-cyan-700">Education:</span>{" "}
                    {dashboardData.education}
                  </li>
                  <li>
                    <span className="font-semibold text-cyan-700">Address:</span>{" "}
                    {dashboardData.address}
                  </li>
                  <li>
                    <span className="font-semibold text-cyan-700">Mobile:</span> {dashboardData.mobile}
                  </li>
                </>
              )}
            </ul>
          </div>

          <button
            onClick={handleLogout}
            className="mt-auto w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-10 rounded-full shadow-lg transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Right Content - news list */}
        <section className="flex-grow bg-white rounded-3xl shadow-xl p-5 sm:p-8 md:p-10 flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-cyan-700 mb-4 sm:mb-6 border-b-2 border-cyan-400 pb-2">
            {user.accountType === "reporter"
              ? "News You've Uploaded"
              : "News You've Liked or Commented"}
          </h2>
          {uploadedNews.length === 0 ? (
            <p className="text-cyan-600 italic text-base sm:text-lg">No news to show...</p>
          ) : (
            <ul className="space-y-5 sm:space-y-8 max-h-[340px] sm:max-h-[420px] md:max-h-[480px] pr-1 sm:pr-2 overflow-y-auto hide-scrollbar">
              {uploadedNews.map((n) => (
                <li
                  key={n._id}
                  className="border rounded-2xl border-cyan-300 p-4 sm:p-6 shadow-md hover:shadow-cyan-400/40 transition-shadow cursor-pointer"
                  title={n.title}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-cyan-900 mb-1 sm:mb-2">{n.title}</h3>
                  <p className="text-xs sm:text-sm text-cyan-700 line-clamp-3">{n.content}</p>
                  <p className="mt-2 text-xs text-cyan-500">
                    Likes: {n.likes.length} | Comments: {n.comments.length}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
