// Home.tsx
import Code from './Code'
import Content from './Content'
const Home = () => {
  return (
    <div className="flex-1 bg-gray-800 text-white text-3xl p-6">
      ยินดีต้อนรับสู่หน้า Home
        <Code/>
        <div className='flex-1 mt-6 bg-red-800 text-white text-3xl rounded-lg shadow-lg p-6 w-full'>
            <Content />
        </div>
    </div>
  )
}

export default Home
