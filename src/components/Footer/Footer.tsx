import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import logo from '@/assets/logo/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="responsive-padding text-white ">
      {/* Main Footer Content */}
      <div className="py-5 md:py-10 px-3 lg:px-0">
        <div className="grid grid-cols-12 gap-8  xl:gap-2 2xl:gap-24 ">
          {/* Brand Section */}
          <div className="col-span-11 lg:col-span-3 xl:col-span-4">
            <div className="w-48 h-32 md:-mt-16 md:-ml-5">
              <Image src={logo} alt="Logo" />
            </div>

            <p className="text-gray-400 text-base md:text-[18px] py-1 w-full md:w-[62%]">
              Connecting football talent with opportunities worldwide. Your
              journey to professional football starts here.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <Link
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              >
                <FaFacebookF className="text-sm" />
              </Link>

              <Link
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              >
                <FaTwitter className="text-sm" />
              </Link>

              <Link
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              >
                <FaInstagram className="text-sm" />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              >
                <FaLinkedinIn className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className='col-span-5  md:col-span-4 lg:col-span-2 xl:col-span-3 '>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>

            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about-us' },
                { label: 'Features', href: '/features' },
                { label: 'Pricing', href: '/pricing' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Users */}
          <div className='col-span-5 md:col-span-4 lg:col-span-2 xl:col-span-3'>
            <h4 className="text-lg font-semibold mb-4">For Users</h4>

            <ul className="space-y-3">
              {[
                {
                  label: 'Terms & Conditions',
                  href: '/terms-condition',
                },
                {
                  label: 'Privacy Policy',
                  href: '/privacy-policy',
                },
                {
                  label: 'FAQ',
                  href: '/faq',
                },
                {
                  label: 'Contact Us',
                  href: '/contact-us',
                },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className='col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-2'>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>

            <ul className="space-y-4">
              <li>
                <Link
                  href="mailto:info@visionstriker.com"
                  className="flex items-start space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <FaEnvelope className="text-red-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm break-all">
                    info@visionstriker.com
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="tel:+12345678901"
                  className="flex items-start space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <FaPhone className="text-red-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm">+1 (234) 567-890</span>
                </Link>
              </li>

              <li>
                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <FaMapMarkerAlt className="text-red-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm">
                    123 Football Street
                    <br />
                    Sports City, SC 12345
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} VISION STRIKER. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;