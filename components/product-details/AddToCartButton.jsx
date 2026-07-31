"use client";

export default function AddToCartButton({
  product,
}) {
  const handleAddToCart = () => {
    console.log(
      "Add To Cart:",
      product.id
    );

    // TODO:
    // Add to cart logic
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="
        group

        flex
        h-14
        w-full

        items-center
        justify-center

        rounded-2xl

        border
        border-primary/20

        bg-white/80
        backdrop-blur-xl

        px-6

        font-semibold
        text-primary

        shadow-lg
        shadow-slate-200/60

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:border-primary
        hover:bg-primary
        hover:text-white
        hover:shadow-xl

        active:translate-y-0
        active:scale-[0.98]
      "
    >
      Add To Cart
    </button>
  );
}