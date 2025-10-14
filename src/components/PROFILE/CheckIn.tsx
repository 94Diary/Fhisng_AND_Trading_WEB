import React  from "react";

const CheckIn = () => {
  return (
    <div className=" mt-20 flex flex-col items-center bg-transparent text-white w-full min-h-screen p-6">
      <div className="flex w-[90%] gap-6">
        
        {/* กล่องด้านซ้าย */}
        <div className="w-[25%] h-[600px] bg-gray-800 p-6 rounded-lg flex flex-col items-center gap-6">
          {/* รูปโปรไฟล์*/}
          <div className="w-40 h-40 rounded-full bg-white"></div>
          <div className="px-4 py-1 rounded-lg font-bold shadow">Name</div>
          {/* ปุ่มเมนู*/}
          <button className="bg-white text-black px-4 py-2 w-full rounded-lg font-bold shadow hover:bg-gray-700 transition">
            <a href="/Profile">Profile</a>
          </button>
          <button className="bg-white text-black px-4 py-2 w-full rounded-lg font-bold shadow hover:bg-gray-700 transition">
            <a href="/CheckIn">Check-IN</a>
          </button>
          {/* ปุ่มออกจากระบบ*/}
          <button className="bg-red-600 px-4 py-2 w-full rounded-lg font-bold shadow mt-auto hover:bg-red-700 transition">ออกจากระบบ</button>
        </div>

        {/* กล่องด้านขวา (หมวดหมู่) */}
          <div className="w-[70%] bg-gray-800 rounded-lg p-6 flex flex-col gap-6">
            <h2 className="text-3xl font-bold">Check-In</h2>
            <p>
                มาล็อคอินกันด้วยยยย
            </p>
            
          </div>
      </div>
    </div>
  )
}

export default CheckIn