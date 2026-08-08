import RescheduleConsultation from "@/components/Pages/Couch/RescheduleConsultations";
import { Suspense } from "react";
const Page = () => {
 return (
 <div>
  <Suspense fallback={<div className="text-white p-5">Loading...</div>}>  
   <RescheduleConsultation />
    </Suspense>
 </div>
 );
};

export default Page;