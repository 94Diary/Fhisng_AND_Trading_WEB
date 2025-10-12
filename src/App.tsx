import NavBar from './components/NavBar'
import Home from './components/HOME/Home'

function App() {
  return (
    <div className="h-screen w-full bg-[url('/bg.jpg')] flex flex-col"
    style={{backgroundImage: "url('/bg.png')"}}>
      <NavBar/>
      {/* Content ขยายเต็มพื้นที่ที่เหลือ */}
      <Home></Home>
    </div>
  )
}

export default App
