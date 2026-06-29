import PlacementsRequestsDetails from "@/components/Pages/Agents/PlacementsRequestsDetails";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const Page = () => {
 return (
    <div>
        {/* ── Top Nav ── */}
        <Link
          href="/PlacementsRequests"
          className="text-xl md:text-2xl font-bold text-white pt-3 flex items-center space-x-2"
          style={{
            textShadow:
              "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
          }}
        >
          <div>
            <FiArrowLeft className="w-6 h-6" />
          </div>
          <div> Marcus Silva Placements Requests </div>
        </Link>
        
        <PlacementsRequestsDetails />
     </div>
 );
};

export default Page;