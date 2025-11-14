// Home.tsx
import CodeProps from './UserCodeProps'
const Card = () => {
    const codeData = [
    { title: "Code 1" },
    { title: "Code 2" },
    { title: "Code 3" },
    { title: "Code 3" },
    { title: "Code 3" },
    { title: "Code 3" },
  ];
  return (
    <div className="flex-1 text-white text-3xl bg-gray-800 rounded-3xl hover:scale-110">
        <div className='flex-1 mt-15  text-white text-3xl rounded-lg shadow-lg w-full h-60 overflow-y-auto '>
            {codeData.map((code, index) => (
                <CodeProps key={index} title={code.title} />
            ))}
        </div>
    </div>
  )
}

export default Card
