import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SortButtonsProps {
  currentSort: string;
  currentOrder: string;
  onSort: (sortBy: string, order: string) => void;
}

const sortOptions = [
  { value: "title", order: "asc", label: "이름순 (A-Z)" },
  { value: "title", order: "desc", label: "이름순 (Z-A)" },
  { value: "price", order: "desc", label: "높은 가격순" },
  { value: "price", order: "asc", label: "낮은 가격순" },
];

export const SortButtons = ({
  currentSort,
  currentOrder,
  onSort,
}: SortButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = sortOptions.find(
    (option) => option.value === currentSort && option.order === currentOrder
  );

  const handleSelect = (sortBy: string, order: string) => {
    onSort(sortBy, order);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span>{currentOption ? currentOption.label : "정렬 기준"}</span>
        <ChevronDown
          size={16}
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
          >
            <div className="py-1">
              {sortOptions.map((option) => (
                <button
                  key={`${option.value}-${option.order}`}
                  onClick={() => handleSelect(option.value, option.order)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    currentSort === option.value &&
                    currentOrder === option.order
                      ? "bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 배경 클릭으로 닫기 */}
      {isOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
