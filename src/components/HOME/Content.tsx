import { useState } from "react";

interface ContentProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const Content: React.FC<ContentProps> = ({ title, description, imageUrl }) => {
  const [showFull, setShowFull] = useState(false);
  const preview = description.length > 150 ? description.slice(0, 150) + "..." : description;

  return (
    <div
      className="relative max-w-4xl mx-auto m-5 p-6 bg-gray-900 text-white text-2xl shadow-lg rounded-3xl cursor-pointer hover:scale-105 transition"
      onClick={() => setShowFull(!showFull)}
    >
      <h1 className="font-bold text-3xl mb-3">{title}</h1>
      <p>{showFull ? description : preview}</p>
      {imageUrl && <img src={imageUrl} className="mt-4 w-full rounded-lg object-cover max-h-96" />}
      {!showFull && description.length > 150 && <p className="mt-2 text-sm text-gray-400">Click to read more</p>}
    </div>
  );
};

export default Content;
