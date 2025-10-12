// Home.tsx
interface ContentProps {
  title:string;
  description:string;
}

const Content:React.FC<ContentProps> = ({title, description}) => {
  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-gray-800 text-white text-2xl rounded-lg shadow-lg h-96 overflow-auto">
      <h1 >{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default Content
