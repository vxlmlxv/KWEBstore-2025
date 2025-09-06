import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "../hooks/useDarkMode";
import { useCart } from "../hooks/useCart";
import { api } from "../services/api";
import type { Category } from "../types";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  console.log("Header - cart items count:", cartItemsCount);
  const navigate = useNavigate();

  // get categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await api.getCategories();
        setCategories(categoryData.slice(0, 10)); // 상위 10개만 표시
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Y</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              KWEBstore
            </span>
          </Link>

          {/* categories */}
          <div className="hidden md:flex relative">
            <button
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
              className="flex items-center space-x-1 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors"
            >
              <span>카테고리</span>
              <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {isCategoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onMouseEnter={() => setIsCategoryOpen(true)}
                  onMouseLeave={() => setIsCategoryOpen(false)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
                >
                  <div className="py-2">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        to={`/category/${category.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-500 transition-colors capitalize"
                        onClick={() => setIsCategoryOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* search bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="상품을 검색해보세요..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 dark:text-gray-400 hover:text-primary-500"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          <div className="flex items-center space-x-4">
            {/* dark mode */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
              aria-label="다크모드 토글"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
              aria-label="장바구니"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* mobile - menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400"
              aria-label="메뉴"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
            >
              {/* mobile searchBar */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="상품을 검색해보세요..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 dark:text-gray-400"
                >
                  <Search size={20} />
                </button>
              </form>

              {/* mobile categories */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 px-2">
                  카테고리
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(0, 8).map((category) => (
                    <Link
                      key={category.slug}
                      to={`/category/${category.slug}`}
                      className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors capitalize"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
