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
    <footer className="responsive-padding py-10 text-white">
      {/* Main Footer Content */}
      <div className="py-5 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="pb-1">
              <div className="w-48 h-32 md:-mt-7 md:-ml-5">
                <Image src={logo} alt="Logo" />
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting football talent with opportunities worldwide. Your
              journey to professional football starts here.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              >
                <FaFacebookF className="text-sm" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              >
                <FaTwitter className="text-sm" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              >
                <FaInstagram className="text-sm" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              >
                <FaLinkedinIn className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
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
          <div>
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
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>

            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@visionstriker.com"
                  className="flex items-start space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <FaEnvelope className="text-red-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm break-all">
                    info@visionstriker.com
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+12345678901"
                  className="flex items-start space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <FaPhone className="text-red-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm">+1 (234) 567-890</span>
                </a>
              </li>

              <li>
                <a
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
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} VISION STRIKER. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-condition"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/faq"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                FAQ
              </Link>

              <Link
                href="/contact-us"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;