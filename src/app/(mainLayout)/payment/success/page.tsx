"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useGetProfileQuery } from "@/redux/features/Profile/Profile";

const Page = () => {
  const router = useRouter();
  const { data } = useGetProfileQuery({});
  const user = data?.data;

  const handleProfileClick = () => {
    if (!user) {
      router.push("/login"); // fallback jodi user na thake
      return;
    }
    if (user.role === "player") {
      router.push("/profileplayer");
    } else if (user.role === "coach") {
      router.push("/couchprofile");
    } else if (user.role === "club") {
      router.push("/clubprofile");
    } else if (user.role === "agent") {
      router.push("/agentprofile");
    } else {
      router.push("/FootballPlayer"); // default fallback
    }
  };

  return (
    <div className="xl:container mx-auto py-24 xl:py-32 px-4">
      <br />
      <div className="max-w-lg mx-auto">
        {/* Status Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl" />
              <div className="relative bg-emerald-500/10 border border-emerald-500/20 rounded-full p-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" strokeWidth={2} />
              </div>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-2">
            Payment Successful
          </h1>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            Your transaction has been completed. A receipt has been sent to
            your registered email address.
          </p>
        </div>

        {/* Actions */}
        <div className="w-[50%] mx-auto flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={handleProfileClick}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium text-sm hover:bg-gray-200 transition"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Need help?{" "}
          <Link href="/contact-us" className="text-gray-300 hover:text-white underline underline-offset-2">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;