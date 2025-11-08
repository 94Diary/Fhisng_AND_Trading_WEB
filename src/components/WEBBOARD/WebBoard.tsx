import Buttons from "../Buttons/Buttons";
import Category from "./Category";

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
        <div className="flex flex-1 flex-col gap-6 bg-gray-800 p-6 rounded-lg">
          {/* การ์ด */}
          
          <Category 
            title="หมวดหมู่ทั่วไป"
            description="พูดคุยเรื่องทั่วไปที่ไม่เข้าพวก"
          />
          <Category 
            title="หมวดหมู่ข่าวสาร"
            description="อัพเดทข่าวสารต่างๆ ที่น่าสนใจ"
          />
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