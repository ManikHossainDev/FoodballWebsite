/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useAddClubMutation } from "@/redux/features/club/club";
import { useRouter } from "next/navigation";

const Page = () => {
  const [addClub, { isLoading }] = useAddClubMutation();
  const [positionInput, setPositionInput] = useState("");
  const route = useRouter();
  const [form, setForm] = useState({
    clubOverview: "",
    playerRequirements: "",
    benefits: "",
    openPositions: [] as string[],
    positionTitle: "",
    employmentType: "",
    packageRange: "",
    dateLine: "",
  });

  const addPosition = () => {
    const value = positionInput.trim();

    if (!value) return;

    if (form.openPositions.includes(value)) return;

    setForm((prev) => ({
      ...prev,
      openPositions: [...prev.openPositions, value],
    }));

    setPositionInput("");
  };

  const removePosition = (index: number) => {
    setForm((prev) => ({
      ...prev,
      openPositions: prev.openPositions.filter((_, i) => i !== index),
    }));
  };

  const update =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const resetForm = () => {
    setForm({
      clubOverview: "",
      playerRequirements: "",
      benefits: "",
      openPositions: [],
      positionTitle: "",
      employmentType: "",
      packageRange: "",
      dateLine: "",
    });
    setPositionInput("");
  };

  const isFormValid = () => {
    return (
      form.clubOverview.trim() !== "" &&
      form.playerRequirements.trim() !== "" &&
      form.benefits.trim() !== "" &&
      form.openPositions.length > 0 &&
      form.positionTitle.trim() !== "" &&
      form.employmentType.trim() !== "" &&
      form.packageRange.trim() !== "" &&
      form.dateLine.trim() !== ""
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all fields and add at least one open position before submitting.",
      });
      return;
    }

    const payload = {
      overview: form.clubOverview,
      requirements: form.playerRequirements,
      facilities: form.benefits,
      openPositions: form.openPositions.length,
      positions: form.openPositions,
      positionTitle: form.positionTitle,
      employmentType: form.employmentType,
      salaryRange: form.packageRange,
      dateLine: form.dateLine,
    };

    try {
      const res = await addClub(payload).unwrap();
      console.log(res);

      if (res?.success) {
        route.push("/hirerplayers");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res?.message || "Hiring post created successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res?.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error: any) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          error?.data?.message ||
          error?.message ||
          "Something went wrong.",
      });
    }
  };

  const labelClass = "text-sm text-[#B5B5B5] mb-2 block";

  const fieldWrapClass =
    "bg-[#232323] border border-[#3A3A3A] rounded-lg focus-within:border-[#FF3B3B] transition-colors";

  const inputClass =
    "w-full bg-transparent px-4 py-3 text-sm text-white placeholder-[#6E6E6E] outline-none";

  return (
    <div className="p-6">
      <div>
        <h2
          className="text-xl md:text-2xl font-bold text-white py-3"
          style={{
            textShadow:
              "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000",
          }}
        >
          Create Hiring Post
        </h2>

        <p className="text-[#8F8F8F] mb-5">
          Find and recruit the perfect player for your team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-semibold text-white mb-3">
              Club Overview
            </h3>

            <label className={labelClass}>
              Club Overview Description
            </label>

            <div className={fieldWrapClass}>
              <textarea
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Describe the club..."
                value={form.clubOverview}
                onChange={update("clubOverview")}
              />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">
              Player Requirements
            </h3>

            <label className={labelClass}>
              Player Requirements Description
            </label>

            <div className={fieldWrapClass}>
              <textarea
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Describe requirements..."
                value={form.playerRequirements}
                onChange={update("playerRequirements")}
              />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">
              Benefits & Perks
            </h3>

            <label className={labelClass}>
              Benefits & Perks
            </label>

            <div className={fieldWrapClass}>
              <textarea
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Salary, bonus, insurance..."
                value={form.benefits}
                onChange={update("benefits")}
              />
            </div>
          </section>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Position Details
          </h3>

          <div className="space-y-6">
            <div>
              <label className={labelClass}>Open Position</label>

              <div className="flex gap-2">
                <div className={`${fieldWrapClass} flex-1`}>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Enter Position"
                    value={positionInput}
                    onChange={(e) => setPositionInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addPosition();
                      }
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={addPosition}
                  className="px-4 rounded-lg bg-red-600 text-white"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {form.openPositions.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full"
                  >
                    {item}

                    <button
                      type="button"
                      onClick={() => removePosition(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Position Title</label>

              <div className={fieldWrapClass}>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Senior Player"
                  value={form.positionTitle}
                  onChange={update("positionTitle")}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Employment Type</label>

              <div className={fieldWrapClass}>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Full-time"
                  value={form.employmentType}
                  onChange={update("employmentType")}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Salary Range</label>

              <div className={fieldWrapClass}>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="$50,000 - $80,000 per year"
                  value={form.packageRange}
                  onChange={update("packageRange")}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Application Deadline</label>

              <div className={fieldWrapClass}>
                <input
                  type="date"
                  className={inputClass}
                  value={form.dateLine}
                  onChange={update("dateLine")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-10">
        <button
          type="button"
          onClick={resetForm}
          className="px-6 py-3 rounded-lg border border-red-500 text-white"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-gray-500 text-white"
        >
          {isLoading ? "Creating..." : "Create Hiring"}
        </button>
      </div>
    </div>
  );
};

export default Page;