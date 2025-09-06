import { useState, useEffect, useMemo } from "react";
import type { CartItem, Product } from "../types";

const CART_STORAGE_KEY = "kwebstore-cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log("Loading cart from localStorage:", parsedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart data:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      console.log("Cart changed, saving to localStorage:", cart);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Product, quantity: number = 1) => {
    console.log("Adding to cart:", product.title, "quantity:", quantity);
    setCart((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        console.log("Updating existing item");
        const newCart = prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log("New cart after update:", newCart);
        return newCart;
      } else {
        console.log("Adding new item");
        const newCart = [...prev, { product, quantity, selected: true }];
        console.log("New cart after adding:", newCart);
        return newCart;
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleSelection = (productId: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  const selectAll = () => {
    setCart((prev) =>
      prev.map((item) => ({ ...item, selected: !item.selected }))
    );
  };

  const removeSelected = () => {
    setCart((prev) => prev.filter((item) => !item.selected));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartItemsCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const getSelectedItemsTotal = () => {
    return cart
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getSelectedItems = () => {
    return cart.filter((item) => item.selected);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleSelection,
    selectAll,
    removeSelected,
    clearCart,
    getCartItemsCount,
    getSelectedItemsTotal,
    getSelectedItems,
  };
};
