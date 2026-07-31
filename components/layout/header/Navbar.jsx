import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <TopNavbar />
      <BottomNavbar />
    </header>
  );
}
