"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import VideoAILogo from "../MessagingAppLogo";
import { Play, Twitter, Facebook, Instagram } from 'lucide-react';
import Image from "next/image";

const Footer: React.FC = () => {
  const router = useRouter();

  const handleClickCreate = () => {
    router.push("/create");
  };

  return (
    <footer className="py-16 text-gray-300 bg-gradient-to-b from-gray-900 to-black">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h5 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl">
            Ready to revolutionize your video content?
          </h5>
          <p className="mt-4 text-xl text-gray-400">
            Join thousands of creators using AI to streamline their video production.
          </p>

          <div className="mt-8">
            <Link
              href="/create"
              className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-blue-500 hover:shadow-pink-500/50"
              onClick={handleClickCreate}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Messaging Now
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-3">
          <div className="flex flex-col items-center lg:items-start">
            <Image src="/logo.svg" alt="logo" width={96} height={96} />
            <div className="text-4xl font-bold text-white">Message Me!</div>
            <p className="mt-4 text-sm text-center text-gray-400 lg:text-left">
              Empowering creators with AI-driven video solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h6 className="text-lg font-semibold text-white">Quick Links</h6>
              <ul className="mt-4 space-y-2">
                {["About", "Features", "Pricing", "Blog"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 transition-colors duration-200 hover:text-cyan-400">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="text-lg font-semibold text-white">Support</h6>
              <ul className="mt-4 space-y-2">
                {["Help Center", "API Documentation", "Community", "Contact Us"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 transition-colors duration-200 hover:text-cyan-400">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <hr className="mt-12 border-gray-800" />

        <div className="mt-8 sm:flex sm:items-center sm:justify-between">
          <p className="text-sm text-gray-400">&copy; 2024 zVideoAI. All rights reserved.</p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            {[Twitter, Facebook, Instagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-400 transition-colors duration-200 hover:text-cyan-400"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;