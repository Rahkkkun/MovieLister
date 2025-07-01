import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Company</h3>
          <ul>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Press</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Docs</a></li>
            <li><a href="#" className="hover:underline">Help Center</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Legal</h3>
          <ul>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Cookie Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" aria-label="Twitter" className="hover:text-gray-400">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-gray-400">
              <FaGithub />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-white border border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-md font-semibold cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Made by Rio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
