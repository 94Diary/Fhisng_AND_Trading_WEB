// CreateContent.tsx
import React, { useState, useEffect } from "react";
import Content from "./Content";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  imageUrls: string[];
}

const CreateContent: React.FC = () => {
  const [contents, setContents] = useState<ContentItem[]>(() => {
    const stored = localStorage.getItem("contents");
    return stored ? JSON.parse(stored) : [];
  });

  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem("contents", JSON.stringify(contents));
  }, [contents]);

  const addContent = () => {
    if (!user || user.role !== "admin") return;
    if (!title.trim() || !description.trim()) return;

    const newContent: ContentItem = {
      id: Date.now(),
      title,
      description,
      imageUrls: images,
    };
    setContents(prev => [newContent, ...prev]);
    setTitle("");
    setDescription("");
    setImages([]);
  };

 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;
  const filesArray = Array.from(e.target.files).slice(0, 8 - images.length); // max 8 รูป

  filesArray.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImages(prev => [...prev, base64]);
    };
    reader.readAsDataURL(file); // แปลงไฟล์เป็น Base64
  });
};


  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const deleteContent = (id: number) => {
    setContents(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {user?.role === "admin" && (
        <div className="mb-6 flex flex-col gap-3">
          <input
            value={title}
            onChange={e => setTitle(e.target.value.slice(0, 50))}
            placeholder="Title (50 characters max)"
            className="p-3 rounded text-black w-full"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value.slice(0, 255))}
            placeholder="Description (255 characters max)"
            className="p-3 rounded text-black w-full"
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="p-3 rounded text-black w-full"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((url, idx) => (
              <div key={idx} className="relative">
                <img src={url} className="w-20 h-20 object-cover rounded" />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 text-white flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addContent}
            className="mt-2 px-5 py-2 bg-green-500 rounded-lg font-bold hover:bg-green-700"
          >
            Create Content
          </button>
        </div>
      )}

      {contents.map(c => (
        <Content
          key={c.id}
          id={c.id}
          title={c.title}
          description={c.description}
          imageUrls={c.imageUrls}
          onDelete={user?.role === "admin" ? deleteContent : undefined}
        />
      ))}
    </div>
  );
};

export default CreateContent;
