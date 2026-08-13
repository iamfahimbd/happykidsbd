import Link from "next/link";
import Container from "../../ui/Container";

const menus = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Winter Collections",
    href: "/category/winter-collections",
  },
  {
    label: "Summer Collections",
    href: "/category/summer-collections",
  },
  {
    label: "New Arrival",
    href: "/category/new-arrivals",
  },
  
];

export default function BottomNavbar() {
  return (
    <div className="bg-sky-500 text-white">
      <Container>
        <nav className="hidden lg:flex justify-center items-center gap-12 h-14">
          {menus.map((menu) => (
            <Link
              key={menu.label}
              href={menu.href}
              className="text-lg font-semibold"
            >
              {menu.label}
            </Link>
          ))}
        </nav>
      </Container>
    </div>
  );
}
