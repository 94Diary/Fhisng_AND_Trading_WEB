import React, { useState } from "react";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 text-white px-10 flex justify-center items-center w-full h-3px fixed top-0 left-0 z-10">
    
      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-20">
        <li className="hover:text-gray-200 cursor-pointer text-5xl font-bold p-3">Home</li>
        <li className="hover:text-gray-200 cursor-pointer text-5xl font-bold p-3">WebBoard</li>
          {/* Logo / Brand */}
        <li className="w-20 h-20 bg-contain "style={{ backgroundImage: "url('/logo_real.png')" }}></li>
          {/* Logo / Brand */}
        <li className="hover:text-gray-200 cursor-pointer text-5xl font-bold p-3">Gallery</li>
        <li className="hover:text-gray-200 cursor-pointer text-5xl font-bold p-3">Profile</li>
      </ul>

      {/* Hamburger Button (มือถือ) */}
      <div className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {/* สามขีด */}
        <div className="w-6 h-1 bg-white my-1"></div>
        <div className="w-6 h-1 bg-white my-1"></div>
        <div className="w-6 h-1 bg-white my-1"></div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-blue-600 flex flex-col items-center md:hidden">
          <li className="py-2 text-xl w-full text-center hover:bg-blue-500 cursor-pointer">Home</li>
          <li className="py-2 text-xl w-full text-center hover:bg-blue-500 cursor-pointer">WebBoard</li>
          <li className="py-2 text-xl w-full text-center hover:bg-blue-500 cursor-pointer">Gallery</li>
          <li className="py-2 text-xl w-full text-center hover:bg-blue-500 cursor-pointer">Profile</li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
