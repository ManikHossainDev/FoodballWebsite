import { AiOutlineUserAdd } from "react-icons/ai";
import Link from "next/link";
import HirerPlayersCard from "@/components/Pages/Club/hirerplayersCard";

const Page = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2
        className="text-xm md:text-2xl font-bold text-white py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        Hiring Post
      </h2>
      <p className="text-[#8F8F8F] mb-5">Find and recruit the perfect player for your team.</p>
        </div>
        <div>
           <Link href="/createhiring" className="px-3 py-2 flex items-center text-white rounded-lg  border border-red-500">
                  <AiOutlineUserAdd size={24} />   Create Hiring
           </Link>
        </div>
      </div>
      <HirerPlayersCard />
    </div>
  );
};

export default Page;