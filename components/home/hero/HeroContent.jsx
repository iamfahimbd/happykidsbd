import Button from "@/components/ui/Button";

export default function HeroContent() {
  return (
    <div>
      {/* Subtitle */}
      <p className="mb-4 text-sm font-bold uppercase tracking-[4px] text-secondary sm:text-base">
        Colorful Styles, Joyful Smiles
      </p>

      {/* Heading */}
      <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-7xl">
        Fashion for{" "}
        <span className="text-primary">
          Happy Little
        </span>{" "}
        <span className="text-secondary">
          Moments
        </span>
      </h1>

      {/* Description */}
      <p className="mb-8 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
        Discover adorable clothing, shoes, toys and accessories
        specially designed for babies and kids.
        Comfortable fabrics, colorful designs and affordable prices —
        everything your little one deserves.
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button>
          Shop Now
        </Button>

        <Button variant="outline">
          Explore Collection
        </Button>
      </div>

      {/* Trust Badges */}
      <div className="mt-10 flex flex-wrap gap-4 text-sm font-semibold text-gray-600">
        <div className="rounded-full bg-white px-5 py-3 shadow-soft">
          🚚 Free Delivery*
        </div>

        <div className="rounded-full bg-white px-5 py-3 shadow-soft">
          💵 Cash on Delivery
        </div>

        <div className="rounded-full bg-white px-5 py-3 shadow-soft">
          ⭐ Premium Quality
        </div>
      </div>
    </div>
  );
}