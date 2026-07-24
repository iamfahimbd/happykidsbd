"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const menus = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Baby Girls", href: "/category/baby-girls" },
  { name: "Baby Boys", href: "/category/baby-boys" },
  { name: "New Arrival", href: "/shop?sort=new" },
  { name: "Sale", href: "/shop?sale=true" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* Hamburger Button */}
      <button onClick={() => setOpen(true)} className="text-3xl text-sky-500">
        <FiMenu />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white p-5">
          <h2 className="text-2xl font-bold text-sky-500">
            Happy<span className="text-pink-500">Kids BD</span>
          </h2>

          <button
  onClick={() => setOpen(false)}
  className="text-3xl text-gray-700 hover:text-pink-500"
>
  <FiX />
</button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col py-3">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.href}
              onClick={() => setOpen(false)}
              className="
    border-b
    border-gray-200
    px-6
    py-4
    text-lg
    font-semibold
    text-gray-800
    transition
    hover:bg-sky-50
    hover:text-sky-600
  "
            >
              {menu.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
