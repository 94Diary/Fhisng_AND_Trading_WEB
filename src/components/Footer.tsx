import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SiRoblox } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto text-center">
        {/* บรรทัดโลโก้ + ข้อความ */}
        <div className="text-sm flex items-center justify-center gap-2">
          © {new Date().getFullYear()}
          <img
            className="w-10 h-10"
            src="/logo_real.png"
          />
          <span className="font-semibold">TinyTeam</span>
        </div>

        {/* โซเชียลไอคอน */}
        <div className="flex justify-center gap-6 mt-3 text-xl">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook className="hover:text-blue-500 transition-transform hover:scale-110" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="hover:text-pink-500 transition-transform hover:scale-110" />
          </a>
          <a href="https://www.roblox.com/communities/92637410/Tiny-Team-Std#!/about" target="_blank" rel="noreferrer">
            <SiRoblox className="hover:text-blue-500 transition-transform hover:scale-110"/>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
