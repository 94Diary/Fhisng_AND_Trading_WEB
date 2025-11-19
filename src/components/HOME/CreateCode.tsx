import { useState, useEffect } from "react";
import CodeProps from "./CodeProps";

const CreateCode = () => {
  // state สำหรับเก็บรายการโค้ดทั้งหมด โดยโหลดจาก localStorage ตอนเริ่มต้น
  const [codes, setCodes] = useState<{ id: number; title: string; checkedBy: string[]; author: string }[]>(() => {
    const stored = localStorage.getItem("codes");
    return stored ? JSON.parse(stored) : [];
  });

  // state สำหรับเก็บข้อความ title ตอนสร้างโค้ดใหม่
  const [title, setTitle] = useState("");

  // state สำหรับเก็บข้อมูล user ที่ล็อกอินอยู่
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  // โหลด user จาก localStorage เมื่อ component mount ครั้งแรก
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // บันทึก codes ใหม่ทุกครั้งที่ codes เปลี่ยน
  useEffect(() => {
    localStorage.setItem("codes", JSON.stringify(codes));
  }, [codes]);

  // ฟังก์ชันสร้าง code ใหม่ (เฉพาะ admin เท่านั้น)
  const addCode = () => {
    if (!user || user.role !== "admin" || !title.trim()) return;
    const newCode = { id: Date.now(), title, checkedBy: [], author: user.username };
    setCodes(prev => [newCode, ...prev]);
    setTitle("");
  };

  // ฟังก์ชันติ๊กว่า user ตรวจแล้วหรือยัง (toggle)
  const toggleCheck = (id: number) => {
    if (!user) return;
    setCodes(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              checkedBy: c.checkedBy.includes(user.username)
                ? c.checkedBy.filter(u => u !== user.username) // เอาออก ถ้าติ๊กอยู่แล้ว
                : [...c.checkedBy, user.username], // เพิ่มชื่อ ถ้ายังไม่เคยติ๊ก
            }
          : c
      )
    );
  };

  // ฟังก์ชันลบ code (เฉพาะ admin)
  const deleteCode = (id: number) => {
    if (!user) return;
    setCodes(prev =>
      prev.filter(c => !(user.role === "admin" && c.id === id))
    );
  };

  return (
    <div className="bg-gray-900 p-4 rounded-3xl">
      {/* ส่วนสร้าง code สำหรับ admin เท่านั้น */}
      {user?.role === "admin" && (
        <div className="mb-4 flex gap-2">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter code title..."
            className="flex-1 p-2 rounded text-black"
          />
          <button
            onClick={addCode}
            className="px-4 py-2 bg-green-500 rounded-lg font-bold hover:bg-green-700"
          >
            Create
          </button>
        </div>
      )}

      {/* แสดงรายการ code ทั้งหมด */}
      <div className="max-h-80 overflow-y-auto space-y-2">
        {codes.map(code => (
          <div key={code.id} className="relative">
            <CodeProps
              title={code.title}
              checkedBy={code.checkedBy}
              username={user?.username || null}
              onToggle={() => toggleCheck(code.id)}
            />

            {/* ปุ่มลบเฉพาะ admin */}
            {user?.role === "admin" && (
              <button
                onClick={() => deleteCode(code.id)}
                className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-800 text-sm"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateCode;
