import Image from "next/image";
import Link from "next/link";

import SocialLinks from "./SocialLinks";

export default function FooterBrand() {
  return (
    <div className="lg:pr-8">
      {/* Logo */}

      <Link href="/" className="inline-block">
        <Image
          src="/images/logo.png"
          alt="HappyKidsBD"
          width={190}
          height={60}
          className="h-auto w-auto"
        />
      </Link>

      {/* Tagline */}

      <h3 className="mt-5 text-xl font-bold text-white">
        Colorful Styles,
        <span className="block text-secondary">
          Joyful Smiles.
        </span>
      </h3>

      {/* Description */}

      <p className="mt-4 max-w-sm leading-7 text-slate-400">
        Premium clothing and accessories for babies and kids.
        Carefully selected products with comfort, quality and
        joyful designs for every little smile.
      </p>

      {/* Trust Badges */}

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
          🚚 Fast Delivery
        </span>

        <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-medium text-secondary">
          🔒 Secure Payment
        </span>

        <span className="rounded-full bg-accent/30 px-3 py-1 text-xs font-medium text-yellow-700">
          ⭐ Premium Quality
        </span>
      </div>

      {/* Social Icons */}

      <div className="mt-8">
        <SocialLinks />
      </div>
    </div>
  );
}