import Section from "@/components/ui/Section";
import HeroContent from "@/components/home/HeroContent";
import HeroImage from "@/components/home/HeroImage";

export default function Hero() {
  return (
    <Section className="relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute left-0 top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>

      <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-secondary/10 blur-3xl"></div>

      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Mobile এ Image আগে */}
        <div className="order-2 lg:order-1">
          <HeroContent />
        </div>

        <div className="order-1 lg:order-2">
          <HeroImage />
        </div>
      </div>
    </Section>
  );
}