import React from 'react';
import { motion } from 'framer-motion';

interface TagSelectorProps {
  tag: string;
  selected: boolean;
  onClick: () => void;
}

export const TagSelector: React.FC<TagSelectorProps> = ({ tag, selected, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm md:text-base transition-colors duration-300 ${
        selected 
          ? 'bg-rose-500 border-rose-500 text-white shadow-md' 
          : 'bg-white border-gray-200 text-gray-600 hover:border-rose-200'
      }`}
    >
      {tag}
    </motion.button>
  );
};