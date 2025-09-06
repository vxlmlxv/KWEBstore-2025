import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils";
import { Modal } from "../components/Modal";
import { orderFormSchema, type OrderFormData } from "../schemas/orderForm";

export const OrderPage = () => {
  const { getSelectedItems, getSelectedItemsTotal, clearCart } = useCart();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();

  const selectedItems = getSelectedItems();
  const totalPrice = getSelectedItemsTotal();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    mode: "onChange",
  });

  if (selectedItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          주문할 상품이 없습니다
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          장바구니에서 상품을 선택해주세요
        </p>
        <button
          onClick={() => navigate("/cart")}
          className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold"
        >
          장바구니로 가기
        </button>
      </div>
    );
  }

  const onSubmit = async (data: OrderFormData) => {
    console.log("Order data:", data);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    clearCart();
    setShowPaymentModal(false);
    navigate("/");
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          주문서
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 주문 정보 입력 */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* 주문자 정보 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  주문자 정보
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="홍길동"
                      className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.name
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      전화번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="010-1234-5678"
                      className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.phone
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      이메일
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="example@email.com"
                      className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* 배송 정보 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  배송 정보
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    배송지 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("address")}
                    rows={3}
                    placeholder="서울시 강남구 테헤란로 123, 456호"
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${
                      errors.address
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* 결제 정보 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  결제 수단 <span className="text-red-500">*</span>
                </h2>

                <div className="space-y-3">
                  {[
                    { value: "card", label: "신용카드/체크카드" },
                    { value: "transfer", label: "계좌이체" },
                    { value: "virtual", label: "가상계좌" },
                    { value: "phone", label: "휴대폰 결제" },
                  ].map((payment) => (
                    <label
                      key={payment.value}
                      className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <input
                        {...register("paymentMethod")}
                        type="radio"
                        value={payment.value}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 focus:ring-2"
                      />
                      <span className="text-gray-900 dark:text-white">
                        {payment.label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.paymentMethod.message}
                  </p>
                )}
              </motion.div>

              {/* 결제 버튼 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
                >
                  {formatPrice(totalPrice)} 결제하기
                </button>
              </motion.div>
            </form>
          </div>

          {/* 주문 요약 */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                주문 상품
              </h2>

              <div className="space-y-4 mb-6">
                {selectedItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.product.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        수량: {item.quantity}개
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>상품금액</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>배송비</span>
                  <span>무료</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>총 결제금액</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 결제 완료 모달 */}
      <Modal
        isOpen={showPaymentModal}
        onClose={handlePaymentComplete}
        title="결제가 완료되었습니다"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            주문이 성공적으로 완료되었습니다.
            <br />
            빠른 시일 내에 배송해드리겠습니다.
          </p>
          <button
            onClick={handlePaymentComplete}
            className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-6 rounded-lg"
          >
            홈으로 가기
          </button>
        </div>
      </Modal>
    </>
  );
};
