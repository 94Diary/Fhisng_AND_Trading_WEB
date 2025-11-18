// Content.tsx
import React, { useState } from "react";

interface ContentProps {
  id?: number;
  title: string;
  description: string;
  imageUrls?: string[];
  onDelete?: (id: number) => void; // สำหรับแอดมินลบ
}

const Content: React.FC<ContentProps> = ({ id, title, description, imageUrls = [], onDelete }) => {
  const [showFull, setShowFull] = useState(false);

  // ตัดข้อความทุก 70 ตัวเพื่อไม่ให้ทะลุกรอบ
  const formatDescription = (text: string) => {
    const chunks = text.match(/.{1,70}/g) || [];
    return chunks.join("\n");
  };

  const previewDesc = formatDescription(description.slice(0, 100));
  const fullDesc = formatDescription(description);

  return (
    <div
      className="grid relative max-w-4xl mx-auto my-4 p-6 bg-gray-700 justify-center items-center text-white rounded-3xl cursor-pointer shadow-black shadow-2xl"
      onClick={() => setShowFull(!showFull)}
    >
      <h1 className="font-bold text-2xl mb-2">{title}</h1>
      <p className="whitespace-pre-line">{showFull ? fullDesc : previewDesc}</p>

      <div className="mt-3 h-[360px] w-[640px] ">
        {imageUrls.map((url, idx) => (
          <img
            key={idx}
            src={url}
            className="w-full h-full object-cover rounded cursor-pointer"
            onClick={() => window.open(url, "_blank")}
          />
        ))}
      </div>

      {!showFull && description.length > 100 && (
        <p className="mt-2 text-sm text-gray-400">Click to read more</p>
      )}

      {onDelete && id !== undefined && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="absolute top-2 right-2 bg-red-500 rounded px-2 py-1 text-white text-sm hover:bg-red-700"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Content;
