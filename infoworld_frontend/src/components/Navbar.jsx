import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import profile from "../assets/profile.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Helper function to detect active link
  const isActive = (path) => location.pathname === path;

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex flex-wrap items-center justify-between px-6 py-4 bg-white/0 backdrop-blur-md"
      role="navigation"
    >
      {/* Logo */}
      <h1
        onClick={() => {
          navigate("/");
          setMenuOpen(false);
        }}
        className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent cursor-pointer"
      >
        InfoWorld
      </h1>

      {/* Hamburger button - visible on small screens */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center text-cyan-700 focus:outline-none"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Navigation Links */}
      <div
        className={`w-full md:flex md:items-center md:w-auto md:justify-center ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col md:flex-row md:space-x-8 text-lg">
          {[
            { to: "/home", label: "Home" },
            { to: "/latest", label: "Latest" },
            { to: "/category", label: "Category" },
            { to: "/news", label: "News" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`relative font-semibold transition px-3 py-2 cursor-pointer ${
                isActive(to)
                  ? "text-cyan-600"
                  : "text-gray-800 hover:text-cyan-600"
              }`}
            >
              {label}
              {isActive(to) && (
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-cyan-600 rounded"></span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Profile */}
      <div className="rounded-full overflow-hidden w-10 h-10 hover:scale-110 transition-transform duration-300 border border-cyan-200 ml-4 flex-shrink-0">
        <Link to="/dashboard">
          <img
            src={profile}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
