import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ContactUsPage = () => {
  return (
    <section className="responsive-padding py-20 bg-black text-white">
      {/* Header */}
      <div className="text-center my-7 xl:my-14">
        <h2
              className="text-2xl md:text-5xl font-bold text-white mb-6"
              style={{
                textShadow:
                  "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
              }}
            >
              Let&apos;s Connect
            </h2>
        

        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          Whether you have a question, feedback, or partnership inquiry,
          our team is here to help.
        </p>
      </div>

      {/* Contact Wrapper */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left Card */}
        <div className="bg-[#2b2b2b] rounded-lg p-8 min-h-[300px]">
          <h3 className="font-semibold mb-8">Contact Us</h3>

          <div className="space-y-5 text-gray-300 text-sm">
            <div className="flex items-start gap-3">
              <FaEnvelope className="mt-1 text-red-500" />
              <span>info@footballconnect.com</span>
            </div>

            <div className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 text-red-500" />
              <span>+1 (234) 567-890</span>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-red-500" />
              <span>
                123 Football Street
                <br />
                Sports City, SC 12345
              </span>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-[#2b2b2b] rounded-lg px-4 xl:p-8">
          <h3 className="text-3xl font-semibold text-center mb-8">
            Contact
          </h3>

          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 outline-none focus:border-red-400"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 outline-none focus:border-red-400"
              />
            </div>

            <textarea
              rows={4}
              placeholder="Message"
              className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 outline-none focus:border-red-400 resize-none"
            />

            <div className="flex justify-center pb-2">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white px-10 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;