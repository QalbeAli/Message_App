"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext"; // Import the AuthContext
import { useRouter } from "next/navigation";
import VideoAILogo from "../MessagingAppLogo";
import Image from "next/image";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false); // For handling mobile menu toggle
  const authContext = useContext(AuthContext); // Access the context
  const router = useRouter();

  if (!authContext) return null; // Handle the case where context is null

  const { isAuthenticated, logout } = authContext; // Destructure values from the context

  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="">
      <header className="py-3 bg-cyan-600">
        <div className="px-4  sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex justify-center items-center">
                <Image src="/logo.svg" alt="logo" width={72} height={72} />
                <div className="text-white font-bold text-4xl ml-6">
                  Message Me!
                </div>
              </div>
            </Link>

            {/* Mobile toggle button */}
            <div className="flex md:hidden">
              <button type="button" className="text-white" onClick={toggleMenu}>
                {!expanded ? (
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop navigation */}

            <div>
              <button className="bg-cyan-400 py-3 px-6 rounded-full text-black font-bold">
                <Link href="/message-app">Go To App</Link>
              </button>
            </div>

            {/* Conditional rendering for login/logout button */}
            <div className="relative hidden md:items-center md:justify-center md:inline-flex group">
              <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>

              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-[#415A77] border border-transparent rounded-full"
                >
                  Log Out
                </button>
              ) : (
                <Link
                  href="/login"
                  className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-[#415A77] border border-transparent rounded-full"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile navigation */}
          {expanded && (
            <nav>
              <div className="flex flex-col pt-8 pb-4 space-y-6">
                <Link
                  className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                  href="/create"
                >
                  Create
                </Link>
                <Link
                  className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                  href="/tiktok-video-generator"
                >
                  Make Tiktok Videos
                </Link>
                <Link
                  className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                  href="/caption-video"
                >
                  Caption Video
                </Link>
                <Link
                  className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                  href="/audio-video"
                >
                  Audio To Video
                </Link>
                <Link
                  href="/pricing"
                  className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                >
                  Pricing
                </Link>
                <div className="relative inline-flex items-center justify-center group">
                  <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                  {isAuthenticated ? (
                    <button
                      onClick={logout}
                      className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-[#415A77] border border-transparent rounded-full"
                    >
                      Log Out
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-[#415A77] border border-transparent rounded-full"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
