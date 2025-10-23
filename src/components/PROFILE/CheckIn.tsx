import React, {useRef, useState } from "react";
import { Link } from "react-router-dom";
import Buttons from "../Buttons/Buttons";

const CheckIn = () => {
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
              <img src = {profileImage} alt = "CheckIn" className="w-full h-full object-cover"/>
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
          
          <div className="px-4 py-1 rounded-lg font-bold shadow">Name</div>
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
          <div className="order-2 lg:order-1 w-full lg:w-[70%] bg-gray-800 rounded-3xl p-6 flex flex-col gap-6">
            <h2 className="text-3xl font-bold">Check-In</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-10 bg-white/10 p-6 rounded-lg">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index}
                className="w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center text-black font-bold hover:rotate-12 transition hover:scale-110">
                  Day {index + 1}
                </div>
              ))}
            </div>
              <div className=" flex felx-col items-center justify-center m-4 ">
                <Buttons variant="checkIn" size="lg">
                  Check-In
                </Buttons>

              </div>
            
          </div>
      </div>
    </div>
  )
}

export default CheckIn