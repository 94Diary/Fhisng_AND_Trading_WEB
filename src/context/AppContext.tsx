// src/context/AppContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  username: string;
  role: "admin" | "user";
}

export interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
  likes: number;
  dislikes: number;
  reports: number;
  cegegory: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  createAt: Date;
}

interface AppContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  posts: Post[];
  addPost: (title: string, description: string) => void;
  editPost: (id: number, title: string, description: string) => void;
  deletePost: (id: number) => void;
  likePost: (id: number) => void;
  dislikePost: (id: number) => void;
  reportPost: (id: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  // โหลดข้อมูลผู้ใช้จาก localStorage เมื่อเริ่มต้น
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
  localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
  const storedPosts = localStorage.getItem("posts");
  if (storedPosts) setPosts(JSON.parse(storedPosts));
  }, []);


  // ฟังก์ชันล็อกอิน
  const login = (username: string, password: string): boolean => {
    if (username === "admin" && password === "1234") {
      const userData = { username, role: "admin" as const };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return true;
    } else if (username === "user" && password === "1111") {
      const userData = { username, role: "user" as const };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  // ฟังก์ชันออกจากระบบ
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  

  // ฟังก์ชันจัดการโพสต์
 const addPost = (title: string, description: string, cegegory: string) => {
  if (!user) return;
  const newPost: Post = {
    id: Date.now(),
    title,
    description,
    author: user.username,
    likes: 0,
    dislikes: 0,
    reports: 0,
    cegegory, // <-- หมวดหมู่ที่ล็อคจาก route
  };
  setPosts((prev) => [newPost, ...prev]);
};
  //ฟงช้นคอมเม้น
  const addComment = (postId: number, content: string) => {
    if (!user) return;
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...(p.comments || []),
                {
                  id: Date.now(),
                  author: user.username,
                  content,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : p
      )
    );
  };


  const editPost = (id: number, title: string, description: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, title, description } : p))
    );
  };

 const deletePost = (id: number) => {
  if (!user) return;

  setPosts(prev =>
    prev.filter(p => {
      // Admin สามารถลบทุกโพสต์
      if (user.role === "admin") return p.id !== id;

      // User ลบได้เฉพาะโพสต์ตัวเอง
      if (p.author === user.username) return p.id !== id;

      // โพสต์อื่น ๆ ไม่ให้ลบ
      return true;
    })
  );
};


  const likePost = (id: number) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const dislikePost = (id: number) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, dislikes: p.dislikes + 1 } : p))
    );
  };

  const reportPost = (id: number) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, reports: p.reports + 1 } : p))
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        posts,
        addPost,
        editPost,
        deletePost,
        likePost,
        dislikePost,
        reportPost,
        addComment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};



// Hook สำหรับใช้งาน context ได้สะดวก
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext ต้องถูกใช้ภายใน <AppProvider>");
  return context;
};
