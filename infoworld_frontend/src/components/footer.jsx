import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="relative bg-blue-400 text-white pt-14 pb-8 px-2 mt-16 z-30">

    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start md:justify-between gap-10 px-4">
      {/* Left: Logo & Social */}
      <div className="flex flex-col items-center md:items-start gap-3 max-w-xs">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-2xl tracking-wide bg-white bg-clip-text text-transparent">
            InfoWorld
          </span>
        </div>
        <p className="text-md italic text-cyan-100">
          "Stay informed with the latest headlines, in-depth analysis,<br className="hidden md:inline" />
          and breaking news from around the world."
        </p>
        <div className="flex gap-4 mt-2">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-cyan-300 transition"
          >
            <FaTwitter size={22} />
          </a>

          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-cyan-300 transition"
          >
            <FaFacebook size={22} />
          </a>

          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-cyan-300 transition"
          >
            <FaInstagram size={22} />
          </a>
        </div>
      </div>

      {/* Center: About */}
      <div className="text-center md:text-left max-w-xs">
        <h4 className="font-bold text-2xl mb-1 text-white">About InfoWorld</h4>
        <p className="text-md text-cyan-100">
          InfoWorld delivers breaking news, expert analysis, and in-depth features on technology, business, science, and world events.<br className="hidden md:inline" />
          Our mission is to keep you informed and inspired every day.
        </p>
      </div>

      {/* Right: Contact */}
      <div className="text-center md:text-left max-w-xs">
        <h4 className="font-bold text-2xl mb-1 text-white">Contact Us</h4>
        <p className="text-md text-cyan-100">Email:
          <a href="mailto:news@infoworld.com" className="underline hover:text-cyan-300 ml-1 transition">news@infoworld.com</a>
        </p>
        <p className="text-md text-cyan-100">Phone: +91-12345-67890</p>
        <p className="text-md text-cyan-100 mt-2">
          <span className="font-semibold">Address:</span> 123 News Avenue, Bengaluru, India
        </p>
      </div>
    </div>
    <div className="text-center text-md text-white mt-11 tracking-wide">
      &copy; {new Date().getFullYear()} InfoWorld News. All rights reserved.
    </div>
  </footer>
);

export default Footer;
