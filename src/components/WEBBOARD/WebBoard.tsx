import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Buttons from "../Buttons/Buttons";
import { useAppContext } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const WebBoard = () => {
  const { user, addPost } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user?.username) {
      setShowPopup(true);
    }
  }, [user]);

  const showButtons = location.pathname !== "/webboard";
  const currentCategory = location.pathname.replace("/webboard/", "");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim())
      return alert("กรุณากรอกทุกช่อง!");

    if (imageFiles.length > 5) {
      alert("เลือกได้สูงสุด 5 รูปเท่านั้น");
      return;
    }

    const readerPromises = imageFiles.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject();
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readerPromises).then((urls) => {
      addPost(title, description, urls, currentCategory);
      setTitle("");
      setDescription("");
      setImageFiles([]);
      setShowCreateModal(false);
    });
  };

  const handleBack = () => navigate("/webboard");

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
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">
                คุณต้องล็อคอินก่อน
              </h2>
              <p className="text-gray-300 mb-6">
                กรุณาเข้าสู่ระบบเพื่อเข้าถึงหน้านี้
              </p>
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
      {/* ปุ่ม Create */}
      <div className="flex flex-col sm:flex-row justify-end w-full max-w-5xl mb-4 gap-4">
        {showButtons && !(currentCategory === "news" && user.role === "user") && (
          <Buttons variant="create" onClick={() => setShowCreateModal(true)}>
            Create Web Board
          </Buttons>
        )}
        {showButtons && (
          <Buttons variant="back" onClick={handleBack}>
            Back to category
          </Buttons>
        )}
      </div>

      {/* Modal สร้างโพสต์ */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
              className="bg-gray-800 p-6 rounded-lg w-[90%] max-w-md flex flex-col gap-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                สร้างโพสต์ใหม่
              </h2>
              <p className="text-gray-300">หมวดหมู่: {currentCategory}</p>

              <input
                type="text"
                placeholder="หัวข้อ"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded text-black"
              />

              <textarea
                placeholder="เนื้อหา"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 rounded text-black h-32"
              />

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (!e.target.files) return;
                  setImageFiles(Array.from(e.target.files).slice(0, 5));
                }}
                className="text-black"
              />

              <div className="flex justify-end gap-4">
                <Buttons variant="back" onClick={() => setShowCreateModal(false)}>
                  ยกเลิก
                </Buttons>
                <Buttons variant="create" onClick={handleSubmit}>
                  สร้างโพสต์
                </Buttons>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* เนื้อหา WebBoard */}
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-6 bg-gray-800 p-6 rounded-lg items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WebBoard;