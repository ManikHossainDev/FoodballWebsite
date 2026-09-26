/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useDonationMutation } from "@/redux/features/Profile/Profile";
const presetAmounts = ["10", "25", "50", "100"];
const ChooseYourPlan = () => {
  const [useDonation, { isLoading }] = useDonationMutation();
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("")
  const handlePresetClick = (preset: string) => {
    setAmount(preset);
    setError("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
    setError("");
  };

  const handleSupport = async () => {
    if (!amount || Number(amount) <= 0) {
      setError("Please select or enter a valid support amount");
      return;
    }
    try {
      setError("");
      const response = await useDonation({
        amount: Number(amount),
      }).unwrap();
      const paymentUrl = response?.data?.url;
      if (paymentUrl) {
        window.location.href = paymentUrl;
        return;
      }
      setError("Unable to create payment. Please try again.");
    } catch (err: any) {
      console.error("Donation payment error:", err);
      setError(
        err?.data?.message ||
          err?.error ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section
      id="support"
      className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#130A0A]"
    >
      <div className="w-full px-2 xl:container mx-auto">
        <div className="relative bg-[#0C0C0C] border border-zinc-800/80 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-center">
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-[#161618] text-zinc-300 text-xs font-semibold">
                <span className="text-red-500 text-sm">❤️</span>
                <span>Support the Mission</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black text-white tracking-tight uppercase leading-[1.1] mt-6 mb-5">
                EMPOWER THE NEXT <br />
                <span className="text-red-600">GENERATION</span>
              </h2>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg">
                Evolution Hub is a nonprofit initiative working to connect
                aspiring football talent with coaching, guidance, visibility,
                and career opportunities. Your support helps the mission reach
                more players.
              </p>
            </div>

            <div>
              <div className="bg-[#131316] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                <h3 className="text-white font-bold text-lg sm:text-xl">
                  Donation Amount
                </h3>

                <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
                  {presetAmounts.map((preset) => {
                    const isSelected = amount === preset;

                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handlePresetClick(preset)}
                        className={`py-3.5 rounded-xl font-bold text-base transition-all duration-200 cursor-pointer text-center ${
                          isSelected
                            ? "bg-[#e5252a] text-white border border-transparent shadow-[0_4px_22px_rgba(229,37,42,0.45)]"
                            : "bg-[#1a1a1e] text-white border border-zinc-800/80 hover:border-zinc-700 hover:bg-[#202025]"
                        }`}
                      >
                        ${preset}
                      </button>
                    );
                  })}
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-semibold text-base select-none pointer-events-none">
                    $
                  </span>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={amount}
                    onChange={handleCustomChange}
                    placeholder="Custom Amount"
                    className="w-full bg-[#1a1a1e] border border-zinc-800/80 rounded-xl pl-8 pr-4 py-3.5 text-white placeholder-zinc-500 font-medium text-base outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-medium -mt-2">
                    {error}
                  </p>
                )}

                <div className="space-y-3 pt-1">
                  <button
                    type="button"
                    onClick={handleSupport}
                    disabled={isLoading}
                    className="w-full bg-white hover:bg-zinc-200 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold py-3.5 sm:py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 text-base shadow-sm cursor-pointer"
                  >
                    <span>
                      {isLoading ? "Processing..." : "Donate Now"}
                    </span>

                    {!isLoading && (
                      <span className="text-lg font-bold">→</span>
                    )}
                  </button>

                  <p className="text-zinc-500 text-xs sm:text-xs text-center font-normal">
                    We will reply with the available contribution options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseYourPlan;

