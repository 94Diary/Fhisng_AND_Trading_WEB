import Buttons from "../Buttons/Buttons";

/*dddddd*/ /*dddddd*//*dddddd*//*dddddd*//*dddddd*/
const WebBoard = () => { 
  return (
    <div className=" mt-20 flex flex-col items-center bg-transparent text-white w-full min-h-screen p-6">
      {/* ปุ่มสร้างกระทู้ */}

        <div className="flex justify-end w-[42%] mb-4 gap-4">
          <Buttons variant="history">
            History Web Board 
          </Buttons>
          <Buttons variant="create"> 
            Create Web Board
          </Buttons>
        </div>

      <div className="flex w-[90%] gap-6">

        {/* กล่องด้านซ้าย */}
        <div className="flex-1 flex-col bg-gray-800 p-6 rounded-lg gap-6 flex">
          {/* การ์ด */}
          <Category title="หมวดหมู่ 1" description="รายละเอียดหมวดหมู่ 1 รายละเอียดหมวดหมู่ 1 รายละเอียดหมวดหมู่ 1 รายละเอียดหมวดหมู่ 1 รายละเอียดหมวดหมู่ 1 " />
          <Category title="หมวดหมู่ 2" description="รายละเอียดหมวดหมู่ 2 รายละเอียดหมวดหมู่ 22 รายละเอียดหมวดหมู่ 12 รายละเอียดหมวดหมู่ 12 รายละเอียดหมวดหมู่ 22 " />
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