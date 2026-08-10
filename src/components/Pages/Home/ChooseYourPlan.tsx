"use client";

import Group from "@/assets/Authentication/Group.png";
import { useDonationMutation } from "@/redux/features/Profile/Profile";
import Image from "next/image";
import { useState } from "react";

const ChooseYourPlan = () => {
  const [Donation, { isLoading }] = useDonationMutation();

  const donationAmounts = ["$ 05", "$ 10", "$ 15", "$ 20", "$ 25", "$ 30"];

  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");


  const handlePresetClick = (preset: string) => {
    const numericValue = preset.replace(/[^0-9]/g, "");
    setSelectedAmount(preset);
    setAmount(numericValue);
    setError("");
  };

  
  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setSelectedAmount(null);
      setError("");
    }
  };

  const handleDonate = async () => {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      const res = await Donation({ amount: Number(amount) }).unwrap();

      if (res?.success && res?.data?.url) {
        window.location.href = res.data.url;
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to create donation session. Please try again.");
    }
  };

  return (
    <div className="responsive-padding py-10 lg:py-20">
      <h2
        className="text-2xl md:text-5xl font-bold text-white mb-6 text-center"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        Make Donation
      </h2>

      <div className="flex justify-center">
        <h1 className="text-center text-xs md:text-base lg:text-md py-3 text-gray-300 mb-10">
          As its a not profit site, so you can make donation if you want.
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Left side image */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <Image
            width={500}
            height={500}
            src={Group}
            alt="Donate"
            className="max-w-[280px] md:max-w-[320px] w-full h-auto"
          />
        </div>

        {/* Right side donation form */}
        <div className="w-full lg:w-2/3">
          <p className="text-gray-300 text-sm mb-3">Amount Of Donation</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {donationAmounts.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className={`border rounded-md py-3 text-sm transition-colors
                           focus:outline-none focus:ring-2 focus:ring-red-500
                           ${
                             selectedAmount === preset
                               ? "bg-red-600 border-red-500 text-white"
                               : "border-red-600/60 text-white hover:bg-red-600/20 hover:border-red-500"
                           }`}
              >
                {preset}
              </button>
            ))}
          </div>

          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={handleManualChange}
            placeholder="Enter Amount Manually"
            className="w-full bg-transparent border border-red-600/60 rounded-md
                       px-4 py-3 text-sm text-gray-300 placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {error && (
            <p className="text-red-500 text-sm mt-2 mb-2">{error}</p>
          )}

          <div className={`flex justify-end ${error ? "mt-4" : "mt-8"}`}>
            <button
              type="button"
              onClick={handleDonate}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 transition-colors text-white
                         font-medium rounded-md px-10 py-3
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Donate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseYourPlan;