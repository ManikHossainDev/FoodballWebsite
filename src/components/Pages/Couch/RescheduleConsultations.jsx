import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const RescheduleConsultations = () => {
 return (
 <div>
    {/* hearder */}
   <div className="flex items-center justify-between  py-3 text-white ">
        <Link href="/BookedConsultations" className="flex items-center gap-2 ">
          <FiArrowLeft size={26} />
          <span className="text-xm md:text-2xl font-bold text-white py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}>Reschedule Consultations </span>
        </Link>
        
      </div>
      {/* need card */}

 </div>
 );
};

export default RescheduleConsultations;