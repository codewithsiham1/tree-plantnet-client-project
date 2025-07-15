import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faYoutube, faPinterestP, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-[#2b6e42] text-white pt-12 pb-6">
      {/* Top Section: 3 Columns */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Contact Column */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CONTACT US</h3>
          <p>PlantNet Project Office</p>
          <p>507 Mirpur-01,</p>
          <p>Dhaka</p>
          <p className="mt-2">
            Email:{" "}
            <a href="mailto:plantnet@Gmail.com" className="text-green-200 hover:underline">
              plantnet@Gmail.com
            </a>
          </p>
          <p>
            Call:{" "}
            <a href="tel:+919876543210" className="text-green-200 hover:underline">
              (+91) 9876-543-210
            </a>
          </p>
        </div>

        {/* Center Column: About + Social */}
        <div className="text-center flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">🌿 PlantNet</h2>
          <p className="text-sm mb-4 max-w-xs md:max-w-md">
            Welcome to our project, where we aim to provide plant knowledge and community-driven services.
          </p>
          <div className="flex justify-center space-x-6 mt-4 text-xl">
            <a href="#" className="hover:text-green-300" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="hover:text-green-300" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="#" className="hover:text-green-300" aria-label="Pinterest">
              <FontAwesomeIcon icon={faPinterestP} />
            </a>
            <a href="#" className="hover:text-green-300" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>

        {/* Newsletter Column */}
        <div className="md:text-left text-center">
          <h3 className="text-lg font-semibold mb-4">OUR NEWSLETTER</h3>
          <p className="text-sm mb-3 max-w-sm mx-auto md:mx-0">
            Subscribe to our latest newsletter to get news about special discounts.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto md:mx-0">
            <input
              type="email"
              placeholder="Your Email Address"
              className="p-2 rounded text-black flex-1"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Subscribe
            </button>
          </form>
          <label className="flex items-center mt-3 text-sm max-w-sm mx-auto md:mx-0 justify-center md:justify-start">
            <input type="checkbox" required className="mr-2" />
            I agree to the terms and privacy policy.
          </label>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm space-x-4 flex flex-wrap justify-center gap-3 max-w-7xl mx-auto px-6">
        {["Delivery", "Legal Notice", "About Us", "Stores", "Contact Us", "Sitemap"].map((link, idx) => (
          <a key={idx} href="#" className="hover:underline whitespace-nowrap">
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
