import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/header/Navbar";

import CartDrawer from "@/components/cart/CartDrawer";

import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";

import { getSearchProducts } from "@/lib/woocommerce/search";

import {
  Hind_Siliguri,
  Nunito,
} from "next/font/google";

import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: [
    "400",
    "500",
    "600",
    "700",
    "800",
  ],
  variable: "--font-nunito",
});

export const metadata = {
  title: "HappyKidsBD",
  description: "Colorful Styles, Joyful Smiles",
};

export default async function RootLayout({
  children,
}) {
  const searchProducts =
    await getSearchProducts();

  return (
    <html lang="en">
      <body
        className={`${hind.variable} ${nunito.variable}`}
      >
        <SearchProvider products={searchProducts}>
          <CartProvider>
            <Navbar />

            <main>
              {children}
            </main>

            <Footer />

            <CartDrawer />
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  );
}