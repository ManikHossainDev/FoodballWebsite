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
      className="text-sm md:text-[15px] px-3.5 py-2 rounded-lg font-medium transition-all duration-200 text-gray-200 hover:text-white hover:bg-white/[0.08] relative inline-flex items-center"
    >
      <span className="relative z-10">{label}</span>
    </Link>
  );
};

export default ActiveLink;