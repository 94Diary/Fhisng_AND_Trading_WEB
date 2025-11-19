import CreateContent from "./CreateContent";
import Code from "./CreateCode";
import Buttons from "../Buttons/Buttons";
import { Link, useNavigate } from "react-router-dom";
import  { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import type { Post } from "../../context/AppContext";


const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const { posts, getTopLikedPosts } = useAppContext();

  const [topPosts, setTopPosts] = useState<Post[]>([]);

  
useEffect(() => {
  setTopPosts(getTopLikedPosts());
}, [posts]);

  

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  console.log("storedUser:", storedUser);
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      console.log("parsed user:", user);
      if (user && typeof user === 'object' && user.username && user.role) {
        setUsername(user.username);
        setRole(user.role);
      } else {
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem("user");
      navigate("/");
    }
  } else {
    console.log("No user found, navigating to /");
    navigate("/");
  }
}, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("user");
    setUsername(null);
    setRole(null);
    navigate("/");
    window.location.reload()
  };

  return (
    <div className="flex h-full w-full pt-20 bg-gray-900 text-white">
      {/* Center Panel */}
      <div className="flex-1 flex flex-col m-8 rounded-3xl gap-6">
        {/* Top Center - Code Section */}
        <div className="bg-gray-800 rounded-3xl shadow-xl p-6 hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold mb-4">Code List</h2>
          <Code />
        </div>

        {/* Bottom Center - Content Section */}
        <div className="flex-1 bg-gray-800 rounded-3xl shadow-xl p-6 overflow-auto hover:scale-100 transition-transform duration-300">
          <h2 className="text-3xl font-bold mb-4">Content</h2>
          <CreateContent />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/5 h-[900px] flex flex-col gap-6">
        {username ? (
          <div className="flex flex-col gap-4 justify-center items-center m-4 bg-gray-800/70 p-6 rounded-3xl shadow-lg">
            <p className="text-lg font-semibold">👋 สวัสดี {username}</p>
            <p className="text-sm text-gray-300">Role: {role}</p>
            <Buttons variant="back" onClick={handleLogout}>
              Logout
            </Buttons>
          </div>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center m-4 bg-gray-800/70 p-6 rounded-3xl shadow-lg">
            <Link className="w-full" to="/PROFILE/Login">
              <Buttons variant="login">
                Login
              </Buttons>
            </Link>
            <Link className="w-full" to="/PROFILE/RegisterPage">
              <Buttons variant="register">
                Register
              </Buttons>
            </Link>
          </div>
        )}

        <div className="flex-1 m-4 bg-gray-800/80 p-4 rounded-2xl shadow-inner flex items-center justify-center text-red-500 font-bold">
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