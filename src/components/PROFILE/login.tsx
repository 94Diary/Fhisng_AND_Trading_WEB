import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Buttons from "../Buttons/Buttons";
import { useAppContext } from "../../context/AppContext";

const Login = () => {
  const { login } = useAppContext(); //  ดึง login จาก Context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const success = login(username, password); //  ใช้ระบบจาก context
    if (success) {
      const user = JSON.parse(localStorage.getItem("user")!);
      if (user.role === "admin") navigate("/user/userHome");
      else navigate("/user/userHome");
    } else {
      setError("Username หรือ Password ไม่ถูกต้อง");
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900/50 p-4">
      {/* Card กลาง */}
      <div className="w-full max-w-md bg-gray-800 rounded-3xl p-8 shadow-lg flex flex-col gap-6 text-white">
        <h1 className="text-3xl font-bold text-center">Login</h1>


        {/* ฟอร์ม */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"

          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div className="flex flex-col items-center justify-center">
          {/* ปุ่ม Login */}
          <Buttons type="submit" variant="login">
            Login
          </Buttons>
          </div>

        </form>
        

        {/* ลิงก์ Register */}
        <p className="text-center text-gray-300">
          ยังไม่มีบัญชี?{" "}
          <Link to="/PROFILE/RegisterPage" className="text-blue-400 font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
