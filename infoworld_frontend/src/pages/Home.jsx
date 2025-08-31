import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const featuredNews = [
  {
    title: "Breaking: Market Hits Record High",
    desc: "Stock markets surge to new heights with tech leading the way. Find out what's driving the momentum.",
    link: "/latest",
  },
  {
    title: "Tech: AI Changing the World",
    desc: "Discover how artificial intelligence is impacting industries and daily life worldwide.",
    link: "/latest",
  },
  {
    title: "Weather: Monsoon Update",
    desc: "Heavy rains expected along coastal regions this weekend. Get the latest advisories and updates.",
    link: "/latest",
  },
];

const categories = ["Politics", "Technology", "Health", "Sports", "Entertainment"];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <div
        className="relative w-full h-screen flex flex-col justify-center items-center text-center 
                   bg-blue-400 text-white px-6"
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        {/* overlay for contrast & glassy look */}

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-wide drop-shadow-xl mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
              InfoWorld
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md mb-8">
            Your trusted source for{" "}
            <span className="font-semibold text-cyan-200">verified stories</span>,
            real-time updates, and the latest news across the world.
          </p>
          <Link
            to="/latest"
            className="inline-block bg-white/90 text-cyan-700 font-semibold text-lg px-10 py-4 rounded-full 
                       shadow-lg hover:bg-white hover:shadow-cyan-300/50 transition transform hover:scale-105"
          >
            Explore Latest News →
          </Link>
        </div>
      </div>

      {/* TRENDING NEWS */}
      <div className="px-4 py-16 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-10 text-cyan-800 tracking-wide">
          Trending Now
        </h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide>
            <div className="text-center text-xl font-medium">🌍 Climate Conference 2025: What to Expect</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center text-xl font-medium">🚀 ISRO Launches New Satellite Successfully</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center text-xl font-medium">📈 Sensex Crosses 80,000 Mark for First Time</div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* FEATURED NEWS */}
      <div className="bg-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <h2 className="text-3xl font-semibold text-center text-cyan-800 mb-14 tracking-tight">
            Featured News
          </h2>

          {/* News Grid */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {featuredNews.map((news, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                     transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image/Thumbnail placeholder */}
                <div className="h-52 bg-gradient-to-r from-cyan-200 to-blue-200 flex items-center justify-center">
                  <span className="text-6xl opacity-30">📰</span>
                </div>

                {/* Content */}
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-cyan-700 mb-3 group-hover:text-cyan-900 transition">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {news.desc}
                  </p>
                  <Link
                    to={news.link}
                    className="inline-block text-cyan-600 hover:text-cyan-800 font-semibold transition underline-offset-4"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* CATEGORIES */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Section Heading */}
          <h2 className="text-3xl font-semibold text-center mb-10 text-cyan-800 tracking-wide">
            Explore by Category
          </h2>

          {/* Category Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                className="relative px-8 py-3 rounded-full font-semibold text-cyan-700 
                     overflow-hidden shadow-md transition-transform transform
                     hover:scale-105 hover:shadow-lg group"
              >
                {/* Animated background (gradient slide) */}
                <span
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 
                       translate-x-[-100%] group-hover:translate-x-0 
                       transition-transform duration-500 ease-out"
                ></span>
                {/* Button Text */}
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
