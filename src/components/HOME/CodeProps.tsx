// Code.tsx
import { useState } from "react";

interface CardCodeProps {
  title: string;
}

const CodeProps: React.FC<CardCodeProps> = ({ title }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="max-w-4xl mx-auto mt-6 p-2 bg-gray-800 text-white text-2xl rounded-lg shadow-lg">
      <label className="flex items-center gap-4 cursor-pointer p-2 rounded">
        {/* Checkbox */}
        <input
          type="checkbox"
          className="w-6 h-6 text-blue-500 bg-gray-700 border-gray-500 rounded"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        {/* Title */}
        <span>{title}</span>
      </label>
    </div>
  );
};

export default CodeProps;
