import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

interface PostCardProps {
  post: any;
  currentUser: { username: string; role: string } | null;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newTitle: string, newDesc: string) => void;
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onDelete,
  onUpdate,
}) => {
  const { addComment, likePost, dislikePost, reportPost } = useAppContext();
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

  const handleDelete = () => {
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
    <div className="bg-gray-700 hover:bg-gray-600 p-6 rounded-lg shadow-lg text-white w-full flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{post.title}</h2>

        {(isOwner || isAdmin) && (
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <MoreVertical className="w-6 h-6 text-white" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-gray-900 border border-gray-600 rounded-lg shadow-lg w-32">
                {isOwner && (
                  <button
                    onClick={handleEdit}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    ✏️ แก้ไข
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400"
                >
                  🗑️ ลบ
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="text-gray-300">{post.description}</p>

      {/* แสดงหลายรูปแบบไม่ error */}
      <div className="flex flex-wrap gap-2">
        {(post.imageUrls ?? []).map((url: string, i: number) => (
          <img
            key={i}
            src={url}
            alt={`img-${i}`}
            className="rounded-md max-h-64 object-contain bg-black cursor-pointer"
            onClick={() => window.open(url, "_blank")}
          />
        ))}
      </div>

      <p className="text-sm text-gray-400">โดย {post.author}</p>

      <div className="flex gap-4 text-lg">
        <button onClick={() => likePost(post.id)}>👍 {post.likes}</button>
        <button onClick={() => dislikePost(post.id)}>👎 {post.dislikes}</button>
        <button onClick={() => reportPost(post.id)}>🚨 {post.reports}</button>
      </div>

      {/* Comment Section */}
      <div className="flex flex-col gap-2 mt-4">
        <h3 className="font-bold">คอมเมนต์</h3>

        {post.comments?.map((c: any) => (
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
          <button className="bg-blue-500 px-4 py-2 rounded" onClick={handleAddComment}>
            ส่ง
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
