// src/components/GALLERY/GalleryCard.tsx
import React, { useState } from "react";
import type { User, GalleryPost } from "../../context/AppContext";
import { useAppContext } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryCardProps {
  post: GalleryPost;
  currentUser: User | null;
  onDelete: (id: number) => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ post, currentUser, onDelete }) => {
  const { likeGalleryPost, dislikeGalleryPost, reportGalleryPost, addGalleryComment , profileImages } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const isOwner = currentUser?.username === post.author;
  const isAdmin = currentUser?.role === "admin";

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addGalleryComment(post.id, commentText);
    setCommentText("");
  };

  return (
    <AnimatePresence>

      <motion.div className="bg-gray-700 p-6 rounded-lg shadow-lg text-white w-full flex flex-col gap-4"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      >
        {/* Menu */}
        {(isOwner || isAdmin) && (
          <motion.div className="flex justify-end relative">
            <button onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-gray-900 border border-gray-600 rounded-lg shadow-lg w-32">
                <button onClick={() => onDelete(post.id)}>🗑️ ลบ</button>
              </div>
            )}
          </motion.div>
        )}

        {/* แสดงหลายรูป */}
        <motion.div className="flex flex-wrap gap-2">
          {post.imageUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`img-${i}`}
              className="rounded-md max-h-64 object-cover cursor-pointer"
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

        {/* Like / Dislike / Report */}
        <motion.div className="flex gap-4 text-lg">
          <button className="hover:-rotate-12 hover:scale-125 transition duration-200 delay-100 " onClick={() => likeGalleryPost(post.id)}>👍 </button>{post.likes}
          <button className="hover:-rotate-12 hover:scale-125 transition duration-200 delay-100 " onClick={() => dislikeGalleryPost(post.id)}>👎 </button>{post.dislikes}
          <button className="hover:-rotate-12 hover:scale-125 transition duration-200 delay-100 "onClick={() => reportGalleryPost(post.id)}>🚨 </button>{post.reports}
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
            <motion.button onClick={handleAddComment} className="bg-blue-500 px-4 py-2 rounded">
              ส่ง
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryCard;
