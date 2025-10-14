const WebBoard = () => {
  return (
    <div className=" mt-20 flex flex-col items-center bg-transparent text-white w-full min-h-screen p-6">
      {/* ปุ่มสร้างกระทู้ */}
     
        <div className="flex justify-end w-[42%] mb-4 gap-4">
          <button className=" bg-purple-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700">
            ประวัติการสร้างกระทู้
          </button>
          <button className="bg-green-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600">
            ปุ่มสร้างรกระทู้
          </button>
        </div>
        
      <div className="flex w-[90%] gap-6">
        
        {/* กล่องด้านซ้าย */}
        <div className="flex-1 flex-col gap-6 bg-gray-800 p-6 rounded-lg ">
          {/* การ์ด*/}
          <div className="h-[100px] w-[100px] bg-orange-500 shadow rounded-3xl"></div>
          <div className="h-[100px] w-[100px] bg-orange-500 shadow rounded-3xl"></div>
        </div>

        {/* กล่องด้านขวา (หมวดหมู่) */}
          <div className="w-[25%] bg-gray-800 rounded-lg p-6 flex flex-col gap-6">
            <div className="bg-red-500 h-24 rounded"></div>
            <div className="bg-red-500 h-24 rounded"></div>
          </div>
      </div>
      
    </div>

  );

}

export default WebBoard;
