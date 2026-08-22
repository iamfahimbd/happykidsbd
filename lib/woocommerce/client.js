const API_URL = process.env.WC_API_URL;

const CONSUMER_KEY =
  process.env.WC_CONSUMER_KEY;

const CONSUMER_SECRET =
  process.env.WC_CONSUMER_SECRET;

// ==========================
// Basic WooCommerce Fetch
// ==========================

export async function wcFetch(endpoint) {
  const result = await wcFetchWithMeta(endpoint);

  if (!result) {
    return null;
  }

  return result.data;
}

// ==========================
// WooCommerce Fetch + Meta
// ==========================

export async function wcFetchWithMeta(endpoint) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 4000);

  try {
    if (
      !API_URL ||
      !CONSUMER_KEY ||
      !CONSUMER_SECRET
    ) {
      console.error(
        "WooCommerce API configuration is missing."
      );

      return null;
    }

    const url = new URL(
      `${API_URL}${endpoint}`
    );

    url.searchParams.set(
      "consumer_key",
      CONSUMER_KEY
    );

    url.searchParams.set(
      "consumer_secret",
      CONSUMER_SECRET
    );

    const response = await fetch(
      url.toString(),
      {
        cache: "no-store",
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      console.error(
        `WooCommerce API Error: ${response.status}`,
        endpoint
      );

      return null;
    }

    const data =
      await response.json();

    // WooCommerce pagination headers
    const totalProducts = Number(
      response.headers.get(
        "X-WP-Total"
      ) || 0
    );

    const totalPages = Number(
      response.headers.get(
        "X-WP-TotalPages"
      ) || 0
    );

    return {
      data,
      totalProducts,
      totalPages,
    };
  } catch (error) {
    if (
      error?.name === "AbortError"
    ) {
      console.error(
        `WooCommerce API Timeout: ${endpoint}`
      );
    } else {
      console.error(
        `WooCommerce API Connection Failed: ${endpoint}`,
        error
      );
    }

    return null;
  } finally {
    clearTimeout(timeout);
  }
}