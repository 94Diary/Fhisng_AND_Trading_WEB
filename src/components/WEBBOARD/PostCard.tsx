import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

interface PostCardProps {
  post: any;
  currentUser: { username: string; role: string } | null;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newTitle: string, newDesc: string , newImages: string[]) => void;
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onDelete,
  onUpdate,
}) => {
  const { addComment, likePost, dislikePost, reportPost, profileImages } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editImage, setEditImage] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);


  const isOwner = currentUser?.username === post.author;
  const isAdmin = currentUser?.role === "admin";

  const handleEdit = () => {
  setEditTitle(post.title);
  setEditDesc(post.description);
  setEditImage(post.imageUrls); // เอารูปเดิมไปใส่ state
  setEditModalOpen(true);
  setMenuOpen(false);
};

  const saveEdit = () => { // บันทึกการแก้ไข
  if (!editTitle.trim() || !editDesc.trim()) return;
    onUpdate(post.id, editTitle, editDesc, editImage);
    setEditModalOpen(false);
    window.location.reload()
  };


  const handleDelete = () => { // ลบโพสต์
    if (window.confirm("ต้องการลบโพสต์นี้หรือไม่?")) {
      onDelete(post.id);
    }
    setMenuOpen(false);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText("");
  };

  return (
    <AnimatePresence>

      <motion.div className="bg-gray-700 hover:bg-gray-600 p-6 rounded-lg shadow-lg text-white w-full flex flex-col gap-4 "
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      >
        <motion.div className="flex justify-between ">
          <h2 className="text-2xl font-bold">{post.title}</h2>

          {(isOwner || isAdmin) && (// เมนูแก้ไขลบโพสต์
            <motion.div className="relative">
              <motion.button onClick={() => setMenuOpen(!menuOpen)}>
                <MoreVertical className="w-6 h-6 text-white" />
              </motion.button>

              {menuOpen && (
                <motion.div className="absolute right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg w-32">
                  {isOwner && (
                    <motion.button
                      onClick={handleEdit}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    >
                      ✏️ แก้ไข
                    </motion.button>
                  )}
                  <motion.button
                    onClick={handleDelete}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400"
                  >
                    🗑️ ลบ
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>


          {editModalOpen && (// โมดัลแก้ไขโพสต์
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <motion.div
                className="bg-gray-800 p-6 rounded-xl w-96 shadow-xl flex flex-col gap-4"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                >
                <h2 className="text-2xl font-bold text-white">แก้ไขโพสต์</h2>

                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="p-2 rounded text-black"
                  placeholder="หัวข้อใหม่"
                />

                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="p-2 rounded text-black h-32"
                  placeholder="เนื้อหาใหม่"
                />

                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    const readers = files.map(file => {
                      return new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(file); // แปลงเป็น Base64
                      });
                    });

                    Promise.all(readers).then(base64Images => {
                      setEditImage(base64Images); // ส่งไปเก็บใน post.imageUrls
                    });
                  }}
                />



                <div className="flex justify-end gap-3 mt-2">// ปุ่มยกเลิก / บันทึก
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="bg-gray-600 px-4 py-2 rounded-lg"
                  >
                    ยกเลิก
                  </button>

                  <button
                    onClick={saveEdit}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                  >
                    บันทึก
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}




        <p className="text-gray-300">{post.description}</p>

        {/* แสดงหลายรูปแบบไม่ error */}
        <motion.div className="flex flex-wrap gap-2">
          {(post.imageUrls ?? []).map((url: string, i: number) => (
            <img
              key={i}
              src={url}
              alt={`img-${i}`}
              className="rounded-md max-h-64 object-contain bg-black cursor-pointer"
              onClick={() => setPreviewImage(url)}
            />
          ))}
        </motion.div>

        {previewImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setPreviewImage(null)} // คลิกที่พื้นหลังเพื่อปิด
          >
            <motion.img
              src={previewImage}
              alt="preview"
              className="max-w-full max-h-full rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.17, 0.67, 0.83, 0.67],
              }}
            />
          </motion.div>
        )}


        <p className="text-sm text-gray-400">โดย {post.author}</p>

        <motion.div className="flex gap-4 text-lg">
          
          <button className="hover:-rotate-12 hover:scale-125 transition duration-200 delay-100 " onClick={() => likePost(post.id)}>👍 </button>{post.likes}
          <button className="hover:-rotate-12 hover:scale-125 transition duration-200 delay-100 " onClick={() => dislikePost(post.id)}>👎 </button>{post.dislikes}
          <button className="hover:-rotate-12 hover:scale-125 transition duration-200 delay-100 " onClick={() => reportPost(post.id)}>🚨 </button>{post.reports}
        </motion.div>

        {/* Comment Section */}
        <motion.div className="flex flex-col gap-2 mt-4">
          <h3 className="font-bold">คอมเมนต์</h3>

          {post.comments?.map((c: any) => {
            const userImages = profileImages[c.author];
            const profileImage = userImages?.[userImages.length - 1]; // รูปล่าสุด

            return (
              <motion.div
                key={c.id}
                className="text-gray-300 text-sm flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={`${c.author}-profile`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs">
                    ?
                  </div>
                )}
                <span className="font-semibold">{c.author}:</span> {c.content}
              </motion.div>
            );
          })}


          <motion.div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="เขียนคอมเมนต์..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="p-2 rounded text-black flex-1"
            />
            <motion.button className="bg-blue-500 px-4 py-2 rounded" onClick={handleAddComment}>
              ส่ง
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PostCard;
