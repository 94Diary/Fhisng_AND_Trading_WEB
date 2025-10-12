// Home.tsx
import CodeProps from './CodeProps'
const Card = () => {
    const codeData = [
    { title: "Code 1" },
    { title: "Code 2" },
    { title: "Code 3" },
  ];
  return (
    <div className="flex-1 bg-gray-900 text-white text-3xl p-6">
        <div className='flex-1 mt-6 bg-gray-500 text-white text-3xl rounded-lg shadow-lg p-6 w-full h-60 overflow-y-auto'>
            {codeData.map((code, index) => (
                <CodeProps key={index} title={code.title} />
            ))}
        </div>
    </div>
  )
}

export default Card
