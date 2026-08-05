import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductDescription from "./ProductDescription";
import RelatedProducts from "./RelatedProducts";

export default function ProductLayout({
  product,
  relatedProducts,
}) {
  return (
    <div
  className="
    mx-auto
    w-full
    max-w-7xl
    overflow-x-hidden

    px-4
    py-8

    lg:px-8
    lg:py-12
  "
>
      {/* Top */}

      <div
  className="
    grid
    min-w-0
    gap-10

    lg:grid-cols-2
    lg:gap-16
    lg:items-start
  "
>
        <ProductGallery product={product} />

        <ProductInfo product={product} />
      </div>

      {/* Description */}

      <div className="mt-16 lg:mt-24">
        <ProductDescription product={product} />
      </div>

      {/* Related */}

      <div className="mt-16 lg:mt-24">
        <RelatedProducts
          products={relatedProducts}
        />
      </div>
    </div>
  );
}