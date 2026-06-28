import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-[#000000]">
      <div className="">
        <Header />
      </div>
      {children}
      <Footer />
    </section>
  );
};

export default MainLayout;
