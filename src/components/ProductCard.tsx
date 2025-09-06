import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "../types";
import { formatPrice, getStarArray } from "../utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const stars = getStarArray(product.rating);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              -{Math.round(product.discountPercentage)}%
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.title}
          </h3>

          <div className="flex items-center space-x-1 mb-2">
            {stars.map((star, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  star === "full"
                    ? "text-yellow-400 fill-current"
                    : star === "half"
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              ({product.rating})
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(
                  product.price / (1 - product.discountPercentage / 100)
                )}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
