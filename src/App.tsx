import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/HOME/Home';
import WebBoard from './components/WEBBOARD/WebBoard';
import Gallery from './components/GALLERY/Gallery';
import Profile from './components/PROFILE/Profile';

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
            <Route path="/webboard" element={<WebBoard />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
