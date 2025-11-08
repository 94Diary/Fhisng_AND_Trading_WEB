import { Link } from "react-router-dom";

interface CategoryProps {
  title: string;
  description: string;
  to: string; // เส้นทางที่ต้องการให้ไป
}

const Category: React.FC<CategoryProps> = ({ title, description, to }) => {
  return (
    <Link
      to={to}
      className="w-full max-w-6xl bg-gray-700 hover:bg-gray-600 hover:scale-[1.02]
                text-white text-2xl rounded-lg shadow-lg 
                 max-h-96 overflow-auto flex flex-col gap-4 cursor-pointer p-10"
    >
      <h1 className="font-bold text-5xl mb-4">{title}</h1>
      <p className="mb-4 text-gray-300">{description}</p>
    </Link>
  );
};

export default Category;
