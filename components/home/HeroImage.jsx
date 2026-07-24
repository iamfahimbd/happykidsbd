import Image from "next/image";
import HeroBadge from "@/components/home/HeroBadge";

export default function HeroImage() {
  return (
    <div className="relative flex justify-center">

      {/* Background Circle */}
      <div className="absolute h-[320px] w-[320px] rounded-full bg-primary/10 blur-3xl sm:h-[420px] sm:w-[420px]"></div>

      {/* Hero Image */}
      <div className="relative z-10">

        <Image
          src="/images/hero-kids.png"
          alt="Happy Kids"
          width={550}
          height={650}
          priority
          className="
            h-auto
            w-[280px]
            drop-shadow-2xl
            sm:w-[380px]
            lg:w-[500px]
          "
        />

        {/* Top Badge */}
        <HeroBadge
          title="50% OFF"
          subtitle="Summer Sale"
          className="
            absolute
            left-0
            top-8
            hidden
            -translate-x-10
            lg:block
          "
        />

        {/* Bottom Badge */}
        <HeroBadge
          title="New Arrival"
          subtitle="Kids Collection"
          className="
            absolute
            bottom-10
            right-0
            hidden
            translate-x-8
            lg:block
          "
        />

      </div>

      {/* Decorative Circle */}
      <div className="absolute right-12 top-16 h-8 w-8 rounded-full bg-secondary"></div>

      <div className="absolute bottom-20 left-12 h-6 w-6 rounded-full bg-accent"></div>

    </div>
  );
}