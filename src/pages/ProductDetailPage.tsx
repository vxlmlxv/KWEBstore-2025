import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "../types";
import { api } from "../services/api";
import { useCart } from "../hooks/useCart";
import { formatPrice, getStarArray } from "../utils";
import { Modal } from "../components/Modal";

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const productData = await api.getProduct(parseInt(id));
        setProduct(productData);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    console.log("Add to cart button clicked");
    console.log("Product:", product?.title);
    console.log("Quantity:", quantity);
    if (product) {
      addToCart(product, quantity);
      setShowAddToCartModal(true);
      console.log("Added to cart and showing modal");
      setTimeout(() => setShowAddToCartModal(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-300 dark:bg-gray-600 rounded-lg" />
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
              <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          상품을 찾을 수 없습니다
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const stars = getStarArray(product.rating);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-6"
        >
          <ArrowLeft size={20} />
          <span>뒤로 가기</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 상품 이미지 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              <img
                src={product.images[selectedImage] || product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-primary-500"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* 상품 정보 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {product.brand} • {product.category}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {stars.map((star, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      star === "full"
                        ? "text-yellow-400 fill-current"
                        : star === "half"
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                ({product.rating})
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                    {formatPrice(
                      product.price / (1 - product.discountPercentage / 100)
                    )}
                  </span>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <div className="inline-block bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  {Math.round(product.discountPercentage)}% 할인
                </div>
              )}
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  수량
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white px-4">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <ShoppingCart size={20} />
                <span>장바구니에 담기</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <span className="font-medium">재고:</span> {product.stock}개
              </div>
              <div>
                <span className="font-medium">브랜드:</span> {product.brand}
              </div>
              <div>
                <span className="font-medium">무게:</span> {product.weight}g
              </div>
              <div>
                <span className="font-medium">보증:</span>{" "}
                {product.warrantyInformation}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 장바구니 추가 완료 모달 */}
      <Modal
        isOpen={showAddToCartModal}
        onClose={() => setShowAddToCartModal(false)}
        title="장바구니에 추가되었습니다"
      >
        <div className="text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            {product.title}이(가) 장바구니에 추가되었습니다.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowAddToCartModal(false)}
              className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              계속 쇼핑하기
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg"
            >
              장바구니 보기
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
