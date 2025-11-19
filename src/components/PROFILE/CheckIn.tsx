import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Buttons from "../Buttons/Buttons";
import { Link , useNavigate  } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CheckIn = () => {
  const { user, profileImages, checkInStatus, resetCheckIn, handleCheckIn } = useAppContext();
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [status, setStatus] = useState<boolean[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [alreadyCheckInPopup, setAlreadyCheckInPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const images = profileImages[user.username];
      if (images && images.length > 0) setCurrentImage(images[images.length - 1]);

      const checkIn = checkInStatus[user.username] || Array(7).fill(false);
      setStatus(checkIn);
    }
  }, [user, profileImages, checkInStatus]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUsername(null);
    setRole(null);
    window.location.reload
    navigate("/");
  };

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


  

  return (
    
    <div className="mt-20 flex flex-col items-center bg-transparent text-white w-full min-h-screen p-6">
      <AnimatePresence>

        {alreadyCheckInPopup && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 ">
            <motion.div className="bg-gray-800 p-5 rounded-2xl shadow-xl text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            >
              <h2 className="text-2xl font-bold mb-4 text-white ">
                วันนี้คุณเช็คอินไปแล้ว!
              </h2>
              <Buttons
                variant="login"
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
          <div className="px-4 py-1 font-bold shadow">{user?.username}</div>

          {/* ปุ่มเมนู */}
          <Link className="w-full" to="/Profile">
            <Buttons variant="profileCom">Profile</Buttons>
          </Link>
          <Link className="w-full" to="/CheckIn">
            <Buttons variant="profileCom">Check_IN</Buttons>
          </Link>
          <Link className="w-full mt-auto" to={"/PROFILE/login"}>
            <Buttons variant="logout" onClick={handleLogout}>
              Log-Out
            </Buttons>
          </Link>
        </div>

        {/* กล่องขวา */}
        <div className="w-[70%] bg-gray-800 rounded-3xl p-6 flex flex-col gap-6">
          <h2 className="text-3xl font-bold mb-4">Check-In</h2>
          <div className="grid grid-cols-4 gap-2 mb-4 ">
            {status.map((done, i) => (
              <div
                key={i}
                className={`w-auto h-20 flex items-center justify-center border-2 shadow-black shadow-2xl ${
                  done ? "bg-green-500 border-green-400" : "bg-gray-700 border-gray-400"
                }`}
              >
                {i + 1} day
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Buttons
              onClick={handleClickCheckIn}
              variant="checkIn"
            >
              Check In
            </Buttons>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
