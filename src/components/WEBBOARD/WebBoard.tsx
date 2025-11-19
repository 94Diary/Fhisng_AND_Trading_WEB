// import hooks และ tools ต่างๆ
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Buttons from "../Buttons/Buttons";
import { useAppContext } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const WebBoard = () => {
  // ดึง user และฟังก์ชัน addPost จาก Context
  const { user, addPost } = useAppContext();

  // ใช้สำหรับตรวจเส้นทาง URL ปัจจุบัน
  const location = useLocation();

  // สำหรับเปลี่ยนเส้นทางหน้า
  const navigate = useNavigate();

  // state popup ตอนยังไม่ได้ login
  const [showPopup, setShowPopup] = useState(false);

  // เช็คว่ามี user หรือเปล่า ถ้าไม่มีก็ดึง popup ขึ้นมา
  useEffect(() => {
    if (!user?.username) {
      setShowPopup(true);
    }
  }, [user]);

  // เช็คว่าตอนนี้อยู่ในหน้า /webboard รึเปล่า → ไว้ซ่อนปุ่ม create/back
  const showButtons = location.pathname !== "/webboard";

  // เอา path หลัง /webboard/ มาเป็นชื่อ category
  const currentCategory = location.pathname.replace("/webboard/", "");

  // state ของ modal สร้างโพสต์
  const [showCreateModal, setShowCreateModal] = useState(false);

  // ข้อมูลโพสต์
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // รูปภาพที่อัปโหลด (ไฟล์)
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // ฟังก์ชันกดยืนยันสร้างโพสต์
  const handleSubmit = () => {
    // กันกรอกไม่ครบ
    if (!title.trim() || !description.trim())
      return alert("กรุณากรอกทุกช่อง!");

    // จำกัดภาพไม่เกิน 5 รูป
    if (imageFiles.length > 5) {
      alert("เลือกได้สูงสุด 5 รูปเท่านั้น");
      return;
    }

    // อ่านภาพเป็น Base64 แล้วรวมเป็น array
    const readerPromises = imageFiles.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject();
          reader.readAsDataURL(file);
        })
    );

    // เมื่อโหลดภาพครบทั้งหมด  สร้างโพสต์จริง
    Promise.all(readerPromises).then((urls) => {
      addPost(title, description, urls, currentCategory);
      setTitle("");
      setDescription("");
      setImageFiles([]);
      setShowCreateModal(false);
    });
  };

  // ปุ่ม Back กลับหน้าหมวดหมู่
  const handleBack = () => navigate("/webboard");

  // ถ้ายังไม่ล็อกอิน ให้แสดง popup แจ้งเตือน
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
              {/* ข้อความแจ้งเตือน */}
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">
                คุณต้องล็อคอินก่อน
              </h2>
              <p className="text-gray-300 mb-6">
                กรุณาเข้าสู่ระบบเพื่อเข้าถึงหน้านี้
              </p>

              {/* ปุ่มไป login */}
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

  // ถ้าล็อกอินแล้ว ปกติแสดงหน้าหลัก webboard
  return (
    <div className="mt-20 flex flex-col items-center bg-transparent text-white w-full min-h-screen px-4 sm:px-6 lg:px-8 py-6">
      
      {/* ปุ่มสร้างโพสต์ + ปุ่ม Back */}
      <div className="flex flex-col sm:flex-row justify-end w-full max-w-5xl mb-4 gap-4">
        
        {/* ปุ่ม create: ซ่อนในหน้า /webboard และ user ธรรมดาห้ามสร้าง news */}
        {showButtons && !(currentCategory === "news" && user.role === "user") && (
          <Buttons variant="create" onClick={() => setShowCreateModal(true)}>
            Create Web Board
          </Buttons>
        )}

        {/* ปุ่ม back */}
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
              {/* หัวข้อ modal */}
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                สร้างโพสต์ใหม่
              </h2>

              <p className="text-gray-300">หมวดหมู่: {currentCategory}</p>

              {/* กรอกหัวข้อ */}
              <input
                type="text"
                placeholder="หัวข้อ"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded text-black"
              />

              {/* กรอกเนื้อหา */}
              <textarea
                placeholder="เนื้อหา"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 rounded text-black h-32"
              />

              {/* อัปโหลดรูปภาพ */}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (!e.target.files) return;
                  setImageFiles(Array.from(e.target.files).slice(0, 5)); // จำกัด 5 รูป
                }}
                className="text-black"
              />

              {/* ปุ่ม ปิด / สร้างโพสต์ */}
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

      {/* ส่วนแสดงเนื้อหาโพสต์ category */}
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-6 bg-gray-800 p-6 rounded-lg items-center">
          <Outlet /> {/* โหลดหน้าลูกตาม category */}
        </div>
      </div>
    </div>
  );
};

export default WebBoard;
