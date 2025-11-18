import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/HOME/Home';
import WebBoard from './components/WEBBOARD/WebBoard';
import Gallery from './components/GALLERY/Gallery';
import Profile from './components/PROFILE/Profile';
import CheckIn from './components/PROFILE/CheckIn';
import Footer from "./components/Footer";
import Login from './components/PROFILE/login';
import RegisterPage from './components/PROFILE/RegisterPage';
import CategoryList from './components/WEBBOARD/CategoryList';
import CategoryListG from './components/GALLERY/CategoryList';
import ContentAdmin from './components/WEBBOARD/ContentAdmin';
import ContentUser from './components/WEBBOARD/ContentUser';
import ContentAdminG from './components/GALLERY/ContentAdmin';
import ContentUserG from './components/GALLERY/ContentUser';

function App() {
  return (
    <Router>
      <div className="w-full flex flex-col relative min-h-screen">
        {/* พื้นหลัง */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('/bg.png')" }}
        ></div>

        {/* NavBar fixed บนสุด */}
        <NavBar />
        {/* ส่วนเนื้อหาหลัก */}
        <div className="flex-1 pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            
             {/* Layout ของ WebBoard */}
            <Route path="/webboard" element={<WebBoard />}>
              <Route index element={<CategoryList/>} /> {/* แสดง list ตอนยังไม่กด */}
              <Route path="news" element={<ContentAdmin />} />
              <Route path="general" element={<ContentUser />} />
            </Route>

            <Route path="/gallery" element={<Gallery />}> 
              <Route index element={<CategoryListG/>} /> {/* แสดง list ตอนยังไม่กด */}
              <Route path="news" element={<ContentAdminG />} />
              <Route path="general" element={<ContentUserG />} />
            </Route>


            <Route path="/profile" element={<Profile />} />

            <Route path="/CheckIn" element={<CheckIn />} />
            <Route path="/PROFILE/login" element={<Login />} />
            <Route path="/PROFILE/RegisterPage" element={<RegisterPage />} />
          </Routes>
        </div>

        {/* Footer แสดงทุกหน้า */}
        <Footer />

      </div>
    </Router>
  );
}


export default App;
