import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      customer,
      shipping,
      items,
      paymentMethod,
    } = body;

    // ==========================
    // Basic Validation
    // ==========================

    if (!customer?.name) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer name is required.",
        },
        { status: 400 }
      );
    }

    if (!customer?.phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer phone is required.",
        },
        { status: 400 }
      );
    }

    if (!customer?.address) {
      return NextResponse.json(
        {
          success: false,
          message: "Delivery address is required.",
        },
        { status: 400 }
      );
    }

    if (!shipping?.area) {
      return NextResponse.json(
        {
          success: false,
          message: "Delivery area is required.",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart is empty.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // Payment Method Validation
    // ==========================

    const allowedPaymentMethods = [
      "cod",
      "bkash",
      "nagad",
    ];

    const selectedPaymentMethod =
      paymentMethod || "cod";

    if (
      !allowedPaymentMethods.includes(
        selectedPaymentMethod
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment method.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // Payment Method Titles
    // ==========================

    const paymentMethodTitles = {
      cod: "Cash on Delivery",
      bkash: "bKash",
      nagad: "Nagad",
    };

    const paymentMethodTitle =
      paymentMethodTitles[
        selectedPaymentMethod
      ];

    // ==========================
    // Environment Variables
    // ==========================

    const {
      WC_API_URL,
      WC_CONSUMER_KEY,
      WC_CONSUMER_SECRET,
    } = process.env;

    if (
      !WC_API_URL ||
      !WC_CONSUMER_KEY ||
      !WC_CONSUMER_SECRET
    ) {
      console.error(
        "WooCommerce environment variables are missing."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "WooCommerce configuration is missing.",
        },
        { status: 500 }
      );
    }

    // ==========================
    // WooCommerce Line Items
    // ==========================

    const lineItems = items.map((item) => {
      const metaData = [];

      if (item.size) {
        metaData.push({
          key: "Size",
          value: item.size,
        });
      }

      if (item.color) {
        metaData.push({
          key: "Color",
          value: item.color,
        });
      }

      return {
        product_id: Number(item.id),
        quantity: Number(item.quantity),
        meta_data: metaData,
      };
    });

    // ==========================
    // Shipping
    // ==========================

    const shippingCost =
      shipping.area === "inside"
        ? 80
        : shipping.area === "outside"
          ? 150
          : 0;

    const shippingTitle =
      shipping.area === "inside"
        ? "Inside Dhaka Delivery"
        : "Outside Dhaka Delivery";

    // ==========================
    // WooCommerce Order
    // ==========================

    const wooOrder = {
      payment_method:
        selectedPaymentMethod,

      payment_method_title:
        paymentMethodTitle,

      // COD orders are unpaid.
      // bKash/Nagad are also unpaid
      // until we integrate actual gateways.
      set_paid: false,

      billing: {
        first_name: customer.name,
        phone: customer.phone,
        address_1: customer.address,
        country: "BD",
      },

      shipping: {
        first_name: customer.name,
        address_1: customer.address,
        country: "BD",
      },

      line_items: lineItems,

      shipping_lines: [
        {
          method_id: "custom_shipping",
          method_title: shippingTitle,
          total: String(shippingCost),
        },
      ],

      customer_note:
        customer.notes || "",
    };

    console.log(
      "Sending order to WooCommerce:",
      wooOrder
    );

    // ==========================
    // WooCommerce API Auth
    // ==========================

    const auth = Buffer.from(
      `${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`
    ).toString("base64");

    // ==========================
    // Create WooCommerce Order
    // ==========================

    const response = await fetch(
      `${WC_API_URL}/orders`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Basic ${auth}`,
        },

        body: JSON.stringify(
          wooOrder
        ),
      }
    );

    const data =
      await response.json();

    // ==========================
    // WooCommerce Error
    // ==========================

    if (!response.ok) {
      console.error(
        "WooCommerce order error:",
        data
      );

      return NextResponse.json(
        {
          success: false,

          message:
            data?.message ||
            "Failed to create WooCommerce order.",

          error: data,
        },
        {
          status: response.status,
        }
      );
    }

    // ==========================
    // Success
    // ==========================

    console.log(
      "WooCommerce order created:",
      {
        id: data.id,
        number: data.number,
        status: data.status,
        payment_method:
          data.payment_method,
        payment_method_title:
          data.payment_method_title,
      }
    );

    return NextResponse.json({
      success: true,

      order: {
        id: data.id,
        number: data.number,
        status: data.status,
        total: data.total,

        payment_method:
          data.payment_method,

        payment_method_title:
          data.payment_method_title,
      },
    });
  } catch (error) {
    console.error(
      "Order API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Something went wrong while creating the order.",
      },
      { status: 500 }
    );
  }
}