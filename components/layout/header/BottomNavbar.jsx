import Link from "next/link";
import Container from "../../ui/Container";

const menus = [
  "Home",
  "Shop",
  "Baby Girls",
  "Baby Boys",
  "New Arrival",
  "Sale",
];

export default function BottomNavbar() {
  return (
    <div className="bg-sky-500 text-white">
      <Container>
        <nav className="hidden lg:flex justify-center items-center gap-12 h-14">
          {menus.map((menu) => (
            <Link key={menu} href="/" className="text-lg font-semibold">
              {menu}
            </Link>
          ))}
        </nav>
      </Container>
    </div>
  );
}
