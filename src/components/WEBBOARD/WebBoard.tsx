import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Buttons from "../Buttons/Buttons";
import { useAppContext } from "../../context/AppContext";
import PostCard from "./PostCard";

const WebBoard = () => {
  const { posts, user, addPost, deletePost, editPost } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const showButtons = location.pathname !== "/webboard";

  // modal create post
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const currentCategory = location.pathname.replace("/webboard/", "");

  const handleSubmit = () => {
    if (!title || !description) return alert("กรุณากรอกทุกช่อง!");
    addPost(title, description, currentCategory);
    setTitle("");
    setDescription("");
    setShowCreateModal(false);
  };

  const handleBack = () => navigate("/webboard");

  return (
    <div className="mt-20 flex flex-col items-center bg-transparent text-white w-full min-h-screen p-6">
      {/* ปุ่ม Create ผู้ใช้ไม่เห็นหน้าแอดมิน*/}
      <div className="flex justify-end w-[90%] mb-4 gap-4">
         {showButtons && !(currentCategory === "news" && user?.role === "user") &&(
          <Buttons variant="create" onClick={() => setShowCreateModal(true)}>
            Create Web Board
          </Buttons>
      )}
         {/* ปุ่ม Back to category */}
         {showButtons && (
          <Buttons variant="back" onClick={() => navigate("/webboard")}>
            Back to category
          </Buttons> 
         )}
      </div>
     
      {/* Modal สร้างโพสต์ */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-pop">
          <div className="bg-gray-800 p-6 rounded-lg w-96 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white">สร้างโพสต์ใหม่</h2>
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
            <div className="flex justify-end gap-4">
              <Buttons variant="back" onClick={() => setShowCreateModal(false)}>
                ยกเลิก
              </Buttons>
              <Buttons variant="create" onClick={handleSubmit}>
                สร้างโพสต์
              </Buttons>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-[90%] gap-6">
        <div className="flex flex-1 flex-col gap-6 bg-gray-800 p-6 rounded-lg items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WebBoard;
