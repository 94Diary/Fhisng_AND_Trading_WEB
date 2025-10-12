import NavBar from './components/NavBar'
import Home from './components/HOME/Home'

function App() {
  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col">
      <NavBar/>
      {/* Content ขยายเต็มพื้นที่ที่เหลือ */}
      <Home></Home>
      
    </div>
  )
}

export default App
