import React, {useRef, useState } from "react";
import { Link } from "react-router-dom";
import Buttons from "../../Buttons/Buttons";

const Profile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
          
          <div className="px-4 py-1 font-bold shadow">Name</div>
          {/* ปุ่มเมนู*/}
          <Buttons variant="profileCom">
            <Link to="/Profile">
            Profile
            </Link>
          </Buttons>
          <Buttons variant="profileCom">
            <Link to="/CheckIn">
            Check-In
            </Link>
          </Buttons>
          {/* ปุ่มออกจากระบบ*/}
          <Buttons variant="logout">Log-Out</Buttons>
        </div>

        {/* กล่องด้านขวา (หมวดหมู่) */}
          <div className="w-[70%] bg-gray-800 rounded-3xl p-6 flex flex-col gap-6">
            <h2 className="text-3xl font-bold">Accout Info</h2>
            <div className="space-y-3">
              <p>
                Display Name: <span className="font-semibold">DuckOneMandown</span>
              </p>
              <p>
                UserName: <span className="font-semibold">DuckOneMandown</span>
              </p>
              <p>
                Email: <span className="font-semibold">Duck@gmail.com</span>
              </p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Profile