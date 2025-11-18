import React, {useRef, useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Buttons from "../Buttons/Buttons";
import { Home, LogIn } from "lucide-react";

const Profile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
      // ดึงข้อมูลจาก localStorage ทุกครั้งที่เปิดหน้านี้
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUsername(user.username);
        setRole(user.role);
      } else {
        setShowPopup(true); //ถ้าไม่ได้ล็อคอินจะขึ้น ป๊อบอัพขึ้นมา
      }
    }, [navigate]);
  
    const handleLogout = () => {
      localStorage.removeItem("user");
      setUsername(null);
      setRole(null);
      navigate("/");
    };

  // ฟังก์ชันเมื่อเลือกไฟล์
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // ฟังก์ชันเมื่อคลิกที่กรอบ
  const handleImageClick = () => {
    fileInputRef.current?.click(); // trigger ให้เปิด file picker
  };

  if (!username) {return (
    <>
      {showPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 ">
        <div className="bg-gray-800 p-8 rounded-2xl text-center w-[350px] shadow-xl animate-pop">
          <h2 className="text-2xl font-bold mb-4 text-white motion-preset-bounce">คุณต้องล็อคอินก่อน</h2>
          <p className="text-gray-300 mb-6">กรุณาเข้าสู่ระบบเพื่อเข้าถึงหน้านี้</p>
          <button
            onClick={() => navigate("/Profile/Login")}
            className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl text-white font-semibold"
          >
            ไปหน้า Login
          </button>
        </div>
      </div>
    
  )}
  </>
  )}
  
  return (

    <div className=" mt-20 flex flex-col items-center bg-transparent text-white w-full min-h-screen p-6">
      
      <div className="flex w-[90%] gap-6">
        
        {/* กล่องด้านซ้าย */}
        <div className="w-[25%] h-[600px] bg-gray-800 p-6 rounded-3xl flex flex-col items-center gap-6">
          {/* รูปโปรไฟล์*/}
          <div className="w-40 h-40 rounded-full bg-white overflow-hidden cursor-pointer hover:opacity-50" onClick={handleImageClick}>
            {profileImage ? (
              <img src = {profileImage} alt = "Profile" className="w-full h-full object-cover"/>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-black font-bold opacity-0 hover:opacity-100">
                Edit
              </div>
            )}

            

          </div>

          {/* input ไฟล์ (ซ่อน) */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          
          <div className="px-4 py-1 font-bold shadow">{username}</div>
          {/* ปุ่มเมนู*/}
          <Link className="w-full" to="/Profile">
            <Buttons variant="profileCom">
              Profile
            </Buttons>
          </Link>
          <Link className="w-full" to="/CheckIn">
            <Buttons variant="profileCom">
              Check_IN
            </Buttons>
          </Link>
          {/* ปุ่มออกจากระบบ*/}
          <Buttons variant="logout" onClick={handleLogout}>Log-Out</Buttons>
        </div>

        {/* กล่องด้านขวา (หมวดหมู่) */}
          <div className="w-[70%] bg-gray-800 rounded-3xl p-6 flex flex-col gap-6">
            <h2 className="text-3xl font-bold">Accout Info</h2>
            <div className="space-y-3">
              <p>
                Display Name: <span className="font-semibold">{username}</span>
              </p>
              <p>
                UserName: <span className="font-semibold">{username}</span>
              </p>
              <p>
                Role: <span className="font-semibold">{role}</span>
              </p>
              <p>
                Email: <span className="font-semibold">{email}</span>
              </p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Profile