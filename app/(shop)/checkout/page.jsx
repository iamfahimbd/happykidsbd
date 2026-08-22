"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();

  // ==========================
  // Delivery Area
  // ==========================

  const [deliveryArea, setDeliveryArea] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // ==========================
  // Form Data
  // ==========================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  // ==========================
  // Validation Errors
  // ==========================

  const [errors, setErrors] = useState({});

  // ==========================
  // Submit State
  // ==========================

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ==========================
  // Delivery Charges
  // ==========================

  const shippingCost =
    deliveryArea === "inside" ? 80 : deliveryArea === "outside" ? 150 : 0;

  // ==========================
  // Grand Total
  // ==========================

  const grandTotal = Number(subtotal) + shippingCost;

  // ==========================
  // Input Handler
  // ==========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove field error while typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ==========================
  // Delivery Area Handler
  // ==========================

  const handleDeliveryAreaChange = (area) => {
    setDeliveryArea(area);

    if (errors.deliveryArea) {
      setErrors((prev) => ({
        ...prev,
        deliveryArea: "",
      }));
    }
  };

  // ==========================
  // Validation
  // ==========================

  const validateForm = () => {
    const newErrors = {};

    // Full Name
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    // Phone
    const phone = formData.phone.trim();

    if (!phone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^01[3-9]\d{8}$/.test(phone)) {
      newErrors.phone = "Please enter a valid Bangladesh phone number.";
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = "Please enter your delivery address.";
    }

    // Delivery Area
    if (!deliveryArea) {
      newErrors.deliveryArea = "Please select a delivery area.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================
  // Place Order
  // ==========================

  const handlePlaceOrder = async () => {
    if (isSubmitting) return;

    // Validate form
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    // Prevent checkout with empty cart
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      // ==========================
      // Prepare Order Data
      // ==========================

      const orderData = {
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          notes: formData.notes.trim(),
        },

        shipping: {
          area: deliveryArea,
          cost: shippingCost,
        },

        paymentMethod,

        items: cartItems,

        subtotal: Number(subtotal),

        shippingCost,

        total: grandTotal,
      };

      console.log("ORDER DATA:", orderData);

      // ==========================
      // Send To Next.js API
      // ==========================

      const response = await fetch("/api/orders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(orderData),
      });

      // ==========================
      // Parse Response
      // ==========================

      const data = await response.json();

      // ==========================
      // API Error
      // ==========================

      if (!response.ok || !data.success) {
        console.error("Order creation failed:", data);

        alert(data?.message || "Failed to place order. Please try again.");

        return;
      }

      // ==========================
      // Success
      // ==========================

      console.log("ORDER CREATED:", data);

      // ==========================
      // Clear Cart
      // ==========================

      clearCart();

      // ==========================
      // Redirect To Success Page
      // ==========================

      window.location.href = `/order-success?order=${data.order.id}`;

      // ==========================
      // TODO:
      // Clear cart
      // Redirect to success page
      // ==========================
    } catch (error) {
      console.error("Place order error:", error);

      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================
  // Empty Cart
  // ==========================

  if (!cartItems || cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div
          className="
            mx-auto
            flex
            min-h-[70vh]
            max-w-4xl
            items-center
            justify-center
            px-4
            py-12
          "
        >
          <div
            className="
              w-full
              rounded-3xl
              bg-white
              p-8
              text-center
              shadow-sm
              sm:p-12
            "
          >
            <div
              className="
                mx-auto
                mb-5
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-sky-50
                text-4xl
              "
            >
              🛒
            </div>

            <h1
              className="
                text-2xl
                font-bold
                text-gray-900
                sm:text-3xl
              "
            >
              Your Cart is Empty
            </h1>

            <p className="mt-3 text-gray-500">
              Add some products to your cart before proceeding to checkout.
            </p>

            <Link
              href="/shop"
              className="
                mt-7
                inline-flex
                h-12
                items-center
                justify-center
                rounded-2xl
                bg-primary
                px-7
                font-semibold
                text-white
                shadow-lg
                shadow-sky-200/50
                transition
                hover:-translate-y-0.5
                hover:shadow-xl
              "
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ==========================
  // Checkout Page
  // ==========================

  return (
    <main className="min-h-screen bg-gray-50">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-8
          sm:px-6
          lg:px-8
          lg:py-12
        "
      >
        {/* ==========================
            Header
        ========================== */}

        <div className="mb-8">
          <h1
            className="
              text-3xl
              font-bold
              text-gray-900
              sm:text-4xl
            "
          >
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Complete your information to place your order.
          </p>
        </div>

        {/* ==========================
            Main Grid
        ========================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-8
            lg:grid-cols-[1fr_420px]
          "
        >
          {/* ==========================
              Customer Information
          ========================== */}

          <section
            className="
              rounded-3xl
              border
              border-gray-100
              bg-white
              p-5
              shadow-sm
              sm:p-7
            "
          >
            <h2
              className="
                text-xl
                font-bold
                text-gray-900
              "
            >
              Delivery Information
            </h2>

            <div className="mt-6 space-y-5">
              {/* ==========================
                  Name + Phone
              ========================== */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                "
              >
                {/* Full Name */}

                <div>
                  <label
                    htmlFor="name"
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                    "
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white
                      px-4
                      text-sm
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  />

                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}

                <div>
                  <label
                    htmlFor="phone"
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                    "
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white
                      px-4
                      text-sm
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  />

                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* ==========================
                  Delivery Address
              ========================== */}

              <div>
                <label
                  htmlFor="address"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows={4}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House / Road / Area / Full delivery address"
                  className="
                    w-full
                    resize-none
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                />

                {errors.address && (
                  <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                )}
              </div>

              {/* ==========================
                  Delivery Area
              ========================== */}

              <div>
                <h3
                  className="
                    mb-3
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Delivery Area
                </h3>

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                  "
                >
                  {/* Inside Dhaka */}

                  <label
                    className={`
                      flex
                      cursor-pointer
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      p-4
                      transition-all
                      duration-200
                      ${
                        deliveryArea === "inside"
                          ? "border-primary bg-sky-50 shadow-sm"
                          : "border-gray-200 bg-white hover:border-primary/50"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="deliveryArea"
                      value="inside"
                      checked={deliveryArea === "inside"}
                      onChange={(e) => handleDeliveryAreaChange(e.target.value)}
                      className="
                        h-5
                        w-5
                        accent-primary
                      "
                    />

                    <span className="flex-1">
                      <span
                        className="
                          block
                          text-sm
                          font-semibold
                          text-gray-900
                        "
                      >
                        Inside Dhaka
                      </span>

                      <span
                        className="
                          mt-0.5
                          block
                          text-xs
                          text-gray-500
                        "
                      >
                        Delivery charge: ৳80
                      </span>
                    </span>
                  </label>

                  {/* Outside Dhaka */}

                  <label
                    className={`
                      flex
                      cursor-pointer
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      p-4
                      transition-all
                      duration-200
                      ${
                        deliveryArea === "outside"
                          ? "border-primary bg-sky-50 shadow-sm"
                          : "border-gray-200 bg-white hover:border-primary/50"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="deliveryArea"
                      value="outside"
                      checked={deliveryArea === "outside"}
                      onChange={(e) => handleDeliveryAreaChange(e.target.value)}
                      className="
                        h-5
                        w-5
                        accent-primary
                      "
                    />

                    <span className="flex-1">
                      <span
                        className="
                          block
                          text-sm
                          font-semibold
                          text-gray-900
                        "
                      >
                        Outside Dhaka
                      </span>

                      <span
                        className="
                          mt-0.5
                          block
                          text-xs
                          text-gray-500
                        "
                      >
                        Delivery charge: ৳150
                      </span>
                    </span>
                  </label>
                </div>

                {errors.deliveryArea && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.deliveryArea}
                  </p>
                )}
              </div>

              {/* ==========================
    Payment Method
========================== */}

              <div>
                <h3
                  className="
      mb-3
      text-sm
      font-semibold
      text-gray-700
    "
                >
                  Payment Method
                </h3>

                <div className="space-y-3">
                  {/* Cash on Delivery */}

                  <label
                    className={`
        flex
        cursor-pointer
        items-center
        gap-3
        rounded-2xl
        border
        p-4
        transition-all
        duration-200
        ${
          paymentMethod === "cod"
            ? "border-primary bg-sky-50 shadow-sm"
            : "border-gray-200 bg-white hover:border-primary/50"
        }
      `}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="
          h-5
          w-5
          accent-primary
        "
                    />

                    <span className="flex-1">
                      <span
                        className="
            block
            text-sm
            font-semibold
            text-gray-900
          "
                      >
                        Cash on Delivery
                      </span>

                      <span
                        className="
            mt-0.5
            block
            text-xs
            text-gray-500
          "
                      >
                        Pay when your order is delivered
                      </span>
                    </span>
                  </label>

                  {/* bKash */}

                  <label
                    className={`
        flex
        cursor-pointer
        items-center
        gap-3
        rounded-2xl
        border
        p-4
        transition-all
        duration-200
        ${
          paymentMethod === "bkash"
            ? "border-primary bg-sky-50 shadow-sm"
            : "border-gray-200 bg-white hover:border-primary/50"
        }
      `}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bkash"
                      checked={paymentMethod === "bkash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="
          h-5
          w-5
          accent-primary
        "
                    />

                    <span className="flex-1">
                      <span
                        className="
            block
            text-sm
            font-semibold
            text-gray-900
          "
                      >
                        bKash
                      </span>

                      <span
                        className="
            mt-0.5
            block
            text-xs
            text-gray-500
          "
                      >
                        bKash payment
                      </span>
                    </span>
                  </label>

                  {/* Nagad */}

                  <label
                    className={`
        flex
        cursor-pointer
        items-center
        gap-3
        rounded-2xl
        border
        p-4
        transition-all
        duration-200
        ${
          paymentMethod === "nagad"
            ? "border-primary bg-sky-50 shadow-sm"
            : "border-gray-200 bg-white hover:border-primary/50"
        }
      `}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="nagad"
                      checked={paymentMethod === "nagad"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="
          h-5
          w-5
          accent-primary
        "
                    />

                    <span className="flex-1">
                      <span
                        className="
            block
            text-sm
            font-semibold
            text-gray-900
          "
                      >
                        Nagad
                      </span>

                      <span
                        className="
            mt-0.5
            block
            text-xs
            text-gray-500
          "
                      >
                        Nagad payment
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              {/* ==========================
                  Order Notes
              ========================== */}

              <div>
                <label
                  htmlFor="notes"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Order Notes
                  <span
                    className="
                      ml-1
                      font-normal
                      text-gray-400
                    "
                  >
                    (Optional)
                  </span>
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions?"
                  className="
                    w-full
                    resize-none
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                />
              </div>
            </div>
          </section>

          {/* ==========================
              Order Summary
          ========================== */}

          <aside
            className="
              h-fit
              rounded-3xl
              border
              border-gray-100
              bg-white
              p-5
              shadow-sm
              sm:p-7
              lg:sticky
              lg:top-28
            "
          >
            <h2
              className="
                text-xl
                font-bold
                text-gray-900
              "
            >
              Your Order
            </h2>

            {/* Products */}

            <div className="mt-6 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4"
                >
                  {/* Product Image */}

                  <div
                    className="
                      relative
                      h-20
                      w-20
                      shrink-0
                      overflow-hidden
                      rounded-2xl
                      bg-gray-50
                    "
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="
                        object-contain
                        p-1
                      "
                    />
                  </div>

                  {/* Product Info */}

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <h3
                      className="
                        line-clamp-2
                        text-sm
                        font-semibold
                        text-gray-900
                      "
                    >
                      {item.name}
                    </h3>

                    {/* Variant */}

                    {(item.size || item.color) && (
                      <div
                        className="
                          mt-1
                          text-xs
                          text-gray-500
                        "
                      >
                        {item.size && (
                          <span>
                            Size:{" "}
                            {Array.isArray(item.size)
                              ? item.size.join(", ").replace(/-/g, " ")
                              : String(item.size).replace(/-/g, " ")}
                          </span>
                        )}

                        {item.color && (
                          <span>
                            Color:{" "}
                            {Array.isArray(item.color)
                              ? item.color.join(", ")
                              : String(item.color)}
                          </span>
                        )}

                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                    )}

                    {/* Quantity + Price */}

                    <div
                      className="
                        mt-2
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <span
                        className="
                          text-xs
                          text-gray-500
                        "
                      >
                        Qty: {item.quantity}
                      </span>

                      <span
                        className="
                          text-sm
                          font-bold
                          text-gray-900
                        "
                      >
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}

            <div
              className="
                my-6
                border-t
                border-gray-100
              "
            />

            {/* Subtotal */}

            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-sm
                  text-gray-500
                "
              >
                Subtotal
              </span>

              <span
                className="
                  font-semibold
                  text-gray-900
                "
              >
                ৳{Number(subtotal).toLocaleString()}
              </span>
            </div>

            {/* Shipping */}

            <div
              className="
                mt-3
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <span
                className="
                  text-sm
                  text-gray-500
                "
              >
                Shipping
              </span>

              <span
                className={`
                  text-sm
                  font-semibold
                  ${deliveryArea ? "text-gray-900" : "text-gray-400"}
                `}
              >
                {deliveryArea ? `৳${shippingCost}` : "Select area"}
              </span>
            </div>

            {/* Total */}

            <div
              className="
                mt-5
                flex
                items-center
                justify-between
                border-t
                border-gray-100
                pt-5
              "
            >
              <span
                className="
                  text-lg
                  font-bold
                  text-gray-900
                "
              >
                Total
              </span>

              <span
                className="
                  text-xl
                  font-extrabold
                  text-primary
                "
              >
                ৳{grandTotal.toLocaleString()}
              </span>
            </div>

            {/* Place Order */}

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isSubmitting || !deliveryArea}
              className="
                mt-6
                flex
                h-14
                w-full
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-r
                from-primary
                to-sky-500
                px-6
                font-semibold
                text-white
                shadow-lg
                shadow-sky-200/60
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-xl
                active:translate-y-0
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:hover:translate-y-0
                disabled:hover:shadow-lg
              "
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>

            {/* Continue Shopping */}

            <Link
              href="/shop"
              className="
                mt-4
                flex
                h-12
                items-center
                justify-center
                rounded-2xl
                border
                border-gray-200
                bg-white
                text-sm
                font-semibold
                text-gray-700
                transition
                hover:border-primary
                hover:text-primary
              "
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
