import React, { useState } from "react";
import Buttons from "../Buttons/Buttons";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900/50 p-4">
      {/* Card กลาง */}
      <div className="w-full max-w-md bg-gray-800 rounded-3xl p-8 shadow-lg flex flex-col gap-6 text-white">
        <h1 className="text-3xl font-bold text-center">Register</h1>


        {/* ฟอร์ม */}
        <form className="flex flex-col gap-4">
          <input
            type="Username"
            placeholder="Username"
            className="px-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"

          />

          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"

          />

          <div className="flex flex-col items-center justify-center">
          {/* ปุ่ม Login */}
          <Buttons type="submit" variant="register">
            Register
          </Buttons>
          </div>

        </form>
        

        {/* ลิงก์ Register */}
        <p className="text-center text-gray-300">
          มีบัญชีแล้ว?{" "}
          <Link to="/PROFILE/Login" className="text-green-400 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
