import { useState, useEffect, useCallback } from "react";
import type { Product } from "../types";
import { api } from "../services/api";

export const useInfiniteScroll = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);

  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await api.getAllProducts(8, skip);

      if (response.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...response.products]);
        setSkip((prev) => prev + 8);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, skip]);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreProducts]);

  // 초기 데이터 로드
  useEffect(() => {
    if (products.length === 0) {
      loadMoreProducts();
    }
  }, []);

  const reset = () => {
    setProducts([]);
    setSkip(0);
    setHasMore(true);
    setLoading(false);
  };

  return {
    products,
    loading,
    hasMore,
    reset,
  };
};
