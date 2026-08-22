"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

// ==========================
// Variant Value Normalizer
// ==========================

function normalizeVariant(value) {
  if (!value) return "";

  if (typeof value === "object") {
    return String(
      value.slug ||
        value.name ||
        value.value ||
        ""
    )
      .toLowerCase()
      .trim();
  }

  return String(value)
    .toLowerCase()
    .trim();
}

// ==========================
// Cart Provider
// ==========================

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

    const productSize =
      normalizeVariant(product.size);

    const productColor =
      normalizeVariant(product.color);

    setCartItems((prev) => {
      const existingItem =
        prev.find((item) => {
          return (
            item.id === product.id &&
            normalizeVariant(item.size) ===
              productSize &&
            normalizeVariant(item.color) ===
              productColor
          );
        });

      // ==========================
      // Existing Product + Variant
      // ==========================

      if (existingItem) {
        return prev.map((item) => {
          const sameVariant =
            item.id === product.id &&
            normalizeVariant(item.size) ===
              productSize &&
            normalizeVariant(item.color) ===
              productColor;

          if (!sameVariant) {
            return item;
          }

          return {
            ...item,
            quantity:
              Number(item.quantity || 0) +
              Number(product.quantity || 1),
          };
        });
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

    // ==========================
    // Open Drawer
    // ==========================

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
    const normalizedSize =
      normalizeVariant(size);

    const normalizedColor =
      normalizeVariant(color);

    setCartItems((prev) =>
      prev.filter((item) => {
        const sameVariant =
          item.id === id &&
          normalizeVariant(item.size) ===
            normalizedSize &&
          normalizeVariant(item.color) ===
            normalizedColor;

        return !sameVariant;
      })
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

    const normalizedSize =
      normalizeVariant(size);

    const normalizedColor =
      normalizeVariant(color);

    setCartItems((prev) =>
      prev.map((item) => {
        const sameVariant =
          item.id === id &&
          normalizeVariant(item.size) ===
            normalizedSize &&
          normalizeVariant(item.color) ===
            normalizedColor;

        if (!sameVariant) {
          return item;
        }

        return {
          ...item,
          quantity: newQuantity,
        };
      })
    );
  };

  // ==========================
  // Clear Cart
  // ==========================

  const clearCart = () => {
    setCartItems([]);
  };

  // ==========================
  // Total Items
  // ==========================

  const totalItems =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );

  // ==========================
  // Subtotal
  // ==========================

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