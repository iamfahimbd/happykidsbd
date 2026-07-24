import { Hind_Siliguri, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "HappyKidsBD",
  description: "Colorful Styles, Joyful Smiles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${hind.variable} ${nunito.variable}`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}