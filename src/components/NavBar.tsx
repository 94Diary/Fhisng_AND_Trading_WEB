import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800/80 p-0.4 text-white px-10 flex justify-center items-center w-full fixed top-0 left-0 z-10 shadow-md">
      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-20 items-center">
        <li>
          <Link to="/" className="hover:text-gray-200 text-2xl font-bold p-3 transition">
            Home
          </Link>
        </li>

        <li>
          <Link to="/webboard" className="hover:text-gray-200 text-2xl font-bold p-3 transition">
            WebBoard
          </Link>
        </li>

        {/* Logo / Brand */}
        <li
          className="w-20 h-20 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/logo_real.png')" }}
        ></li>

        <li>
          <Link to="/gallery" className="hover:text-gray-200 text-2xl font-bold p-3 transition">
            Gallery
          </Link>
        </li>

        <li>
          <Link to="/profile" className="hover:text-gray-200 text-2xl font-bold p-3 transition">
            Profile
          </Link>
        </li>
      </ul>

      {/* Hamburger Button (มือถือ) */}
      <div className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="w-6 h-1 bg-white my-1"></div>
        <div className="w-6 h-1 bg-white my-1"></div>
        <div className="w-6 h-1 bg-white my-1"></div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-blue-600 flex flex-col items-center md:hidden border-t border-blue-400/50">
          <li className="py-2 text-xl w-full text-center hover:bg-blue-500 cursor-pointer">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li className="py-2 text-xl w-full text-center hover:bg-blue-500 cursor-pointer">
            <Link to="/webboard" onClick={() => setIsOpen(false)}>WebBoard</Link>
          </li>
          <li className="py-2 text-xl w-full text-center hover:bg-blue-500 cursor-pointer">
            <Link to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
          </li>
          <li className="py-2 text-xl w-full text-center hover:bg-blue-500 cursor-pointer">
            <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
