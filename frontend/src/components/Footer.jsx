import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 pt-16 md:px-16 lg:px-24 xl:px-32 w-full">
      <div className="flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b border-gray-500/30">
        {/* Logo & Description */}
        <div className="max-w-96">
          {/* SVG Logo */}
          <svg
            width="157"
            height="40"
            viewBox="0 0 157 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Your SVG paths remain unchanged */}
          </svg>

          <p className="mt-6 text-sm text-gray-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2 mt-3">
            <Link to={"/"}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG Path */}
              </svg>
            </Link>
            <Link to={"/"}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG Path */}
              </svg>
            </Link>
            <Link to={"/"}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG Path */}
              </svg>
            </Link>
          </div>
        </div>

        {/* Links Section */}
        <div className="w-1/2 flex flex-wrap md:flex-nowrap justify-between">
          {/* Resources */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">RESOURCES</h2>
            <ul className="text-sm text-gray-500 space-y-2 list-none">
              <li><Link to={"/"}>Documentation</Link></li>
              <li><Link to={"/"}>Tutorials</Link></li>
              <li><Link to={"/"}>Blog</Link></li>
              <li><Link to={"/"}>Community</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">COMPANY</h2>
            <ul className="text-sm text-gray-500 space-y-2 list-none">
              <li><Link to={"/"}>About</Link></li>
              <li><Link to={"/"}>Careers</Link></li>
              <li><Link to={"/"}>Privacy</Link></li>
              <li><Link to={"/"}>Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="py-4 text-center text-xs md:text-sm text-gray-500">
        Copyright 2024 ©{" "}
        <Link href="https://prebuiltui.com">Grocery App</Link>. All Rights
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;
