// Home.tsx
import Content from "./Content";
import Code from "./Code";
const Home = () => {
  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col">
  
      {/* Main Content */}
      <main className="flex flex-1 border-8 border-black">
        {/* Left Panel */}
        <div className="w-1/5 bg-gray-300 border-r-8 border-black p-4 text-red-500">
          ซ้าย
        </div>
        {/* Center Panel */}
        <div className="flex flex-col flex-1 border-r-8 border-black">
          {/* Top Center */}
          <div className="h-1/4 bg-gray-900 border-b-8 border-black ">
            <Code></Code>
          </div>
          {/* Bottom Center */}
          <div className="flex-1 bg-gray-900">
            <Content title="Welcome to the Home Page" description="
            สวัสดี ยินดีต้อนรับสู่หน้าแรกของเว็บไซต์ของเรา ที่นี่คุณจะพบกับข้อมูลและเนื้อหาที่น่าสนใจมากมาย ไม่ว่าจะเป็นข่าวสารล่าสุด บทความที่มีประโยชน์ หรือแหล่งข้อมูลที่คุณต้องการ เราหวังว่าคุณจะสนุกกับการสำรวจและค้นพบสิ่งใหม่ ๆ บนเว็บไซต์ของเรา ขอบคุณที่มาเยี่ยมชม!
            อยู่กับเราเพื่ออัปเดตข้อมูลใหม่ ๆ และอย่าลืมแบ่งปันความคิดเห็นของคุณกับเรา!
            และหากคุณมีคำถามหรือข้อเสนอแนะใด ๆ โปรดอย่าลังเลที่จะติดต่อเรา เรายินดีที่จะช่วยเหลือคุณเสมอ!"
            ></Content>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/5 flex flex-col">
          {/* Right Top */}
          <div className="h-1/4 bg-gray-300 border-b-8 border-black p-4 text-red-500">
            ขวาบน
          </div>
          {/* Right Bottom */}
          <div className="flex-1 bg-gray-300 p-4 text-red-500">
            ขวาล่าง
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
