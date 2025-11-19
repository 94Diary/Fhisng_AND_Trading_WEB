import CreateContent from "./CreateContent"; // คอมโพเนนต์สร้างคอนเทนต์
import Code from "./CreateCode"; // คอมโพเนนต์แสดงโค้ด
import Buttons from "../Buttons/Buttons"; // ปุ่ม UI แบบกำหนดสไตล์
import { Link, useNavigate } from "react-router-dom"; // ใช้ลิงก์และระบบนำทาง
import { useState, useEffect } from "react"; // state และ effect
import { useAppContext } from "../../context/AppContext"; // ใช้ context กลาง
import type { Post } from "../../context/AppContext"; // type ของโพสต์

const Home = () => {
  const navigate = useNavigate(); // hook นำทางไปหน้าอื่น
  const [username, setUsername] = useState<string | null>(null); // เก็บชื่อผู้ใช้
  const [role, setRole] = useState<string | null>(null); // เก็บ role ผู้ใช้
  const { posts, getTopLikedPosts } = useAppContext(); // ดึงโพสต์ทั้งหมดและฟังก์ชันหายอดไลค์สูงสุด
  const [topPosts, setTopPosts] = useState<Post[]>([]); // เก็บโพสต์ยอดนิยม

  useEffect(() => {
    setTopPosts(getTopLikedPosts()); // อัปเดตโพสต์ยอดนิยมทุกครั้งที่ posts เปลี่ยน
  }, [posts]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // ดึงข้อมูล user จาก localStorage
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser); // แปลงเป็น object
        if (user && typeof user === 'object' && user.username && user.role) {
          setUsername(user.username); // ตั้งค่าชื่อผู้ใช้
          setRole(user.role); // ตั้งค่า role
        } else {
          localStorage.removeItem("user"); // ถ้าข้อมูลไม่ถูกต้องลบออก
          navigate("/"); // กลับหน้าแรก
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error); // error parsing
        localStorage.removeItem("user");
        navigate("/");
      }
    } else {
      navigate("/"); // ถ้าไม่มี user ก็กลับหน้าแรก
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // ลบข้อมูล user
    setUsername(null);
    setRole(null);
    navigate("/"); // กลับหน้าแรก
    window.location.reload(); // รีโหลดเพื่อ reset state ทั้งหมด
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full pt-20 bg-gray-900 text-white px-4 sm:px-6 lg:px-8 gap-6">
      {/* Center Panel */}
      <div className="flex-1 flex flex-col rounded-3xl gap-6">
        
        {/* Top Center - Code Section */}
        <div className="bg-gray-800 rounded-3xl shadow-xl p-6 hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Code List</h2>
          <Code /> {/* แสดงรายการโค้ด */}
        </div>

        {/* Bottom Center - Content Section */}
        <div className="flex-1 bg-gray-800 rounded-3xl shadow-xl p-6 overflow-auto hover:scale-100 transition-transform duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Content</h2>
          <CreateContent /> {/* แสดงรายการคอนเทนต์ */}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/4 flex flex-col gap-6">

        {/* User Box */}
        <div className="flex flex-col gap-4 justify-center items-center bg-gray-800/70 p-6 rounded-3xl shadow-lg">
          {username ? (
            <>
              <p className="text-lg font-semibold">👋 สวัสดี {username}</p> {/* ชื่อผู้ใช้ */}
              <p className="text-sm text-gray-300">Role: {role}</p> {/* แสดง role */}
              <Buttons variant="back" onClick={handleLogout}>
                Logout
              </Buttons> {/* ปุ่มออกจากระบบ */}
            </>
          ) : (
            <>
              {/* ปุ่มเข้าสู่ระบบ */}
              <Link className="w-full" to="/PROFILE/Login">
                <Buttons variant="login">Login</Buttons>
              </Link>

              {/* ปุ่มสมัครสมาชิก */}
              <Link className="w-full" to="/PROFILE/RegisterPage">
                <Buttons variant="register">Register</Buttons>
              </Link>
            </>
          )}
        </div>

        {/* Popular Posts */}
        <div className="bg-gray-800/80 p-4 rounded-2xl shadow-inner text-red-500 font-bold">
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-white mb-2">🔥 โพสต์ยอดนิยม</h3>

            {topPosts.length === 0 ? (
              <p className="text-gray-400 text-sm">ยังไม่มีโพสต์ยอดนิยม</p>
            ) : (
              <ul className="space-y-2">
                {topPosts.map(post => (
                  <li key={post.id} className="text-sm text-gray-300">
                    <span className="font-semibold">{post.title}</span> — {post.likes} ไลค์
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
