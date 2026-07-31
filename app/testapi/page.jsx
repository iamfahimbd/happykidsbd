import { getProducts } from "@/lib/woocommerce/products";

export default async function TestApiPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-3xl font-bold">WooCommerce API Test</h1>

      <pre>
{JSON.stringify(products[0], null, 2)}
</pre>
    </div>
  );
}
