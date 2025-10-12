
import './App.css'
import NavBar from './components/NavBar'

function App() {

  return (
   <div className="min-h-screen bg-gray-50 w-screen h-screen">
      <NavBar />
      <div className="p-8 text-center text-gray-700">
        <h1 className="text-3xl font-bold">ยินดีต้อนรับสู่เว็บของคุณ!</h1>
      </div>
    </div>  
  )
}

export default App
