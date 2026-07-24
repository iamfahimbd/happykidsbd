import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import CategoryCard from "./CategoryCard";
import { categories } from "@/components/data/categories";

export default function CategorySection() {
  return (
    <Section className="relative">
      <SectionTitle
        subtitle="Browse Collection"
        title="Shop By Category"
      />

      <div
        className="
          grid
          grid-cols-2
          gap-4

          sm:grid-cols-2
          sm:gap-5

          md:grid-cols-3

          lg:grid-cols-6
          lg:gap-6
        "
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </Section>
  );
}