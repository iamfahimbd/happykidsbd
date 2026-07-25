import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

import { promoBanner } from "@/data/banners";

export default function PromoBanner() {
  return (
    <Section>
      <Container>
        <div
          className="
            overflow-hidden
            rounded-[32px]
            bg-gradient-to-r
            from-primary
            via-secondary
            to-accent
            shadow-xl
          "
        >
          <div
            className="
              grid
              items-center
              gap-10
              px-8
              py-10

              md:px-12
              md:py-14

              lg:grid-cols-2
              lg:px-16
              lg:py-16
            "
          >
            {/* Left Content */}

            <div className="text-center lg:text-left">
              <span
                className="
                  inline-block
                  rounded-full
                  bg-white/20
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-white
                  backdrop-blur
                "
              >
                {promoBanner.badge}
              </span>

              <h2
                className="
                  mt-5
                  text-4xl
                  font-bold
                  leading-tight
                  text-white

                  md:text-5xl
                "
              >
                {promoBanner.title}
              </h2>

              <p
                className="
                  mt-5
                  max-w-xl
                  text-lg
                  leading-8
                  text-white/90
                "
              >
                {promoBanner.description}
              </p>

              <Link
                href={promoBanner.buttonLink}
                className="
                  mt-8
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  px-7
                  py-3.5
                  font-semibold
                  text-primary
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                {promoBanner.buttonText}
              </Link>
            </div>

            {/* Right Image */}

            <div className="flex justify-center">
              <Image
                src={promoBanner.image}
                alt={promoBanner.title}
                width={550}
                height={550}
                priority
                className="
                  w-full
                  max-w-md
                  object-contain
                "
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}