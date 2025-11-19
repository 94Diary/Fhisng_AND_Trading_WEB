import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Buttons from "../Buttons/Buttons";
import { useAppContext } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const { user, profileImages, addProfileImage } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setShowPopup(true);
    } else {
      const images = profileImages[user.username];
      if (images && images.length > 0) setCurrentImage(images[images.length - 1]);
    }
  }, [user, profileImages]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUsername(null);
    setRole(null);
    navigate("/");
    window.location.reload();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        addProfileImage(user.username, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => fileInputRef.current?.click();

  if (!user?.username) {
    return (
      <AnimatePresence>
        {showPopup && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <motion.div
              className="bg-gray-800 p-6 sm:p-8 rounded-2xl text-center w-[90%] max-w-sm shadow-xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">คุณต้องล็อคอินก่อน</h2>
              <p className="text-gray-300 mb-6">กรุณาเข้าสู่ระบบเพื่อเข้าถึงหน้านี้</p>
              <button
                onClick={() => navigate("/Profile/Login")}
                className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl text-white font-semibold"
              >
                ไปหน้า Login
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="mt-20 flex flex-col items-center bg-transparent text-white w-full min-h-screen px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* กล่องด้านซ้าย */}
        <div className="w-full  lg:w-1/4 bg-gray-800 p-6 rounded-3xl flex flex-col items-center gap-6">
          <div
            className="w-40 h-40 rounded-full bg-white overflow-hidden cursor-pointer hover:opacity-50"
            onClick={handleImageClick}
          >
            {currentImage ? (
              <img src={currentImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-black font-bold opacity-0 hover:opacity-100">
                Edit
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="px-4 py-1 font-bold shadow">{user.username}</div>

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

        {/* กล่องด้านขวา */}
        <div className="w-full lg:w-2/3 bg-gray-800 rounded-3xl p-6 flex flex-col gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Account Info</h2>
          <div className="space-y-3 text-sm sm:text-base">
            <p>
              Display Name: <span className="font-semibold">{user.username}</span>
            </p>
            <p>
              UserName: <span className="font-semibold">{user.username}</span>
            </p>
            <p>
              Role: <span className="font-semibold">{user.role}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;