import PostCard from "./PostCard";
import usePersistentState from "../../hook/userPersistetState"; 
import { mockPosts } from "../../DATA/MockData.js";
import { useEffect, useState } from "react";

const ContentAdmin = () => {
  const [posts, setPosts] = usePersistentState("posts", mockPosts);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const editPost = (id: number, newTitle: string, newDesc: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, title: newTitle, description: newDesc } : p))
    );
  };

  const deletePost = (id: number) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  if (!user) return <p>Loading...</p>;

  const newsPosts = posts.filter(p => p.category === "news");

  return (
    <div className="flex flex-col w-full gap-6">
      {newsPosts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          currentUser={user}
          onDelete={deletePost}
          onUpdate={editPost}
          setPosts={setPosts}
        />
      ))}
    </div>
  );
};

export default ContentAdmin;