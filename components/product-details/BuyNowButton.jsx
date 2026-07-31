"use client";

export default function BuyNowButton({
  product,
}) {
  const handleBuyNow = () => {
    console.log(
      "Buy Now:",
      product.id
    );

    // TODO:
    // Redirect to Checkout
  };

  return (
    <button
      type="button"
      onClick={handleBuyNow}
      className="
        group

        flex
        h-14
        w-full

        items-center
        justify-center

        rounded-2xl

        bg-gradient-to-r
        from-primary
        to-sky-500

        px-6

        font-semibold
        text-white

        shadow-lg
        shadow-sky-200/60

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:shadow-xl
        hover:shadow-sky-300/50

        active:translate-y-0
        active:scale-[0.98]
      "
    >
      Buy Now
    </button>
  );
}