import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils";
import { Modal } from "../components/Modal";

export const CartPage = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    toggleSelection,
    selectAll,
    removeSelected,
    getSelectedItemsTotal,
    getSelectedItems,
  } = useCart();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  console.log("CartPage - cart contents:", cart);
  console.log("CartPage - cart length:", cart.length);

  const selectedItems = getSelectedItems();
  const totalPrice = getSelectedItemsTotal();
  const hasSelectedItems = selectedItems.length > 0;
  const allSelected = cart.length > 0 && cart.every((item) => item.selected);

  const handleRemoveSelected = () => {
    removeSelected();
    setShowDeleteModal(true);
  };

  const handleOrder = () => {
    if (hasSelectedItems) {
      navigate("/order");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            장바구니가 비어있습니다
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            원하는 상품을 장바구니에 담아보세요
          </p>
          <Link
            to="/"
            className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            쇼핑 계속하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          장바구니
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 상품 목록 */}
          <div className="lg:col-span-2 space-y-4">
            {/* 전체 선택 / 선택 삭제 */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={selectAll}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                />
                <span className="text-gray-900 dark:text-white font-medium">
                  전체 선택 ({selectedItems.length}/{cart.length})
                </span>
              </label>
              <button
                onClick={handleRemoveSelected}
                disabled={!hasSelectedItems}
                className="text-red-600 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <Trash2 size={16} />
                <span>선택 삭제</span>
              </button>
            </div>

            {/* 장바구니 아이템들 */}
            <div className="space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelection(item.product.id)}
                      className="mt-2 w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                    />

                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        <Link
                          to={`/products/${item.product.id}`}
                          className="hover:text-primary-500"
                        >
                          {item.product.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        {item.product.brand}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-lg font-semibold text-gray-900 dark:text-white px-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 주문 요약 */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                주문 요약
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>선택한 상품 ({selectedItems.length}개)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>배송비</span>
                  <span>무료</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>총 주문금액</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleOrder}
                disabled={!hasSelectedItems}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                주문하기
              </button>

              <Link
                to="/"
                className="block text-center text-primary-500 hover:text-primary-600 mt-4"
              >
                계속 쇼핑하기
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 삭제 완료 모달 */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="상품이 삭제되었습니다"
      >
        <div className="text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            선택한 상품이 장바구니에서 삭제되었습니다.
          </p>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-6 rounded-lg"
          >
            확인
          </button>
        </div>
      </Modal>
    </>
  );
};
