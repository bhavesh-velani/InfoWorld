import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

const IndexPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("user");

  const handleExplore = () => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 relative overflow-hidden">
      {/* Floating background shape */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse delay-1000"></div>

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 w-full z-50
                   flex justify-between items-center
                   px-8 py-4
                   bg-white/30 backdrop-blur-md border-b border-white/20"
      >
        {/* Logo / Brand */}
        <h1
          className="text-3xl font-extrabold tracking-wide 
                     bg-gradient-to-r from-cyan-500 to-blue-600 
                     bg-clip-text text-transparent cursor-pointer"
        >
          InfoWorld
        </h1>

        {/* Login Button */}
        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 
                     hover:from-cyan-600 hover:to-blue-700
                     text-white font-semibold px-6 py-2 rounded-full 
                     shadow-md transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <main
        className="h-screen w-screen flex-grow flex flex-col justify-center items-center text-center px-6 relative z-10
                   pt-32 md:pt-40" // 👈 this fixes hero moving under navbar
      >
        <h2 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 leading-tight mb-6 drop-shadow">
          Your Gateway to
          <span className="block">
            Trusted News
          </span>
        </h2>


        <p className="max-w-2xl text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
          Stay ahead with{" "}
          <span className="font-semibold text-blue-400">real-time updates</span>, verified reports,
          and insightful stories. Covering politics, technology, health, sports, and entertainment —
          <span className="font-semibold text-blue-400"> InfoWorld</span> delivers the world in your
          hands.
        </p>

        <button
          onClick={handleExplore}
          className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 
                     hover:to-blue-600 rounded-full text-white text-lg shadow-lg 
                     font-semibold tracking-wide transition duration-300 transform hover:scale-110"
        >
          🚀 Explore Now
        </button>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default IndexPage;
