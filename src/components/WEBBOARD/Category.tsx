// components/WEBBOARD/Category.tsx
interface CategoryProps {
  title: string;
  description: string;
}

const Category: React.FC<CategoryProps> = ({ title, description,  }) => {
  return (
   <div className="max-w-6xl p-10 bg-gray-700 text-white text-2xl rounded-lg shadow-lg max-h-96 overflow-auto flex flex-col">
      <h1 className="font-bold text-5xl mb-4">{title}</h1>
      <p className="mb-4">{description}</p>
    </div>
  )
}

export default Category;
