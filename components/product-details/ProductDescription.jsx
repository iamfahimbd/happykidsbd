export default function ProductDescription({
  product,
}) {
  if (!product.description) {
    return null;
  }

  return (
    <section>
      {/* Heading */}

      <div className="mb-8">
        <h2
          className="
            text-2xl
            font-bold
            text-gray-900

            lg:text-3xl
          "
        >
          Product Details
        </h2>

        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Everything you need to know
          about this product.
        </p>
      </div>

      {/* Content */}

      <div
        className="
          overflow-hidden

          rounded-3xl

          border
          border-gray-200

          bg-white

          p-6

          shadow-sm

          lg:p-10
        "
      >
        <div
          className="
            product-description

            prose
            prose-gray

            max-w-none

            prose-headings:font-bold
            prose-headings:text-gray-900

            prose-p:text-gray-700
            prose-p:leading-8

            prose-li:text-gray-700

            prose-strong:text-gray-900

            prose-img:rounded-2xl
            prose-img:shadow-md

            prose-table:block
            prose-table:w-full
            prose-table:overflow-x-auto
          "
          dangerouslySetInnerHTML={{
            __html:
              product.description,
          }}
        />
      </div>
    </section>
  );
}