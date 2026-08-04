"use client";
import Navbar from "@/components/Header/Navbar";
import Chats from "@/components/Pages/messaging/chat/chats";
import { useParams } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { receiverId } = useParams();
  return (
    <section className="w-full md:responsive-padding xl:container mx-auto h-full flex flex-col">
      <Navbar />
      <section className="w-full p-2 flex-1 overflow-hidden">
        <div className="w-full  flex gap-6 bg-[#1a1a1a] shadow-lg h-[90vh] rounded-xl border border-gray-800">
          <div
            className={`w-full md:w-[35%] lg:w-[30%] h-full transition-transform duration-300 ease-in-out ${receiverId ? "hidden md:block" : "block"}`}>
            <Chats />
          </div>
          <div
            className={`w-full md:w-[65%] lg:w-[70%] h-full transition-transform duration-300 ease-in-out ${receiverId ? "block" : "hidden md:block"}`}>
            {children}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Layout;