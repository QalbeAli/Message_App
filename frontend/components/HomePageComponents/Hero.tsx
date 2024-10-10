import React from 'react';
import { Play, Star, Zap, Sparkles, Video, Wand2 } from 'lucide-react';

const FeatureItem: React.FC<{ icon: React.ElementType; text: string }> = ({ icon: Icon, text }) => (
  <li className="flex items-center space-x-4 text-gray-300">
    <Icon className="w-5 h-5 text-blue-400" />
    <span className="text-lg">{text}</span>
  </li>
);

const GlowingButton: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <button className="relative px-8 py-4 text-lg font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-blue-600 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-gray-900 group">
    <span className="relative z-10 flex items-center justify-center">{children}</span>
    <span className="absolute inset-0 w-full h-full transition-all duration-300 rounded-lg opacity-75 blur-md bg-gradient-to-r from-pink-500 to-cyan-400 group-hover:blur-lg"></span>
  </button>
);

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5"></div>
      <div className="container px-8 mx-auto lg:px-16">
        <div className="flex flex-col items-center justify-between space-y-12 lg:flex-row lg:space-y-0 lg:space-x-16">
          <div className="space-y-8 lg:w-1/2">
            <h1 className="text-5xl font-bold leading-tight text-white lg:text-6xl">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-300">Send A Message</span> with US  
            </h1>
            <p className="text-xl text-gray-300 lg:text-2xl">
              Send a message to yourself in future
            </p>
            
            <ul className="space-y-4">
              <FeatureItem icon={Zap} text="Send a Text Messgae" />
              <FeatureItem icon={Sparkles} text="Send a Voice Message" />
              <FeatureItem icon={Video} text="Send To Yourself in Future" />
              <FeatureItem icon={Wand2} text="User-Friendly Interface" />
            </ul>
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-6">
              <GlowingButton>
                <Play className="w-5 h-5 mr-2" /> Start For Free
              </GlowingButton>
              <div className="text-center sm:text-left">
                <p className="mb-2 text-sm text-gray-400">No Credit Card Required</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-400">Loved by 1,458+ creators</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 animate-slideInRight">
            <div className="relative">
              <img
                src="/hero.png"
                alt="Viral Video Preview"
                className="w-full h-auto shadow-2xl rounded-xl"
              />
              <div className="absolute inset-0 opacity-0 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-xl"></div>
              {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;