"use client";

import React, { useState } from "react";
import { ChevronRight, Wand2, Music, Type, Video, Globe, Play } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface VideoCardData {
  toolName: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  url: string;
  demoUrl: string;
}

interface VideoCardProps {
  card: VideoCardData;
}

const VideoCard: React.FC<VideoCardProps> = ({ card }) => {
  return (
    <motion.div
      className="relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl"
      initial={{ boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }}
      whileHover={{
        boxShadow: `0 0 30px ${card.accentColor}50`,
        scale: 1.03,
      }}
    >
      <div className="relative z-10 flex flex-col justify-between h-full p-6">
        <div>
          <motion.div
            className={`text-5xl ${card.accentColor} mb-4`}
            whileHover={{ y: -5, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {card.icon}
          </motion.div>
          <h3 className="mb-2 text-2xl font-bold text-white">{card.toolName}</h3>
          <p className={`text-sm font-medium mb-4 ${card.accentColor}`}>{card.tagline}</p>
          <p className="mb-6 text-sm text-gray-300">{card.description}</p>
        </div>

        <motion.a
          href={card.url}
          className={`flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-lg bg-gray-700 hover:bg-gray-600 group`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Now
          <ChevronRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.a>
      </div>
      <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-transparent via-transparent to-black" />
    </motion.div>
  );
};

export function ZVideoAIToolsShowcase() {
  return (
    <section className="w-full py-20 bg-gray-900">
      <div className="container px-4 mx-auto">
        <motion.h2
          className="mb-8 text-4xl font-bold text-center text-white md:text-6xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Unleash the Power of
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Next-Gen AI Video Creation
          </span>
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center mb-12 space-x-4 space-y-4 sm:space-y-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {["Lightning-Fast Results", "Trend-Optimized Content", "No Experience Needed"].map((feature, index) => (
            <span key={index} className={`px-4 py-2 text-sm font-semibold text-white rounded-full ${index === 0 ? "bg-blue-600" : index === 1 ? "bg-cyan-600" : "bg-indigo-600"
              }`}>
              {feature}
            </span>
          ))}
        </motion.div>
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {data.map((card, index) => (
            <VideoCard key={index} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const data: VideoCardData[] = [
  {
    toolName: "AI Tiktok Video Generator",
    tagline: "Generate Stunning TikTok Videos!",
    description: "Create viral-worthy TikTok content in minutes with our AI-powered video generator. Perfect for marketers and content creators looking to boost engagement.",
    icon: <Music />,
    accentColor: "text-cyan-400",
    url: '/tiktok-video-generator',
    demoUrl: '/demo/tiktok-video-generator',
  },
  {
    toolName: "AI Captions Generator",
    tagline: "Revolutionize Your Captions",
    description: "Automatically generate accurate, engaging captions for your videos in multiple languages. Improve accessibility and boost SEO with AI-powered subtitles.",
    icon: <Type />,
    accentColor: "text-green-400",
    url: '/ai-caption-generator',
    demoUrl: '/demo/ai-caption-generator',
  },
  {
    toolName: "Audio to Video AI",
    tagline: "Transform Audio to Video!",
    description: "Convert your podcasts, audio lectures, or music into compelling video content. Our AI selects relevant visuals to match your audio, creating engaging multimedia experiences.",
    icon: <Video />,
    accentColor: "text-purple-400",
    url: '/audio-to-video-ai',
    demoUrl: '/demo/audio-to-video-ai',
  },
  {
    toolName: "AI Video Translator",
    tagline: "Translate Your Videos!",
    description: "Break language barriers with our AI video translator. Automatically dub and subtitle your videos in multiple languages, expanding your global reach effortlessly.",
    icon: <Globe />,
    accentColor: "text-yellow-400",
    url: '/video-translator-ai',
    demoUrl: '/demo/video-translator-ai',
  },
];