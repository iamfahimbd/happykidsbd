import Link from "next/link";
import Image from "next/image";

export default function RelatedProducts({
  products,
}) {
  if (!products?.length) return null;

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
          Related Products
        </h2>

        <p className="mt-2 text-gray-500">
          You may also like these products.
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-6

          lg:grid-cols-4
        "
      >
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/product/${item.slug}`}
            className="
              group
              overflow-hidden
              rounded-3xl
              border
              border-gray-200
              bg-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div className="relative aspect-square">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105"
                />
            </div>

            <div className="p-4">
              <h3 className="line-clamp-2 font-semibold text-gray-900">
                {item.name}
              </h3>

              <p className="mt-3 text-lg font-bold text-primary">
                ৳{item.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}