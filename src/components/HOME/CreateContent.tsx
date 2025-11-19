// CreateContent.tsx
import React, { useState, useEffect } from "react";
import Content from "./Content"; // คอมโพเนนต์ที่ใช้แสดงแต่ละโพสต์/คอนเทนต์
import {mockHomeBanners} from "../../Data/MockData.js"; // mock data เริ่มต้น

// กำหนดรูปแบบข้อมูลสำหรับ content แต่ละอัน
interface ContentItem {
  id: number;
  title: string;
  description: string;
  imageUrls: string[];
}

const CreateContent: React.FC = () => {
  // โหลด contents จาก localStorage ถ้าไม่มีให้ใช้ mockHomeBanners
  const [contents, setContents] = useState<ContentItem[]>(() => {
    const stored = localStorage.getItem("contents");
    const parsed = stored ? JSON.parse(stored) : [];
    return stored?.length ? parsed : mockHomeBanners;
  });

  // เก็บข้อมูล user ปัจจุบัน
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  // state ของ input form (Admin เท่านั้น)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]); // เก็บ Base64 ของรูป

  // โหลด contents ครั้งแรก
  useEffect(() => {
    const stored = localStorage.getItem("contents");

    if (!stored || JSON.parse(stored).length === 0) {
      // ถ้าไม่มีค่าเลย → ใส่ mockHomeBanners ลง localStorage
      localStorage.setItem("contents", JSON.stringify(mockHomeBanners));
      setContents(mockHomeBanners);
    } else {
      // ถ้ามีค่าอยู่แล้ว → ใช้ค่าที่เก็บไว้
      setContents(JSON.parse(stored));
    }
  }, []);

  // โหลด user จาก localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // sync contents กับ localStorage ทุกครั้งที่มีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem("contents", JSON.stringify(contents));
  }, [contents]);

  // ฟังก์ชันเพิ่ม content (เฉพาะ admin ใช้ได้)
  const addContent = () => {
    if (!user || user.role !== "admin") return; // ถ้าไม่ใช่ admin → ห้ามเพิ่ม
    if (!title.trim() || !description.trim()) return; // ห้าม field ว่าง

    const newContent: ContentItem = {
      id: Date.now(), // ใช้ timestamp เป็น id
      title,
      description,
      imageUrls: images, // เก็บรูปที่อัปโหลดทั้งหมด
    };

    // เพิ่ม content ใหม่ไว้ด้านบนสุด
    setContents(prev => [newContent, ...prev]);

    // รีเซ็ตฟอร์ม
    setTitle("");
    setDescription("");
    setImages([]);
  };

  // ฟังก์ชันอัปโหลดภาพ
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    // จำกัดจำนวนรูป (ที่นี่กำหนด 1 เพราะ slice(0, 1 - images.length))
    const filesArray = Array.from(e.target.files).slice(0, 1 - images.length);

    filesArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        // เพิ่มรูปใหม่เข้าไปใน state
        setImages(prev => [...prev, base64]);
      };
      reader.readAsDataURL(file); // แปลงเป็น Base64
    });
  };

  // ลบรูปที่เลือกออกจาก state
  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  // ลบ content ตาม id (เฉพาะ admin)
  const deleteContent = (id: number) => {
    setContents(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      
      {/* ส่วนสร้างคอนเทนต์ เฉพาะ admin เท่านั้น */}
      {user?.role === "admin" && (
        <div className="mb-6 flex flex-col gap-3">

          {/* ช่องกรอกชื่อ */}
          <input
            value={title}
            onChange={e => setTitle(e.target.value.slice(0, 50))} // จำกัด 50 ตัวอักษร
            placeholder="Title (50 characters max)"
            className="p-3 rounded text-black w-full"
          />

          {/* ช่องกรอกรายละเอียด */}
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value.slice(0, 255))} // จำกัด 255 ตัวอักษร
            placeholder="Description (255 characters max)"
            className="p-3 rounded text-black w-full"
          />

          {/* อัปโหลดหลายภาพ */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="p-3 rounded text-black w-full"
          />

          {/* แสดง preview ของภาพที่อัปโหลด */}
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((url, idx) => (
              <div key={idx} className="relative">
                <img src={url} className="w-20 h-20 object-cover rounded" />

                {/* ปุ่มลบรูปทีละรูป */}
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 text-white flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* ปุ่มสร้างโพสต์ */}
          <button
            onClick={addContent}
            className="mt-2 px-5 py-2 bg-green-500 rounded-lg font-bold hover:bg-green-700"
          >
            Create Content
          </button>
        </div>
      )}

      {/* แสดงรายการ content ทั้งหมด */}
      {contents.map(c => (
        <Content
          key={c.id}
          id={c.id}
          title={c.title}
          description={c.description}
          imageUrls={c.imageUrls}
          onDelete={user?.role === "admin" ? deleteContent : undefined} // ปุ่มลบเฉพาะ admin
        />
      ))}
    </div>
  );
};

export default CreateContent;
