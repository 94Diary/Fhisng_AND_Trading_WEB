interface CategoryProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const Category: React.FC<CategoryProps> = ({ title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-wite max-w-6xl p-10 bg-gray-700 hover:bg-gray-600 transition duration-200 
                text-left text-white text-2xl rounded-lg shadow-lg max-h-96 overflow-auto flex flex-col gap-4"
    >
      <h1 className="font-bold text-5xl mb-4">{title}</h1>
      <p className="mb-4">{description}</p>
    </button>
  );
};

export default Category;
