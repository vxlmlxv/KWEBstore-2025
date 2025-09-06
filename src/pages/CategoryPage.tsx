import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Package } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "../types";
import { api } from "../services/api";
import { ProductCard } from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Skeleton";
import { SortButtons } from "../components/SortButtons";

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const sortBy = searchParams.get("sortBy") || "";
  const order = searchParams.get("order") || "";

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!category) return;

      try {
        setLoading(true);
        const response = await api.getProductsByCategory(
          category,
          sortBy || undefined,
          order || undefined
        );
        setProducts(response.products);
      } catch (error) {
        console.error("Failed to fetch category products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category, sortBy, order]);

  const handleSort = (newSortBy: string, newOrder: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", newSortBy);
    newParams.set("order", newOrder);
    setSearchParams(newParams);
  };

  const getCategoryDisplayName = (categorySlug: string) => {
    // 카테고리 슬러그를 사용자 친화적인 이름으로 변환
    return categorySlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Package size={64} className="mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          카테고리를 찾을 수 없습니다
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {getCategoryDisplayName(category)}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {!loading && `총 ${products.length}개의 상품`}
        </p>
      </motion.div>

      {loading ? (
        <ProductGridSkeleton count={8} />
      ) : products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            해당 카테고리에 상품이 없습니다
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            다른 카테고리를 둘러보세요
          </p>
        </motion.div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              총 {products.length}개의 상품
            </p>
            <SortButtons
              currentSort={sortBy}
              currentOrder={order}
              onSort={handleSort}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
