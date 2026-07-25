import Link from "next/link";
import { footerLinks } from "@/data/footer";

export default function FooterLinks() {
  const sections = [
    {
      title: "Shop",
      links: footerLinks.shop,
    },
    {
      title: "Customer Care",
      links: footerLinks.customer,
    },
    {
      title: "Company",
      links: footerLinks.company,
    },
  ];

  return (
    <>
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="mb-5 text-lg font-bold text-white">
            {section.title}
          </h3>

          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="
                    text-slate-400
                    transition-all
                    duration-300
                    hover:pl-1
                    hover:text-primary
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}