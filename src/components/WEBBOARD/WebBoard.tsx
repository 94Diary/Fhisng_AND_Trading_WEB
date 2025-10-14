import React from "react";

const WebBoard: React.FC = () => {
  const posts = [
    { id: 1, title: "ขอสอบถามหน่อยได้ไหมครับว่าปลาทูกับเบ้ดตกปลาคาเค่นหาได้จากไหนแล้วจุดเกิดของคาเค่นอยู่ที่จุดไหนของแผนที่หรอครับ" },
    { id: 2, title: "กระทู้ที่ 2" },
    { id: 3, title: "กระทู้ที่ 3" },
  ];

  return (
    <div className=" mt-20 flex flex-col items-center bg-transparent text-white w-full min-h-screen p-6">
      {/* ปุ่มสร้างกระทู้ */}
     
        <div className="flex justify-end w-[42%] mb-4 gap-4">
          <button className=" bg-purple-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700">
            ประวัติการสร้างกระทู้
          </button>
          <button className="bg-green-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600">
            ปุ่มสร้างกระทู้
          </button>
        </div>
        
      <div className="flex w-[90%] gap-6">
        
        {/* กล่องด้านซ้าย */}
        <div className="flex-1 bg-gray-300 p-6 rounded-lg">
          
          {/* ปุ่มลำดับหน้า */}
          <div className="bg-gray-200 text-black px-3 py-1 mb-4 rounded inline-block text-sm font-semibold">
            ลำดับหน้าแต่ละหน้า
          </div>

          {/* รายการกระทู้ */}
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex justify-between items-center bg-red-500 text-white p-4 mb-4 rounded-md"
            >
              {/* ปุ่มฝั่งซ้าย */}
              <div className="flex gap-2">
                <button className="bg-blue-600 px-4 py-2 rounded">ปุ่ม 1</button>
                <button className="bg-blue-600 px-4 py-2 rounded">ปุ่ม 2</button>
                <button className="bg-blue-600 px-4 py-2 rounded">ปุ่ม 3</button>
              </div>

              {/* ชื่อกระทู้ */}
              <span className="font-semibold">{post.title}</span>

              {/* ปุ่มลบ */}
              <button className="bg-blue-600 px-4 py-2 rounded">ลบ</button>
            </div>
          ))}
        </div>

        {/* กล่องด้านขวา (หมวดหมู่) */}
          <div className="w-[25%] bg-gray-300 rounded-lg p-6 flex flex-col gap-6">
            <div className="bg-red-500 h-24 rounded"></div>
            <div className="bg-red-500 h-24 rounded"></div>
          </div>
      </div>
      
    </div>
  );
};

export default WebBoard;
