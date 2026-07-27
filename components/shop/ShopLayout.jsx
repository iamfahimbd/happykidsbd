import Container from "@/components/ui/Container";

export default function ShopLayout({ sidebar, toolbar, children }) {
  return (
    <Container>
      <div className="py-8 lg:py-10">
        {/* Toolbar */}

        <div
          className="
            sticky
            top-16
            z-30
            mb-8
            bg-bg
            py-3

            lg:static
            lg:top-auto
            lg:z-auto
            lg:bg-transparent
            lg:py-0
          "
        >
          {toolbar}
        </div>

        {/* Layout */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[280px_1fr]
          "
        >
          {/* Desktop Sidebar */}

          <aside className="hidden lg:block">
            <div className="sticky top-24">{sidebar}</div>
          </aside>

          {/* Products */}

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </Container>
  );
}
