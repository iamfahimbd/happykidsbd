import Container from "@/components/ui/Container";

import NavLogo from "./NavLogo";
import NavIcons from "./NavIcons";
import MobileMenu from "./MobileMenu";

import DesktopSearch from "./DesktopSearch";
import MobileSearchOverlay from "./MobileSearchOverlay";

export default function TopNavbar() {
  return (
    <>
      <div className="relative border-b bg-white">
        <Container>
          {/* ================= Desktop ================= */}

          <div className="hidden h-24 items-center gap-8 lg:flex">
            {/* Logo */}

            <NavLogo />

            {/* Search */}

            <div className="flex-1">
              <DesktopSearch />
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

            {/* Search + Cart */}

            <NavIcons mobile />
          </div>
        </Container>
      </div>

      {/* Mobile Search Overlay */}

      <MobileSearchOverlay />
    </>
  );
}