import Image from "next/image";
import Link from "next/link";

export default function NavLogo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo/logo.png"
        width={80}
        height={80}
        alt="HappyKidsBD"
        priority
      />

      <div className="hidden md:block">
        <h2 className="text-3xl font-extrabold">
          <span className="text-primary">Happy</span>
          <span className="text-secondary">Kids</span>
          <span className="text-accent">BD</span>
        </h2>

        <p className="text-sm text-gray-500">Colorful Styles, Joyful Smiles</p>
      </div>
    </Link>
  );
}
