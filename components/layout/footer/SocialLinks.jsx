import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
    bg: "hover:bg-[#1877F2]",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
    bg: "hover:bg-[#E4405F]",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: FaYoutube,
    bg: "hover:bg-[#FF0000]",
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => {
        const Icon = social.icon;

        return (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className={`
              flex h-10 w-10 items-center justify-center
              rounded-full
              bg-white/10
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:text-white
              ${social.bg}
            `}
          >
            <Icon size={18} />
          </Link>
        );
      })}
    </div>
  );
}