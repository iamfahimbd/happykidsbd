const API_URL = process.env.WC_API_URL;

const CONSUMER_KEY =
  process.env.WC_CONSUMER_KEY;

const CONSUMER_SECRET =
  process.env.WC_CONSUMER_SECRET;

export async function wcFetch(endpoint) {
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
    }
  );

  if (!response.ok) {
    throw new Error(
      `WooCommerce API Error: ${response.status}`
    );
  }

  return response.json();
}