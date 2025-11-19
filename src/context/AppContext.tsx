// src/context/AppContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

// ================= Types =================
export interface User {
  username: string;
  role: "admin" | "user";
}

export interface CodeItem {
  id: number;
  title: string;
  checkedBy: string[];
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
  imageUrls: string[];
  category: string;
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
  category: string;
  author: string;
  imageUrls: string[];
  likes: number;
  dislikes: number;
  reports: number;
  likedBy?: string[];
  dislikedBy?: string[];
  reportedBy?: string[];
  comments?: Comment[];
}

// ================= Context Type =================
interface AppContextType {
  getTopLikedPosts: (limit?: number) => Post[];

  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;

  posts: Post[];
  addPost: (title: string, description: string,imageUrls: string[], category: string) => void;
  editPost: (id: number, title: string, description: string ,imageUrls: string[]) => void;
  deletePost: (id: number) => void;
  likePost: (id: number) => void;
  dislikePost: (id: number) => void;
  reportPost: (id: number) => void;
  addComment: (postId: number, content: string) => void;

  galleryPosts: GalleryPost[];
  addGalleryPost: (imageUrls: string[], category: string) => void;
  editGalleryPost: (id: number, title: string, description: string) => void;
  deleteGalleryPost: (id: number) => void;
  likeGalleryPost: (id: number) => void;
  dislikeGalleryPost: (id: number) => void;
  reportGalleryPost: (id: number) => void;
  addGalleryComment: (postId: number, content: string) => void;

  codes: CodeItem[];
  addCode: (title: string) => void;
  toggleCodeCheck: (id: number) => void;

  profileImages: Record<string, string[]>;
  addProfileImage: (username: string, image: string) => void;

  checkInStatus: Record<string, boolean[]>;
  handleCheckIn: (username: string) => void;
  resetCheckIn: (username: string) => void;

}

// ================= Context =================
const AppContext = createContext<AppContextType | null>(null);




