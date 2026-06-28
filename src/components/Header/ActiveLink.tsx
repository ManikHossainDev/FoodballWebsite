"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IActiveProps {
  label: string;
  href: string;
}

const ActiveLink = ({ label, href }: IActiveProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-[17px] lg:px-4 lg:py-6 px-2 py-3 md:py-5 relative inline-block transition-all duration-300 ${
        isActive 
          ? "text-white" 
          : "text-white hover:text-red-300"
      }`}
      style={isActive ? {
        textShadow: `
          0 0 10px #ff0000,
          0 0 20px #ff0000,
          0 0 30px #ff0000,
          0 0 40px #ff0000
        `
      } : {}}
    >
      <span className="relative z-10">{label}</span>
      {isActive && (
        <>
          {/* Bottom glow line */}
          <span 
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500"
            style={{
              boxShadow: `
                0 0 10px #ff0000,
                0 0 20px #ff0000,
                0 0 30px #ff0000
              `
            }}
          />
          {/* Background glow */}
          <span 
            className="absolute inset-0 bg-gradient-to-t from-[#43171671] to-black bg-opacity-5 -z-10"
            
          />
        </>
      )}
    </Link>
  );
};

export default ActiveLink;