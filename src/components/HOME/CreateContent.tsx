import { useState, useEffect } from "react";
import Content from "./CreateContent";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
}

const CreateContent = () => {
  const [contents, setContents] = useState<ContentItem[]>(() => {
    const stored = localStorage.getItem("contents");
    return stored ? JSON.parse(stored) : [];
  });

  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem("contents", JSON.stringify(contents));
  }, [contents]);

  const addContent = () => {
    if (!user || user.role !== "admin") return;

    const newContent: ContentItem = { id: Date.now(), title, description, imageUrl };
    setContents(prev => [newContent, ...prev]);

    setTitle("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">
      {user?.role === "admin" && (
        <div className="mb-6 flex flex-col gap-3">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            className="p-3 rounded text-black w-full"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            className="p-3 rounded text-black w-full"
          />
          <input
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="Image URL (optional)"
            className="p-3 rounded text-black w-full"
          />
          <button
            onClick={addContent}
            className="mt-2 px-5 py-2 bg-green-500 rounded-lg font-bold hover:bg-green-700"
          >
            Create Content
          </button>
        </div>
      )}

      {contents.map(c => (
        <Content key={c.id} title={c.title} description={c.description} imageUrl={c.imageUrl} />
      ))}
    </div>
  );
};

export default CreateContent;
