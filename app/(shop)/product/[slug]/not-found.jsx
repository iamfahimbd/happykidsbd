import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-3xl font-bold">
        Product Not Found
      </h1>

      <p className="mb-8 text-gray-500">
        The product you are looking for
        does not exist.
      </p>

      <Link
        href="/shop"
        className="rounded-full bg-primary px-6 py-3 text-white"
      >
        Back to Shop
      </Link>
    </div>
  );
}