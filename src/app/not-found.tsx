import React from 'react';
import NotFoundHome  from "@/assets/NotFoundHome.png";
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';


const NotFoundPage = () => {
  return (
    <section>
      <div className="pt-2 ">
        <Header />
      </div>
      <div className="w-full flex flex-col items-center justify-center min-h-screen ">
        <Image
          src={NotFoundHome} // Replace with your "Not Found" image URL
          alt="Not Found"
          className="w-ful h-full" // Adjust size as needed
        />
        <div className="text-xl font-semibold text-white">This is NotFound page</div>
      </div>
      <Footer />
    </section>
  );
}

export default NotFoundPage;