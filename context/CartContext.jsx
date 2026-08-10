"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const [isCartLoaded, setIsCartLoaded] =
    useState(false);

  // ==========================
  // Cart Drawer State
  // ==========================

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  // ==========================
  // Load Cart
  // ==========================

  useEffect(() => {
    try {
      const savedCart =
        localStorage.getItem("cart");

      if (savedCart) {
        const parsedCart =
          JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );
    } finally {
      setIsCartLoaded(true);
    }
  }, []);

  // ==========================
  // Save Cart
  // ==========================

  useEffect(() => {
    if (!isCartLoaded) return;

    try {
      localStorage.setItem(
        "cart",
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [cartItems, isCartLoaded]);

  // ==========================
  // Add Item
  // ==========================

  const addItem = (product) => {
    console.log(
      "Adding item:",
      product
    );

    setCartItems((prev) => {
      const existingItem =
        prev.find(
          (item) =>
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
        );

      // ==========================
      // Existing Product + Variant
      // ==========================

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) +
                  Number(product.quantity || 1),
              }
            : item
        );
      }

      // ==========================
      // New Product
      // ==========================

      return [
        ...prev,
        {
          ...product,
          quantity:
            Number(product.quantity) || 1,
        },
      ];
    });

    // Open drawer after adding
    openCart();
  };

  // ==========================
  // Remove Item
  // ==========================

  const removeItem = (
    id,
    size,
    color
  ) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size &&
            item.color === color
          )
      )
    );
  };

  // ==========================
  // Update Quantity
  // ==========================

  const updateQuantity = (
    id,
    size,
    color,
    quantity
  ) => {
    const newQuantity =
      Number(quantity);

    if (
      !Number.isFinite(newQuantity) ||
      newQuantity < 1
    ) {
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.size === size &&
        item.color === color
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );
  };

  // ==========================
  // Clear Cart
  // ==========================

  const clearCart = () => {
    setCartItems([]);
  };

  // ==========================
  // Totals
  // ==========================

  const totalItems =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );

  const subtotal =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );

  // ==========================
  // Context Value
  // ==========================

  const value = {
    cartItems,

    addItem,
    removeItem,
    updateQuantity,
    clearCart,

    totalItems,
    subtotal,

    isCartLoaded,

    // Drawer
    isCartOpen,
    openCart,
    closeCart,
  };

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}

// ==========================
// useCart Hook
// ==========================

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}