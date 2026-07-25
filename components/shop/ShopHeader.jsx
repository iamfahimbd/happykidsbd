import Link from "next/link";
import Container from "@/components/ui/Container";

export default function ShopHeader() {
  return (
    <section className="bg-white border-b border-gray-100">
      <Container>
        <div className="py-10 lg:py-14">
          {/* Breadcrumb */}

          <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Link
              href="/"
              className="transition hover:text-primary"
            >
              Home
            </Link>

            <span>/</span>

            <span className="font-semibold text-gray-900">
              Shop
            </span>
          </nav>

          {/* Title */}

          <h1 className="text-3xl font-extrabold text-gray-900 lg:text-5xl">
            Shop
          </h1>

          {/* Description */}

          <p className="mt-4 max-w-2xl text-gray-500">
            Discover premium clothing, shoes, toys and
            accessories designed for babies and kids.
          </p>

          {/* Product Count */}

          <p className="mt-6 text-sm font-medium text-primary">
            Showing 24 Products
          </p>
        </div>
      </Container>
    </section>
  );
}