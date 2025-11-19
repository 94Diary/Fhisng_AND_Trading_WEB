import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Buttons from "../Buttons/Buttons";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CheckIn = () => {
  const { user, profileImages, checkInStatus, resetCheckIn, handleCheckIn } = useAppContext();
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [status, setStatus] = useState<boolean[]>([]);
  const [alreadyCheckInPopup, setAlreadyCheckInPopup] = useState(false);

  useEffect(() => {
    if (user) {
      const images = profileImages[user.username];
      if (images && images.length > 0) setCurrentImage(images[images.length - 1]);

      const checkIn = checkInStatus[user.username] || Array(7).fill(false);
      setStatus(checkIn);
    }
  }, [user, profileImages, checkInStatus]);

  // ฟังก์ชันจัดการเช็คอิน
  const handleClickCheckIn = () => {
    if (!user) return;

    const today = new Date().toDateString();
     const lastCheck = localStorage.getItem(`lastCheck_${user.username}`);

     //ถ้าวันนี้เช็คอินแล้ว → แสดง popup
    if (lastCheck === today) {
       setAlreadyCheckInPopup(true);
       return;
     }

    // // เช็คอินปกติ
    handleCheckIn(user.username);
    //window.location.reload();

     // หลังเช็คอินแล้ว อัปเดต status ล่าสุด
     const updatedStatus = checkInStatus[user.username] || [];
     const newStatus = [...updatedStatus];
   
    // ตรงนี้เช็คว่าครบ 7 วันหรือยัง
     const isAllChecked = newStatus.filter(Boolean).length === 7;

    if (isAllChecked) {
      // ถ้าครบ 7 วัน → รีเซ็ต
      resetCheckIn(user.username);
    }
  };


 
  const handleReset = () => {
    if (user) resetCheckIn(user.username);
  };

  if (!user) return <p className="text-white">คุณต้องล็อคอินก่อน</p>;

  return (
    <div className="mt-20 flex flex-col items-center bg-transparent text-white w-full min-h-screen p-6">
      
      {/* Popup เมื่อเช็คอินซ้ำ */}
      <AnimatePresence>
        {alreadyCheckInPopup && (
          <motion.div
            key="popup"
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 p-8 rounded-2xl shadow-xl text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-white">
                วันนี้คุณเช็คอินไปแล้ว!
              </h2>
              <Buttons
                variant="checkIn"
                onClick={() => setAlreadyCheckInPopup(false)}
              >
                ตกลง
              </Buttons>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex w-[90%] gap-6">

        {/* กล่องซ้าย */}
        <div className="w-[25%] h-[600px] bg-gray-800 p-6 rounded-3xl flex flex-col items-center gap-6">
          <div className="w-40 h-40 rounded-full bg-white overflow-hidden">
            {currentImage ? (
              <img src={currentImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-black font-bold opacity-50">
                No Image
              </div>
            )}
          </div>

          <div className="px-4 py-1 font-bold shadow">{user.username}</div>

          <Link className="w-full mt-4" to="/Profile">
            <Buttons variant="profileCom">Profile</Buttons>
          </Link>
        </div>

        {/* กล่องขวา */}
        <div className="w-[70%] bg-gray-800 rounded-3xl p-6 flex flex-col gap-6">
          <h2 className="text-3xl font-bold mb-4">Check-In</h2>

          {/* แสดงสถานะวันทั้ง 7 */}
          <div className="flex gap-2 mb-4">
            {status.map((done, i) => (
              <div
                key={i}
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  done ? "bg-green-500 border-green-400" : "bg-gray-700 border-gray-400"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <button
            onClick={handleClickCheckIn}
            className="px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600"
          >
            Check In Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
