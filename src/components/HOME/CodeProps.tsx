interface CardCodeProps {
  title: string;
  checkedBy: string[];
  onToggle: () => void;
  username: string | null;
}

const CodeProps: React.FC<CardCodeProps> = ({ title, checkedBy, onToggle, username }) => {
  const checked = username ? checkedBy.includes(username) : false;

  return (
    <div className="bg-gray-800 text-white rounded-xl shadow-md p-3 mb-2 flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform">
      <input
        type="checkbox"
        className="w-5 h-5 text-blue-500 bg-gray-700 border-gray-500 rounded"
        checked={checked}
        onChange={onToggle}
      />
      <span className="text-lg">{title}</span>
    </div>
  );
};

export default CodeProps;
