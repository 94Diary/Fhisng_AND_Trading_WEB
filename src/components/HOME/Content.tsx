// components/HOME/Content.tsx
interface ContentProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const Content: React.FC<ContentProps> = ({ title, description, imageUrl }) => {
  return (
   <div className="max-w-4xl mx-auto m-10 p-10 bg-gray-900 text-white text-2xl shadow-3lg shadow-black max-h-100 transition hover:shadow-2xl hover:shadow-black  hover:scale-110 overflow-auto flex flex-col">
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


  )
}

export default Content;
