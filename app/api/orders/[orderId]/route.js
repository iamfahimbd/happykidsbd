import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { orderId } = params;

    // ==========================
    // Validate Order ID
    // ==========================

    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID is required.",
        },
        { status: 400 },
      );
    }

    // ==========================
    // WooCommerce Environment
    // ==========================

    const { WC_API_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET } = process.env;

    if (!WC_API_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
      console.error("WooCommerce environment variables are missing.");

      return NextResponse.json(
        {
          success: false,
          message: "WooCommerce configuration is missing.",
        },
        { status: 500 },
      );
    }

    // ==========================
    // WooCommerce Authentication
    // ==========================

    const auth = Buffer.from(
      `${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`,
    ).toString("base64");

    // ==========================
    // Fetch WooCommerce Order
    // ==========================

    const response = await fetch(`${WC_API_URL}/orders/${orderId}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },

      // Don't cache order details
      cache: "no-store",
    });

    const data = await response.json();

    // ==========================
    // WooCommerce Error
    // ==========================

    if (!response.ok) {
      console.error("WooCommerce order fetch error:", data);

      return NextResponse.json(
        {
          success: false,
          message: data?.message || "Failed to fetch order.",
        },
        {
          status: response.status,
        },
      );
    }

    // ==========================
    // Success
    // ==========================

    return NextResponse.json({
      success: true,
      order: data,
    });
  } catch (error) {
    console.error("Order details API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while fetching the order.",
      },
      { status: 500 },
    );
  }
}
