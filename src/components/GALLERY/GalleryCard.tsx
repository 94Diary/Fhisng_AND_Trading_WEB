import React, { useState } from "react";
import type { User, GalleryPost } from "../../context/AppContext";
import { useAppContext } from "../../context/AppContext";

interface GalleryCardProps {
  post: GalleryPost;
  currentUser: User | null;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string, desc: string) => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ post, currentUser, onDelete, onUpdate }) => {
  const { likeGalleryPost, dislikeGalleryPost, reportGalleryPost, addGalleryComment } =
    useAppContext();

  const [menuOpen, setMenuOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const isOwner = currentUser?.username === post.author;
  const isAdmin = currentUser?.role === "admin";

  const handleEdit = () => {
    const newTitle = prompt("แก้ไขหัวข้อ:", post.title);
    const newDesc = prompt("แก้ไขเนื้อหา:", post.description);
    if (newTitle && newDesc) onUpdate(post.id, newTitle, newDesc);
    setMenuOpen(false);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addGalleryComment(post.id, commentText);
    setCommentText("");
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-white w-full flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        {(isOwner || isAdmin) && (
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-gray-900 border border-gray-600 rounded-lg shadow-lg w-32">
                {isOwner && <button onClick={handleEdit}>✏️ แก้ไข</button>}
                <button onClick={() => onDelete(post.id)}>🗑️ ลบ</button>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="text-gray-300">{post.description}</p>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="rounded-md max-h-64 object-cover" />
      )}
      <p className="text-sm text-gray-400">โดย {post.author}</p>

      <div className="flex gap-4 text-lg">
        <button onClick={() => likeGalleryPost(post.id)}>👍 {post.likes}</button>
        <button onClick={() => dislikeGalleryPost(post.id)}>👎 {post.dislikes}</button>
        <button onClick={() => reportGalleryPost(post.id)}>🚨 {post.reports}</button>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <h3 className="font-bold">คอมเมนต์</h3>
        {post.comments?.map((c) => (
          <div key={c.id} className="text-gray-300 text-sm">
            <span className="font-semibold">{c.author}:</span> {c.content}
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="เขียนคอมเมนต์..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="p-2 rounded text-black flex-1"
          />
          <button onClick={handleAddComment} className="bg-blue-500 px-4 py-2 rounded">
            ส่ง
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
