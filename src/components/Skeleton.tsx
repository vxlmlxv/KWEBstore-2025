export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-300 dark:bg-gray-600" />
      <div className="p-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2" />
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"
            />
          ))}
        </div>
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};
