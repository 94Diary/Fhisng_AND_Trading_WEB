import Content from "./Content";
import Code from "./Code";
import Buttons from "../Buttons/Buttons";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // ดึงข้อมูลจาก localStorage ทุกครั้งที่เปิดหน้านี้
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
      setRole(user.role);
    } else {
      // ถ้าไม่มี user ให้กลับหน้า login
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUsername(null);
    setRole(null);
    navigate("/");
  };

  return (
    <div className="flex-1 flex h-full w-full pt-20">
      {/* Center Panel */}
      <div className="flex-1 flex flex-col m-8 rounded-3xl">
        {/* Top Center */}
        <div className="h-1/8 bg-transparent m-12 p-4">
          <Code />
        </div>

        {/* Bottom Center */}
        <div className="flex-1 h-64 overflow-auto m-8 p-6 gap-11 bg-gray-800 rounded-3xl">
          <Content
            imageUrl="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSgQJolH1qSi-mDOWfYmceIBY6Bjf2sxUlI026bF3FtyV5_75tzIZz3Vd7kK3xVW5iKCjM1D_nIJ7WNZUjtIxBNVVX0IMuSdrIN2ImOww"
            title="Welcome to the Home Page"
            description="สวัสดี ยินดีต้อนรับสู่หน้าแรกของเว็บไซต์ของเรา..."
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/5 flex flex-col">
        {username ? (
          <div className="flex flex-col gap-4 justify-center items-center m-4 bg-gray-800/60 p-5 text-white rounded-3xl">
            <p className="text-lg font-semibold">👋 สวัสดี {username}</p>
            <p className="text-sm text-gray-400">Role: {role}</p>
            <Buttons variant="back" onClick={handleLogout}>
              Logout
            </Buttons>
          </div>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center m-4 bg-gray-800/60 p-5 text-red-500 rounded-3xl">
            <Buttons variant="login">
              <Link to="/PROFILE/Login">Login</Link>
            </Buttons>
            <Buttons variant="register">
              <Link to="/PROFILE/RegisterPage">Register</Link>
            </Buttons>
          </div>
        )}

        <div className="flex-1 m-4 bg-gray-800/80 p-4 text-red-500">
          ขวา
        </div>
      </div>
    </div>
  );
};

export default Home;
