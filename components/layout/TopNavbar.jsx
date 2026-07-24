import Container from "../ui/Container";
import NavLogo from "./NavLogo";
import NavSearch from "./NavSearch";
import NavIcons from "./NavIcons";
import MobileMenu from "./MobileMenu";

export default function TopNavbar() {
  return (
    <div className="relative border-b bg-white">
      <Container>
        {/* ================= Desktop ================= */}
        <div className="hidden h-24 items-center gap-8 lg:flex">
          {/* Logo */}
          <NavLogo />

          {/* Search */}
          <div className="flex-1">
            <NavSearch />
          </div>

          {/* Icons */}
          <NavIcons />
        </div>

        {/* ================= Mobile ================= */}
        <div className="flex h-20 items-center justify-between lg:hidden">
          {/* Hamburger */}
          <MobileMenu />

          {/* Logo */}
          <NavLogo />

          {/* Cart */}
          <NavIcons mobile />
        </div>

        {/* Mobile Search */}
        <div className="pb-4 lg:hidden">
          <NavSearch />
        </div>
      </Container>
    </div>
  );
}