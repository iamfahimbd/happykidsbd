import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

import FeatureCard from "./FeatureCard";

import { features } from "@/data/happyKidsFeatures";

export default function FeaturesSection() {
  return (
    <Section>
      <Container>
        <SectionTitle
          subtitle="Why Choose Us"
          title="Why Parents Love HappyKidsBD"
          description="Everything we do is focused on making shopping for your little ones simple, safe, and enjoyable."
        />

        <div
          className="
             mt-12
    grid
    grid-cols-2
    gap-4

    md:grid-cols-2
    lg:grid-cols-4
    lg:gap-6
          "
        >
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
