"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order");

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================
  // Fetch Order
  // ==========================

  useEffect(() => {
    if (!orderId) {
      setError("Order information is missing.");
      setIsLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`/api/orders/${orderId}`, {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data?.message || "Failed to load order information.");
        }

        setOrder(data.order);
      } catch (error) {
        console.error("Failed to fetch order:", error);

        setError(
          error.message || "Something went wrong while loading your order.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // ==========================
  // Loading State
  // ==========================

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-4 py-12">
          <div className="text-center">
            <div
              className="
                mx-auto
                h-12
                w-12
                animate-spin
                rounded-full
                border-4
                border-gray-200
                border-t-primary
              "
            />

            <p className="mt-5 text-sm text-gray-500">Loading your order...</p>
          </div>
        </div>
      </main>
    );
  }

  // ==========================
  // Error State
  // ==========================

  if (error || !order) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-12">
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
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-red-50
                text-3xl
              "
            >
              !
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Unable to Load Order
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              {error || "We could not find your order information."}
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
  // Order Information
  // ==========================

  const orderNumber = order.number;

  const billing = order.billing || {};

  const shippingLines = order.shipping_lines || [];

  const shippingCost = shippingLines.reduce(
    (total, shipping) => total + Number(shipping.total || 0),
    0,
  );

  const subtotal = Number(order.total || 0) - shippingCost;

  const total = Number(order.total || 0);

  // ==========================
  // Payment Method
  // ==========================

  const paymentMethod = order.payment_method_title || "Cash on Delivery";

  // ==========================
  // Delivery Area
  // ==========================

  const shippingTitle = shippingLines?.[0]?.method_title || "";

  // ==========================
  // Format Price
  // ==========================

  const formatPrice = (price) => Number(price || 0).toLocaleString("en-BD");

  // ==========================
  // Status
  // ==========================

  const statusLabel =
    order.status === "processing"
      ? "Processing"
      : order.status === "pending"
        ? "Order Received"
        : order.status === "on-hold"
          ? "On Hold"
          : order.status;

  // ==========================
  // Page
  // ==========================

  return (
    <main className="min-h-screen bg-gray-50">
      <div
        className="
          mx-auto
          w-full
          max-w-5xl
          px-4
          py-8
          sm:px-6
          sm:py-12
          lg:px-8
          lg:py-16
        "
      >
        {/* ==========================
            Success Header
        ========================== */}

        <div className="text-center">
          {/* Success Icon */}

          <div
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-green-100
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-10 w-10 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5 12 4 4L19 6"
              />
            </svg>
          </div>

          <h1
            className="
              mt-6
              text-3xl
              font-extrabold
              text-gray-900
              sm:text-4xl
            "
          >
            Thank You For Your Order!
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Your order has been successfully received. We will contact you
            shortly to confirm your order.
          </p>

          {/* Order Number */}

          <div
            className="
              mt-5
              inline-flex
              flex-wrap
              items-center
              justify-center
              gap-2
              rounded-full
              bg-white
              px-5
              py-3
              shadow-sm
            "
          >
            <span className="text-sm text-gray-500">Order Number:</span>

            <span className="text-sm font-bold text-primary">
              #{orderNumber}
            </span>
          </div>

          {/* Status */}

          <div className="mt-3">
            <span
              className="
                inline-flex
                rounded-full
                bg-green-50
                px-4
                py-2
                text-xs
                font-semibold
                capitalize
                text-green-700
              "
            >
              {statusLabel}
            </span>
          </div>
        </div>

        {/* ==========================
            Main Content
        ========================== */}

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          {/* ==========================
              Left Column
          ========================== */}

          <div className="space-y-6">
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
              <h2 className="text-xl font-bold text-gray-900">
                Delivery Information
              </h2>

              <div className="mt-6 space-y-5">
                {/* Name */}

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Full Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {billing.first_name || "—"}
                  </p>
                </div>

                {/* Phone */}

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Phone Number
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {billing.phone || "—"}
                  </p>
                </div>

                {/* Address */}

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Delivery Address
                  </p>

                  <p className="mt-1 text-sm font-semibold leading-6 text-gray-900">
                    {billing.address_1 || "—"}
                  </p>
                </div>

                {/* Delivery Area */}

                {shippingTitle && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Delivery Area
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {shippingTitle}
                    </p>
                  </div>
                )}

                {/* Order Note */}

                {order.customer_note && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Order Note
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      {order.customer_note}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* ==========================
                Ordered Products
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
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Your Order</h2>

                <span className="text-sm text-gray-400">
                  {order.line_items?.length || 0}{" "}
                  {order.line_items?.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="mt-6 divide-y divide-gray-100">
                {order.line_items?.map((item) => {
                  const image = item.image?.src;

                  return (
                    <div
                      key={item.id}
                      className="
                          flex
                          gap-4
                          py-5
                          first:pt-0
                          last:pb-0
                        "
                    >
                      {/* Image */}

                      <div
                        className="
                            relative
                            h-20
                            w-20
                            shrink-0
                            overflow-hidden
                            rounded-2xl
                            bg-gray-50
                            sm:h-24
                            sm:w-24
                          "
                      >
                        {image ? (
                          <Image
                            src={image}
                            alt={item.name}
                            fill
                            sizes="96px"
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-2xl">
                            🛍️
                          </div>
                        )}
                      </div>

                      {/* Product Info */}

                      <div className="min-w-0 flex-1">
                        <h3
                          className="
                              line-clamp-2
                              text-sm
                              font-semibold
                              text-gray-900
                              sm:text-base
                            "
                        >
                          {item.name}
                        </h3>

                        {/* Meta Data */}

                        {item.meta_data?.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {item.meta_data.map((meta) => (
                              <p
                                key={`${item.id}-${meta.key}`}
                                className="text-xs text-gray-500"
                              >
                                <span className="font-medium">{meta.key}:</span>{" "}
                                {meta.value}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Quantity + Price */}

                        <div
                          className="
                              mt-3
                              flex
                              items-center
                              justify-between
                              gap-3
                            "
                        >
                          <span className="text-xs text-gray-500 sm:text-sm">
                            Qty: {item.quantity}
                          </span>

                          <span className="text-sm font-bold text-gray-900 sm:text-base">
                            ৳{formatPrice(item.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ==========================
              Right Column
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
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

            {/* Payment Method */}

            <div
              className="
                mt-6
                rounded-2xl
                bg-sky-50
                p-4
              "
            >
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Payment Method
              </p>

              <p className="mt-1 text-sm font-bold text-gray-900">
                {paymentMethod}
              </p>
            </div>

            {/* Divider */}

            <div className="my-6 border-t border-gray-100" />

            {/* Subtotal */}

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>

              <span className="text-sm font-semibold text-gray-900">
                ৳{formatPrice(subtotal)}
              </span>
            </div>

            {/* Shipping */}

            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500">Shipping</span>

              <span className="text-sm font-semibold text-gray-900">
                ৳{formatPrice(shippingCost)}
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
              <span className="text-lg font-bold text-gray-900">Total</span>

              <span className="text-xl font-extrabold text-primary">
                ৳{formatPrice(total)}
              </span>
            </div>

            {/* Order Date */}

            {order.date_created && (
              <div className="mt-5 text-center">
                <p className="text-xs text-gray-400">Order placed on</p>

                <p className="mt-1 text-xs font-medium text-gray-600">
                  {new Date(order.date_created).toLocaleString("en-BD", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            )}
          </aside>
        </div>

        {/* ==========================
            Bottom Actions
        ========================== */}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="
              flex
              h-13
              items-center
              justify-center
              rounded-2xl
              bg-primary
              px-8
              py-3
              font-semibold
              text-white
              shadow-lg
              shadow-sky-200/50
              transition-all
              hover:-translate-y-0.5
              hover:shadow-xl
            "
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="
              flex
              h-13
              items-center
              justify-center
              rounded-2xl
              border
              border-gray-200
              bg-white
              px-8
              py-3
              font-semibold
              text-gray-700
              transition
              hover:border-primary
              hover:text-primary
            "
          >
            Back to Home
          </Link>
        </div>

        {/* ==========================
            Confirmation Message
        ========================== */}

        <div className="mt-8 text-center">
          <p className="text-xs leading-5 text-gray-400">
            We have received your order and will contact you shortly for
            confirmation.
          </p>
        </div>
      </div>
    </main>
  );
}
