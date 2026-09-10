"use client";
import Link from "next/link";

interface IActiveProps {
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const ActiveLink = ({ label, href, onClick }: IActiveProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-[18px] md:text-[20px] lg:px-4 lg:py-6 px-2 py-3 md:py-5 relative inline-block font-medium transition-all duration-300 text-white hover:text-red-400"
    >
      <span className="relative z-10">{label}</span>
    </Link>
  );
};

export default ActiveLink;