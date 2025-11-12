// src/components/GALLERY/Gallery.tsx
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Buttons from "../Buttons/Buttons";
import { useAppContext } from "../../context/AppContext";

const Gallery = () => {
  const { user, galleryPosts, addGalleryPost } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  // current category
  const currentCategory = location.pathname.replace("/gallery/", "");

  // show buttons only if inside a category
  const showButtons = currentCategory !== "/gallery";

  // modal create post
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!title || !description || !imageFile) {
      alert("กรุณากรอกทุกช่องและเลือกภาพ!");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;
      addGalleryPost(title, description, imageUrl, currentCategory);
      setTitle("");
      setDescription("");
      setImageFile(null);
      setShowCreateModal(false);
    };
    reader.readAsDataURL(imageFile);
  };

  const handleBack = () => navigate("/gallery");

  return (
    <div className="mt-20 flex flex-col items-center bg-transparent text-white w-full min-h-screen p-6">
      {/* ปุ่ม Create / Back */}
      {showButtons && (
        <div className="flex justify-end w-[90%] mb-4 gap-4">
          {/* Create button: user ไม่เห็นใน news */}
          {!(currentCategory === "news" && user?.role === "user") && (
            <Buttons variant="create" onClick={() => setShowCreateModal(true)}>
              Create Gallery Post
            </Buttons>
          )}

          {/* Back button */}
          <Buttons variant="back" onClick={handleBack}>
            Back to category
          </Buttons>
        </div>
      )}

      {/* Modal สร้างโพสต์ */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white">สร้างโพสต์ใหม่</h2>
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
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
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
          </div>
        </div>
      )}

      {/* Post List */}
      <div className="flex w-[90%] gap-6">
        <div className="flex flex-1 flex-col gap-6 bg-gray-800 p-6 rounded-lg items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
