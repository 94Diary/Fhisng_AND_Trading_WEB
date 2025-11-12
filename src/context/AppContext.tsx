// src/context/AppContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

// ================= Types =================
export interface User {
  username: string;
  role: "admin" | "user";
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
  cegegory: string; // general | news
  likes: number;
  dislikes: number;
  reports: number;
  likedBy?: string[];
  dislikedBy?: string[];
  reportedBy?: string[];
  comments?: Comment[];
}

export interface GalleryPost {
  id: number;
  title: string;
  description: string;
  author: string;
  cegegory: string; // general | news
  imageUrl: string;
  likes: number;
  dislikes: number;
  reports: number;
  likedBy?: string[];
  dislikedBy?: string[];
  reportedBy?: string[];
  comments?: Comment[];
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

// ================= Context Type =================
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

  galleryPosts: GalleryPost[];
  addGalleryPost: (title: string, description: string, imageUrl: string) => void;
  editGalleryPost: (id: number, title: string, description: string) => void;
  deleteGalleryPost: (id: number) => void;
  likeGalleryPost: (id: number) => void;
  dislikeGalleryPost: (id: number) => void;
  reportGalleryPost: (id: number) => void;
  addGalleryComment: (postId: number, content: string) => void;
}

// ================= Context =================
const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [galleryPosts, setGalleryPosts] = useState<GalleryPost[]>([]);

  // ===== Load from localStorage =====
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) setPosts(JSON.parse(storedPosts));

    const storedGallery = localStorage.getItem("galleryPosts");
    if (storedGallery) setGalleryPosts(JSON.parse(storedGallery));
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("galleryPosts", JSON.stringify(galleryPosts));
  }, [galleryPosts]);

  // ================= Auth =================
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

  // ================= WebBoard =================
  const addPost = (title: string, description: string, cegegory: string) => {
    if (!user) return;
    const newPost: Post = {
      id: Date.now(),
      title,
      description,
      author: user.username,
      cegegory,
      likes: 0,
      dislikes: 0,
      reports: 0,
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const editPost = (id: number, title: string, description: string) => {
    setPosts(prev => prev.map(p => (p.id === id ? { ...p, title, description } : p)));
  };

  const deletePost = (id: number) => {
    if (!user) return;
    setPosts(prev =>
      prev.filter(p => (user.role === "admin" ? p.id !== id : p.author === user.username ? p.id !== id : true))
    );
  };

  const likePost = (id: number) => {
    if (!user) return;
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const hasLiked = p.likedBy?.includes(user.username);
        const hasDisliked = p.dislikedBy?.includes(user.username);
        return {
          ...p,
          likes: hasLiked ? p.likes - 1 : p.likes + 1,
          likedBy: hasLiked ? p.likedBy!.filter(u => u !== user.username) : [...(p.likedBy || []), user.username],
          dislikes: hasDisliked && !hasLiked ? p.dislikes - 1 : p.dislikes,
          dislikedBy: hasDisliked && !hasLiked ? p.dislikedBy!.filter(u => u !== user.username) : p.dislikedBy,
        };
      })
    );
  };

  const dislikePost = (id: number) => {
    if (!user) return;
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const hasDisliked = p.dislikedBy?.includes(user.username);
        const hasLiked = p.likedBy?.includes(user.username);
        return {
          ...p,
          dislikes: hasDisliked ? p.dislikes - 1 : p.dislikes + 1,
          dislikedBy: hasDisliked ? p.dislikedBy!.filter(u => u !== user.username) : [...(p.dislikedBy || []), user.username],
          likes: hasLiked && !hasDisliked ? p.likes - 1 : p.likes,
          likedBy: hasLiked && !hasDisliked ? p.likedBy!.filter(u => u !== user.username) : p.likedBy,
        };
      })
    );
  };

  const reportPost = (id: number) => {
    if (!user) return;
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const hasReported = p.reportedBy?.includes(user.username);
        return {
          ...p,
          reports: hasReported ? p.reports - 1 : p.reports + 1,
          reportedBy: hasReported ? p.reportedBy!.filter(u => u !== user.username) : [...(p.reportedBy || []), user.username],
        };
      })
    );
  };

  const addComment = (postId: number, content: string) => {
    if (!user) return;
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, comments: [...(p.comments || []), { id: Date.now(), author: user.username, content, createdAt: new Date().toISOString() }] }
          : p
      )
    );
  };

  // ================= Gallery =================
  const addGalleryPost = (
  title: string,
  description: string,
  imageUrl: string,
  cegegory: string
) => {
  if (!user) return;
  const newPost: GalleryPost = {
    id: Date.now(),
    title,
    description,
    cegegory,       // <-- เพิ่มตรงนี้
    imageUrl,
    author: user.username,
    likes: 0,
    dislikes: 0,
    reports: 0,
    likedBy: [],
    dislikedBy: [],
    reportedBy: [],
    comments: [],
  };
  setGalleryPosts(prev => [newPost, ...prev]);
};



  const editGalleryPost = (id: number, title: string, description: string) => {
    setGalleryPosts(prev => prev.map(p => (p.id === id ? { ...p, title, description } : p)));
  };

  const deleteGalleryPost = (id: number) => {
    if (!user) return;
    setGalleryPosts(prev =>
      prev.filter(p => (user.role === "admin" ? p.id !== id : p.author === user.username ? p.id !== id : true))
    );
  };

  const likeGalleryPost = (id: number) => {
    if (!user) return;
    setGalleryPosts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const hasLiked = p.likedBy?.includes(user.username);
        const hasDisliked = p.dislikedBy?.includes(user.username);
        return {
          ...p,
          likes: hasLiked ? p.likes - 1 : p.likes + 1,
          likedBy: hasLiked ? p.likedBy!.filter(u => u !== user.username) : [...(p.likedBy || []), user.username],
          dislikes: hasDisliked && !hasLiked ? p.dislikes - 1 : p.dislikes,
          dislikedBy: hasDisliked && !hasLiked ? p.dislikedBy!.filter(u => u !== user.username) : p.dislikedBy,
        };
      })
    );
  };

  const dislikeGalleryPost = (id: number) => {
    if (!user) return;
    setGalleryPosts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const hasDisliked = p.dislikedBy?.includes(user.username);
        const hasLiked = p.likedBy?.includes(user.username);
        return {
          ...p,
          dislikes: hasDisliked ? p.dislikes - 1 : p.dislikes + 1,
          dislikedBy: hasDisliked ? p.dislikedBy!.filter(u => u !== user.username) : [...(p.dislikedBy || []), user.username],
          likes: hasLiked && !hasDisliked ? p.likes - 1 : p.likes,
          likedBy: hasLiked && !hasDisliked ? p.likedBy!.filter(u => u !== user.username) : p.likedBy,
        };
      })
    );
  };

  const reportGalleryPost = (id: number) => {
    if (!user) return;
    setGalleryPosts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const hasReported = p.reportedBy?.includes(user.username);
        return {
          ...p,
          reports: hasReported ? p.reports - 1 : p.reports + 1,
          reportedBy: hasReported ? p.reportedBy!.filter(u => u !== user.username) : [...(p.reportedBy || []), user.username],
        };
      })
    );
  };

  const addGalleryComment = (postId: number, content: string) => {
    if (!user) return;
    setGalleryPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, comments: [...(p.comments || []), { id: Date.now(), author: user.username, content, createdAt: new Date().toISOString() }] }
          : p
      )
    );
  };

  // ================= Provider =================
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
        galleryPosts,
        addGalleryPost,
        editGalleryPost,
        deleteGalleryPost,
        likeGalleryPost,
        dislikeGalleryPost,
        reportGalleryPost,
        addGalleryComment,
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