export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [galleryPosts, setGalleryPosts] = useState<GalleryPost[]>([]);
  const [codes, setCodes] = useState<CodeItem[]>([]);
  const [profileImages, setProfileImages] = useState<Record<string, string[]>>({});
  const [checkInStatus, setCheckInStatus] = useState<Record<string, boolean[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  // ===== Load from localStorage =====
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedPosts = localStorage.getItem("posts");
      if (storedPosts) setPosts(JSON.parse(storedPosts));

      const storedGallery = localStorage.getItem("galleryPosts");
      if (storedGallery) setGalleryPosts(JSON.parse(storedGallery));

      const storedCodes = localStorage.getItem("codes");
      if (storedCodes) setCodes(JSON.parse(storedCodes));

      // load profileImages
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith("profileImages_")) {
          const username = key.replace("profileImages_", "");
          const images = JSON.parse(localStorage.getItem(key) || "[]");
          setProfileImages(prev => ({ ...prev, [username]: images }));
        }
      });

      // load checkInStatus
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith("checkIn_")) {
          const username = key.replace("checkIn_", "");
          const status = JSON.parse(localStorage.getItem(key) || JSON.stringify(Array(7).fill(false)));
          setCheckInStatus(prev => ({ ...prev, [username]: status }));
        }
      });
    } catch (error) {
      console.error("Error loading from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ===== Save to localStorage =====
  useEffect(() => {
    if (!isLoading) localStorage.setItem("user", JSON.stringify(user));
  }, [user, isLoading]);

  useEffect(() => {
    if (!isLoading) localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts, isLoading]);

  useEffect(() => {
    if (!isLoading) localStorage.setItem("galleryPosts", JSON.stringify(galleryPosts));
  }, [galleryPosts, isLoading]);

  useEffect(() => {
    if (!isLoading) localStorage.setItem("codes", JSON.stringify(codes));
  }, [codes, isLoading]);

  // ================= Auth =================
  const login = (username: string, password: string): boolean => {
    let userData: User | null = null;
    if (username === "admin" && password === "1234") userData = { username, role: "admin" };
    else if (username === "user" && password === "1111") userData = { username, role: "user" };

    if (userData) {
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  // ================= Profile Image =================
  const addProfileImage = (username: string, image: string) => {
    setProfileImages(prev => {
      const userImages = prev[username] || [];
      const newImages = [...userImages, image];
      localStorage.setItem(`profileImages_${username}`, JSON.stringify(newImages));
      return { ...prev, [username]: newImages };
    });
  };

  // ================= Check-In =================
  const handleCheckIn = (username: string) => {
    //const now = Date.now();
    const today = new Date().toDateString();
    const lastCheck = localStorage.getItem(`lastCheck_${username}`); //รายวัน
    //const lastCheck = Number(localStorage.getItem(`lastCheck_${username}`) || 0); //ราย 10 วินาที ทดสอบเฉยๆ

    if (lastCheck === today) return; //รายวัน

    //if (now - lastCheck < 10 * 1000) return;// ราย 10 วินาที ทดสอบเฉยๆ


    setCheckInStatus(prev => {
      const userStatus = prev[username] || Array(7).fill(false);
      const nextIndex = userStatus.findIndex(d => !d);
      if (nextIndex !== -1) {
        const newStatus = [...userStatus];
        newStatus[nextIndex] = true;
        localStorage.setItem(`checkIn_${username}`, JSON.stringify(newStatus));
        localStorage.setItem(`lastCheck_${username}`, today);
        return { ...prev, [username]: newStatus };
      }
      return prev;
    });
  };

  // ================= Code =================
  const addCode = (title: string) => {
    if (!user) return;
    const newCode: CodeItem = { id: Date.now(), title, checkedBy: [] };
    setCodes(prev => [newCode, ...prev]);
  };

  const toggleCodeCheck = (id: number) => {
    if (!user) return;
    setCodes(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              checkedBy: c.checkedBy.includes(user.username)
                ? c.checkedBy.filter(u => u !== user.username)
                : [...c.checkedBy, user.username],
            }
          : c
      )
    );
  };
  // ================= TopLike ===============
  const getTopLikedPosts = (limit: number = 3): Post[] => {
  return [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit);
};


  // ================= Posts =================
  const addPost = (title: string, description: string,imageUrls:string[] ,category: string) => {
    if (!user) return;
    const newPost: Post = {
      id: Date.now(),
      title,
      description,
      author: user.username,
      imageUrls,
      category,
      likes: 0,
      dislikes: 0,
      reports: 0,
      likedBy: [],
      dislikedBy: [],
      reportedBy: [],
      comments: [],
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const editPost = (id: number, title: string, description: string, imageUrls: string[]) => {
    setPosts(prev => {
      const updated = prev.map(p => (p.id === id ? { ...p, title, description, imageUrls } : p));
      localStorage.setItem("posts", JSON.stringify(updated));
      return updated;
    });
  };


  const deletePost = (id: number) => {
  if (!user) return;
    setPosts(prev => {
      const updated = prev.filter(p =>
        user.role === "admin" ? p.id !== id : p.author === user.username ? p.id !== id : true
      );
      localStorage.setItem("posts", JSON.stringify(updated)); // ✅ เซฟกลับ
      return updated;
    });
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
  const addGalleryPost = (imageUrls: string[], category: string) => {
    if (!user) return;
    const newPost: GalleryPost = {
      id: Date.now(),
      category,
      imageUrls,
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

  const resetCheckIn = (username: string) => {
    setCheckInStatus(prev => {
      const newStatus = Array(7).fill(false); // รีเซ็ตทั้งสัปดาห์
      localStorage.setItem(`checkIn_${username}`, JSON.stringify(newStatus));
      localStorage.removeItem(`lastCheck_${username}`); // ลบวันที่เช็คอินล่าสุด
      return { ...prev, [username]: newStatus };
    });
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
        codes,
        addCode,
        toggleCodeCheck,
        profileImages,
        addProfileImage,
        checkInStatus,
        handleCheckIn,
        resetCheckIn,
        getTopLikedPosts, // ✅ เพิ่มตรงนี้
      }}
    >

      {isLoading ? <p>Loading...</p> : children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext ต้องถูกใช้ภายใน <AppProvider>");
  return context;
};