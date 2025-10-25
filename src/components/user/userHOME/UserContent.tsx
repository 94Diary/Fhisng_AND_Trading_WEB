import { MdOutlineReadMore } from "react-icons/md";


// components/HOME/Content.tsx
interface ContentProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const Content: React.FC<ContentProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="relative max-w-4xl mx-auto m-10 p-10 bg-gray-900 text-white text-2xl shadow-3lg shadow-black max-h-100 transition hover:shadow-2xl hover:shadow-black  hover:scale-110 overflow-auto rounded-3xl flex flex-col active:scale-75 group">
    <div className="relative z-10 flex flex-col">
      <h1 className="font-bold text-5xl mb-4">{title}</h1>
      <p className="mb-4">{description}</p>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="mt-4 rounded-lg w-full object-cover max-h-100"
        />
      )}
    </div>

    <div className="absolute  bg-black/55 inset-0 flex items-center justify-center text-white text-9xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-20 cursor-pointer ">
      <MdOutlineReadMore />
    </div>
    </div>


  )
}

export default Content;
