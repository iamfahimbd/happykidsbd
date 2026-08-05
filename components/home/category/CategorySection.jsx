import { getCategories } from "@/lib/woocommerce/categories";
import CategoryCard from "./CategoryCard";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

export default async function CategorySection() {
  const categories = await getCategories();

  if (!categories.length) {
    return null;
  }

  return (
    <Section>
      <SectionTitle
        title="Shop by Category"
        subtitle="Find the perfect outfit for every little one."
      />

      <div
        className="
          grid
          grid-cols-3
          gap-4

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