import Container from "@/components/ui/Container";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-900 text-white">
      <Container>
        <div
          className="
            grid
            gap-12
            py-16
            lg:grid-cols-[1.3fr_2fr]
          "
        >
          <FooterBrand />

          <div
            className="
              grid
              grid-cols-2
              gap-8
              md:grid-cols-3
            "
          >
            <FooterLinks />
          </div>
        </div>

        <FooterBottom />
      </Container>
    </footer>
  );
}