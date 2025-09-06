import { motion } from "framer-motion";
import { ProductCard } from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Skeleton";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export const HomePage = () => {
  const { products, loading } = useInfiniteScroll();

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            KWEBstore에서
            <br />
            <span className="text-primary-500">특별한 쇼핑</span>을 경험하세요
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            2025-2 KWEB 정회원 면제 과제
          </motion.p>
        </motion.div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-100 dark:bg-primary-900 rounded-full translate-x-48 translate-y-48 opacity-30" />
      </section>

      {/* 상품 목록 섹션 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              인기 상품
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              고객들이 가장 많이 찾는 상품들을 만나보세요
            </p>
          </motion.div>

          {products.length === 0 && loading ? (
            <ProductGridSkeleton count={8} />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>

              {loading && (
                <div className="mt-8">
                  <ProductGridSkeleton count={4} />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};
