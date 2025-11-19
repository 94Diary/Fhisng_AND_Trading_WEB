import { motion, AnimatePresence } from "framer-motion";

interface CardCodeProps {
  title: string;
  checkedBy: string[];
  onToggle: () => void;
  username: string | null;
}

const CodeProps: React.FC<CardCodeProps> = ({ title, checkedBy, onToggle, username }) => {
  const checked = username ? checkedBy.includes(username) : false;

  return (
    <AnimatePresence>
      <>
      
        <motion.div className="bg-gray-800 text-white rounded-xl shadow-md p-3 mb-2 flex items-center gap-4 cursor-pointer "
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        >
          <input
            type="checkbox"
            className="w-5 h-5 text-blue-500 bg-gray-700 border-gray-500 rounded"
            checked={checked}
            onChange={onToggle}
          />
          <span className="text-lg">{title}</span>
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default CodeProps;
