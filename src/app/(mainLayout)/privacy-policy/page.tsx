"use client"
import { useSettingsQuery } from "@/redux/features/setting/setting";

const Page = () => {
  const { data, isLoading, isError } = useSettingsQuery("privacy");
  const terms = data?.data;

  return (
    <div className="responsive-padding text-white">
      

      {/* content */}
      <div className="md:py-16 md:mb-20 py-4 space-y-6">
        <div className=" md:mt-10">

          {isLoading && <p>Loading...</p>}
          {isError && <p>Failed to load privacy policy.</p>}

          {!isLoading && !isError && terms && (
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: terms.content }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;