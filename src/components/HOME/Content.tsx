// Content.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContentProps {
  id?: number;
  title: string;
  description: string;
  imageUrls?: string[];
  onDelete?: (id: number) => void; // สำหรับแอดมินลบ
}

const Content: React.FC<ContentProps> = ({ id, title, description, imageUrls = [], onDelete }) => {
  const [showFull, setShowFull] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // ตัดข้อความทุก 70 ตัวเพื่อไม่ให้ทะลุกรอบ
  const formatDescription = (text: string) => {
    const chunks = text.match(/.{1,70}/g) || [];
    return chunks.join("\n");
  };

  const previewDesc = formatDescription(description.slice(0, 100));
  const fullDesc = formatDescription(description);

  return (
    <AnimatePresence>

      <motion.div
        className="grid relative max-w-4xl mx-auto my-4 p-6 bg-gray-700 justify-center items-center text-white rounded-3xl cursor-pointer shadow-black shadow-2xl"
        onClick={() => setShowFull(!showFull)}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <h1 className="font-bold text-2xl mb-2">{title}</h1>
        <p className="whitespace-pre-line">{showFull ? fullDesc : previewDesc}</p>

        <div className="mt-3 h-[360px] w-[640px] ">
          {imageUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              className="w-full h-full object-cover rounded cursor-pointer"
              onClick={() => setPreviewImage(url)}
            />
          ))}
        </div>

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


        {!showFull && description.length > 100 && (
          <p className="mt-2 text-sm text-gray-400">Click to read more</p>
        )}

        {onDelete && id !== undefined && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="absolute top-2 right-2 bg-red-500 rounded-xl px-2 py-1 text-white text-sm hover:bg-red-700"
          >
            Delete
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Content;
