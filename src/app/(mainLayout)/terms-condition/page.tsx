"use client"
import { useSettingsQuery } from "@/redux/features/setting/setting";

const Page = () => {
  const { data, isLoading, isError } = useSettingsQuery("terms");
  const terms = data?.data;

  return (
    <div className="text-white responsive-padding">
      <br />
      <div className=" md:py-16 flex flex-col justify-center items-center md:mb-20 py-4 space-y-6">
        {isLoading && <p>Loading...</p>}

        {isError && <p>Failed to load terms and conditions.</p>}

        {!isLoading && !isError && terms && (
          <div
            className="w-full py-6 prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: terms.content }}
          />
        )}
      </div>
    </div>
  );
};

export default Page;