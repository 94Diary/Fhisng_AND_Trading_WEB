// ================= Mock Posts =================
export const mockPosts = [
  {
    id: 1,
    title: "โพสต์ตัวอย่าง 1",
    description: "นี่คือโพสต์ตัวอย่างในเว็บบอร์ด",
    author: "admin",
    imageUrls: ["/2025-09-20_163139.png"], // แก้ path
    category: "general",
    likes: 10,
    dislikes: 2,
    reports: 0,
    likedBy: [],
    dislikedBy: [],
    reportedBy: [],
    comments: [],
  },
  {
    id: 2,
    title: "โพสต์ตัวอย่าง 2",
    description: "อีกโพสต์ตัวอย่าง",
    author: "admin",
    imageUrls: ["/2025-10-02_175020.png"],
    category: "news",
    likes: 5,
    dislikes: 1,
    reports: 0,
    likedBy: [],
    dislikedBy: [],
    reportedBy: [],
    comments: [],
  },
];

// ================= Mock Gallery =================
export const mockGallery = [
  {
    id: 1,
    author: "admin",
    imageUrls: ["/Fishing_rod.png"], // แก้ path
    category: "news",
    likes: 8,
    dislikes: 0,
    reports: 0,
    likedBy: [],
    dislikedBy: [],
    reportedBy: [],
    comments: [],
  },
  {
    id: 2,
    author: "admin",
    imageUrls: ["/ClownFish.png"],
    category: "general",
    likes: 3,
    dislikes: 0,
    reports: 0,
    likedBy: [],
    dislikedBy: [],
    reportedBy: [],
    comments: [],
  },
];

// ================= Mock Code =================
export const mockCode = [
  {
    id: 2,
    title: "AEIOU",
    checkedBy: ["user"], // แนะนำใช้ array
    author:"admin",
  },

];

// ================= Mock Home =================
export const mockHomeBanners = [
  {
    id: 1,
    title: "UPDATE 1.2.0 - Fishing & Trading",
    description: "อัปเดตใหม่ เพิ่มฟีเจอร์เว็บบอร์ดและแกลเลอรี่ภาพ!",
    imageUrls: ["/Sword_Basic.png"], // แก้ path
  },
{
    id: 2,
    title: "UPDATE 1.2.0 - Fishing & Trading",
    description: "อัปเดตใหม่ เพิ่มฟีเจอร์เว็บบอร์ดและแกลเลอรี่ภาพ!",
    imageUrls: ["/Minigame_Fishing.png"], // แก้ path
  },
];