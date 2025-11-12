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
  likedBy?: string[];     // เก็บ username ที่กดไลก์แล้ว
  dislikedBy?: string[];  // เก็บ username ที่กดดิสไลก์แล้ว
  reportedBy?: string[];  // เก็บ username ที่รายงานแล้ว
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string; // ปรับให้เป็น string เพื่อเก็บ JSON
}

interface AppContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  posts: Post[];
  addPost: (title: string, description: string, cegegory: string) => void;
  editPost: (id: number, title: string, description: string) => void;
  deletePost: (id: number) => void;
  likePost: (id: number) => void;
  dislikePost: (id: number) => void;
  reportPost: (id: number) => void;
  addComment: (postId: number, content: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  // โหลดข้อมูลผู้ใช้จาก localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // เก็บโพสต์ลง localStorage
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) setPosts(JSON.parse(storedPosts));
  }, []);

  // ฟังก์ชันล็อกอิน
  const login = (username: string, password: string): boolean => {
    let userData: User | null = null;
    if (username === "admin" && password === "1234") userData = { username, role: "admin" };
    else if (username === "user" && password === "1111") userData = { username, role: "user" };

    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // เพิ่มโพสต์
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
      cegegory,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  // แก้ไขโพสต์
  const editPost = (id: number, title: string, description: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, title, description } : p))
    );
  };

  // ลบโพสต์ (แก้ปัญหา User/Admin)
  const deletePost = (id: number) => {
    if (!user) return;

    setPosts((prev) =>
      prev.filter((p) => {
        // Admin ลบได้ทุกโพสต์
        if (user.role === "admin") return p.id !== id;

        // User ลบได้เฉพาะโพสต์ตัวเอง
        if (p.author === user.username) return p.id !== id;

        // โพสต์อื่น ๆ ไม่ให้ลบ
        return true;
      })
    );
  };

 const likePost = (id: number) => {
  if (!user) return;

  setPosts((prev) =>
    prev.map((p) => {
      if (p.id !== id) return p;

      const hasLiked = p.likedBy?.includes(user.username);
      const hasDisliked = p.dislikedBy?.includes(user.username);

      return {
        ...p,
        likes: hasLiked ? p.likes - 1 : p.likes + 1,
        likedBy: hasLiked
          ? p.likedBy!.filter(u => u !== user.username)
          : [...(p.likedBy || []), user.username],

        // ถ้ากด like จะลบ dislike ของคนเดียวกัน
        dislikes: hasDisliked && !hasLiked ? p.dislikes - 1 : p.dislikes,
        dislikedBy: hasDisliked && !hasLiked ? p.dislikedBy!.filter(u => u !== user.username) : p.dislikedBy,
      };
    })
  );
};

const dislikePost = (id: number) => {
  if (!user) return;

  setPosts((prev) =>
    prev.map((p) => {
      if (p.id !== id) return p;

      const hasDisliked = p.dislikedBy?.includes(user.username);
      const hasLiked = p.likedBy?.includes(user.username);

      return {
        ...p,
        dislikes: hasDisliked ? p.dislikes - 1 : p.dislikes + 1,
        dislikedBy: hasDisliked
          ? p.dislikedBy!.filter(u => u !== user.username)
          : [...(p.dislikedBy || []), user.username],

        // ถ้ากด dislike จะลบ like ของคนเดียวกัน
        likes: hasLiked && !hasDisliked ? p.likes - 1 : p.likes,
        likedBy: hasLiked && !hasDisliked ? p.likedBy!.filter(u => u !== user.username) : p.likedBy,
      };
    })
  );
};

const reportPost = (id: number) => {
  if (!user) return;

  setPosts((prev) =>
    prev.map((p) => {
      if (p.id !== id) return p;

      const hasReported = p.reportedBy?.includes(user.username);

      return {
        ...p,
        reports: hasReported ? p.reports - 1 : p.reports + 1,
        reportedBy: hasReported
          ? p.reportedBy!.filter(u => u !== user.username)
          : [...(p.reportedBy || []), user.username],
      };
    })
  );
};


  // เพิ่มคอมเมนต์
  const addComment = (postId: number, content: string) => {
    if (!user) return;
    setPosts((prev) =>
      prev.map((p) =>
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

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext ต้องถูกใช้ภายใน <AppProvider>");
  return context;
};
