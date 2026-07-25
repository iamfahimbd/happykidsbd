import Link from "next/link";

export default function FooterBottom() {
  const paymentMethods = [
    "Visa",
    "Mastercard",
    "bKash",
    "Nagad",
    "Rocket",
  ];

  return (
    <div className="border-t border-white/10 py-6">
      <div
        className="
          flex
          flex-col
          items-center
          justify-between
          gap-6

          lg:flex-row
        "
      >
        {/* Left */}

        <div className="text-center lg:text-left">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">
              HappyKidsBD
            </span>
            . All Rights Reserved.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Made with ❤️ in Bangladesh
          </p>
        </div>

        {/* Payment Methods */}

        <div className="flex flex-wrap items-center justify-center gap-2">
          {paymentMethods.map((method) => (
            <span
              key={method}
              className="
                rounded-lg
                border
                border-white/10
                bg-white/5
                px-3
                py-1.5
                text-xs
                font-medium
                text-slate-300
                transition-all
                duration-300
                hover:border-primary
                hover:text-primary
              "
            >
              {method}
            </span>
          ))}
        </div>

        {/* Right */}

        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/privacy-policy"
            className="text-slate-400 transition hover:text-primary"
          >
            Privacy
          </Link>

          <Link
            href="/terms"
            className="text-slate-400 transition hover:text-primary"
          >
            Terms
          </Link>
        </div>
      </div>
    </div>
  );
}