"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { id: "uploadnew", label: "Upload new", href: "/uploadnew" },
  { id: "uploadedvideo", label: "Uploaded video", href: "/uploadedvideo" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <section className="min-h-screen bg-[#1a1a1a]">
      {/* Fixed Header */}
      <div className="pt-3">
        {/* Tab Navigation */}
        <div className="flex gap-2  mb-6 bg-[#303030] py-3 px-2 md:px-3 rounded-lg">
          {tabs.map((tab) => {
            const isActive = pathname?.startsWith(tab.href);
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`px-2 text-[10px] md:text-md md:px-6 py-2.5 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-white text-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)]"
                    : " text-[#A1A1A1] "
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="">{children}</div>
    </section>
  );
};

export default Layout;