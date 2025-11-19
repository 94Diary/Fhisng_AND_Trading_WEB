import GalleryCard from "./GalleryCard";
import { useEffect, useState } from "react";
import usePersistentState from "../../hook/userPersistetState.js";
import {mockGallery} from "../../DATA/MockData.js"; 

const ContentAdmin = () => {
  const [galleryPosts, setGalleryPosts] = usePersistentState("gallery", mockGallery);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const editGalleryPost = (id: number, title: string, desc: string) => {
    setGalleryPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, title, description: desc } : p))
    );
  };

  const deleteGalleryPost = (id: number) => {
    setGalleryPosts(prev => prev.filter(p => p.id !== id));
  };

  if (!user) return <p>Loading...</p>;

  const newsPosts = galleryPosts.filter(p => p.category === "news");

  return (
    <div className="flex flex-col w-full gap-6">
      {newsPosts.map(post => (
        <GalleryCard
          key={post.id}
          post={post}
          currentUser={user}
          onDelete={deleteGalleryPost}
          onUpdate={editGalleryPost}
        />
      ))}
    </div>
  );
};

export default ContentAdmin;