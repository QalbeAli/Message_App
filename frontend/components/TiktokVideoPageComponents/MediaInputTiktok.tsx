"use client";
import React, { useState } from 'react';
import { Play, Wand2, RefreshCw, Download, Loader2, ChevronDown, ChevronUp, Sliders, Music, User, Clock, Image, PenTool, LayoutGrid, Mic, Upload, Type, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL, generateVideo } from '@/services/api';
import { toast } from 'react-toastify';

interface OpenSections {
  script: boolean;
  voiceover: boolean;
  style: boolean;
  music: boolean;
  captions: boolean;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  toggle: () => void;
  icon?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children, isOpen, toggle, icon }) => (
  <div className="mb-2 overflow-hidden transition-all duration-300 border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl">
    <button
      className="flex items-center justify-between w-full px-6 py-4 transition-all duration-300 hover:bg-gray-800/50 focus:outline-none group"
      onClick={toggle}
      aria-expanded={isOpen}
      aria-controls={`section-${title}`}
    >
      <div className="flex items-center space-x-3">
        {icon && <span className="transition-colors duration-300 text-cyan-400 group-hover:text-cyan-300">{icon}</span>}
        <h2 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-cyan-300">{title}</h2>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 transition-colors duration-300 text-cyan-400 group-hover:text-cyan-300" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`section-${title}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="p-6 border-t border-gray-700 bg-gray-800/30">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);



const TikTokVideoGenerator = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [captionOptions, setCaptionOptions] = useState({
    method: 'Subtitles',
    color: '#FFFFFF',
    fontsize: 100,
    stroke_width: 3,
    stroke_color: '#000000'
  });

  const [openSections, setOpenSections] = React.useState<OpenSections>({
    script: true,
    voiceover: false,
    style: false,
    music: false,
    captions: true,
  });

  const [captionStyle, setCaptionStyle] = useState('Subtitles');
  const [fontColor, setFontColor] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState(20);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [strokeColor, setStrokeColor] = useState('#000000');

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string | number>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(e.target.value);
      setCaptionOptions({
        method: captionStyle,
        color: fontColor,
        fontsize: fontSize,
        stroke_width: strokeWidth,
        stroke_color: strokeColor,
      });
    };

  const handleStringChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(e.target.value);
      setCaptionOptions({
        method: captionStyle,
        color: fontColor,
        fontsize: fontSize,
        stroke_width: strokeWidth,
        stroke_color: strokeColor,
      });
    };

  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value));
      setCaptionOptions({
        method: captionStyle,
        color: fontColor,
        fontsize: fontSize,
        stroke_width: strokeWidth,
        stroke_color: strokeColor,
      });
    };


  const handleSelectChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setter(e.target.value);
    setCaptionOptions({
      method: captionStyle,
      color: fontColor,
      fontsize: fontSize,
      stroke_width: strokeWidth,
      stroke_color: strokeColor,
    });
  };

  const toggleSection = (section: keyof OpenSections): void => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const topic = text;
      const result = await generateVideo(topic, undefined, captionOptions);
      toast.success(`successful!`)
      console.log('Video generated:', result);
      setVideoUrl(result.video_url)
    } catch (error) {
      console.error('Failed to generate video:', error);
      toast.error('Failed to generate video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-gray-100 bg-black">
      <div className="container px-4 py-12 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            AI TikTok <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Video Generator</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Transform your ideas into viral-worthy content. Create engaging vertical videos with AI-powered scripts, voices, and styles.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Section title="Script" isOpen={openSections.script} toggle={() => toggleSection('script')} icon={<Wand2 />}>
              {/* <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <button className="flex items-center px-4 py-2 text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700">
                    <Wand2 className="w-5 h-5 mr-2" />
                    AI Generate
                  </button>
                  <button className="flex items-center px-4 py-2 text-white transition-colors duration-300 rounded-lg bg-cyan-600 hover:bg-cyan-700">
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Rewrite
                  </button>
                  <button className="flex items-center px-4 py-2 text-white transition-colors duration-300 bg-purple-600 rounded-lg hover:bg-purple-700">
                    <Upload className="w-5 h-5 mr-2" />
                    Import
                  </button>
                </div>
              </div> */}
              <textarea
                className="w-full h-40 p-4 text-gray-100 transition-all duration-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your video script here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <p className="mt-2 text-sm text-gray-400">
                💡 Tip: Use [brackets] to guide media generation
              </p>
            </Section>

            {/* <Section title="Voice Over" isOpen={openSections.voiceover} toggle={() => toggleSection('voiceover')} icon={<Mic />}>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <User className="w-6 h-6 text-gray-400" />
                  <select className="flex-grow p-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Voice</option>
                    <option>Male Voice 1</option>
                    <option>Female Voice 1</option>
                    <option>Male Voice 2</option>
                    <option>Female Voice 2</option>
                  </select>
                </div>
                <div className="flex items-center space-x-4">
                  <Sliders className="w-6 h-6 text-gray-400" />
                  <input type="range" className="flex-grow" min="0" max="100" />
                  <span className="text-gray-400">Speed</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mic className="w-6 h-6 text-gray-400" />
                  <button className="flex items-center px-4 py-2 text-white transition-colors duration-300 bg-green-600 rounded-lg hover:bg-green-700">
                    Record Custom Voice
                  </button>
                </div>
              </div>
            </Section> */}

            {/* <Section title="Style" isOpen={openSections.style} toggle={() => toggleSection('style')} icon={<Palette />}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {['Modern', 'Retro', 'Minimalist', 'Vibrant'].map((style) => (
                    <div key={style} className="p-4 transition-colors duration-300 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600">
                      <img src="/api/placeholder/150/200" alt={style} className="w-full h-auto mb-2 rounded" />
                      <p className="text-center">{style}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-4">
                  <LayoutGrid className="w-6 h-6 text-gray-400" />
                  <select className="flex-grow p-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Layout</option>
                    <option>Full Screen</option>
                    <option>Split Screen</option>
                    <option>Picture-in-Picture</option>
                  </select>
                </div>
                <div className="flex items-center space-x-4">
                  <PenTool className="w-6 h-6 text-gray-400" />
                  <input type="color" className="p-1 bg-gray-700 rounded" />
                  <span className="text-gray-400">Color Scheme</span>
                </div>
              </div>
            </Section> */}

            {/* <Section title="Music" isOpen={openSections.music} toggle={() => toggleSection('music')} icon={<Music />}>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Music className="w-6 h-6 text-gray-400" />
                  <select className="flex-grow p-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Background Music</option>
                    <option>Upbeat Pop</option>
                    <option>Chill Lo-Fi</option>
                    <option>Energetic Electronic</option>
                    <option>Acoustic Guitar</option>
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <Sliders className="w-6 h-6 text-gray-400" />
                  <input type="range" className="flex-grow" min="0" max="100" />
                  <span className="text-gray-400">Volume</span>
                </div>
                <button className="flex items-center px-4 py-2 text-white transition-colors duration-300 bg-indigo-600 rounded-lg hover:bg-indigo-700">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Custom Track
                </button>
              </div>
            </Section> */}

            <Section title="Captions" isOpen={openSections.captions} toggle={() => toggleSection('captions')} icon={<Type />}>
              <div className="space-y-4">
                {/* <div className="flex items-center space-x-4">
                  <Image className="w-6 h-6 text-gray-400" />
                  <select
                    className="flex-grow p-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={captionStyle}
                    onChange={handleStringChange(setCaptionStyle)}
                  >
                    <option value="Subtitles">Subtitles</option>
                    <option value="Kinetic">Kinetic Typography</option>
                    <option value="Minimal">Minimal</option>
                  </select>
                </div> */}
                <div className="flex items-center space-x-4">
                  <PenTool className="w-6 h-6 text-gray-400" />
                  <input
                    type="color"
                    className="p-1 bg-gray-700 rounded"
                    value={fontColor}
                    onChange={handleStringChange(setFontColor)}
                  />
                  <span className="text-gray-400">Font Color {fontColor}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Sliders className="w-6 h-6 text-gray-400" />
                  <input
                    type="range"
                    className="flex-grow"
                    min="10"
                    max="500"
                    step={10}
                    value={fontSize}
                    onChange={handleNumberChange(setFontSize)}
                  />
                  <span className="text-gray-400">Font Size: {fontSize}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <PenTool className="w-6 h-6 text-gray-400" />
                  <input
                    type="color"
                    className="p-1 bg-gray-700 rounded"
                    value={strokeColor}
                    onChange={handleStringChange(setStrokeColor)}
                  />
                  <span className="text-gray-400">Stroke Color</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Sliders className="w-6 h-6 text-gray-400" />
                  <input
                    type="range"
                    className="flex-grow"
                    min="0"
                    max="10"
                    value={strokeWidth}
                    onChange={handleNumberChange(setStrokeWidth)}
                  />
                  <span className="text-gray-400">Stroke Width: {strokeWidth}</span>
                </div>
              </div>
            </Section>

            <button
              onClick={handleSubmit}
              className="w-full px-8 py-3 text-lg font-bold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            // disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 animate-spin" />
                  Generating...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Play className="mr-2" />
                  Generate Video
                </span>
              )}
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-gray-800 shadow-xl rounded-xl">
              <h2 className="mb-4 text-2xl font-bold">Preview</h2>
              <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden mb-4">
                {videoUrl ? (
                  <video controls className="w-full h-full">
                    <source src={API_URL + videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-500">
                    Video preview will appear here
                  </div>
                )}
              </div>

            </div>

            {videoUrl && (
              <div className="p-6 bg-gray-800 shadow-xl rounded-xl">
                {/* <h2 className="mb-4 text-2xl font-bold">Video Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Duration: 00:30</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Voice: Male Voice 1</span>
                  </div>
                  <div className="flex items-center">
                    <Music className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Background Music: Upbeat Pop</span>
                  </div>
                  <div className="flex items-center">
                    <Image className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Style: Modern</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="mb-2 font-semibold">Share Your Video</h3>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-4 py-2 text-white transition-colors duration-300 bg-pink-600 rounded-lg hover:bg-pink-700">
                      TikTok
                    </button>
                    <button className="flex-1 px-4 py-2 text-white transition-colors duration-300 bg-purple-600 rounded-lg hover:bg-purple-700">
                      Instagram
                    </button>
                    <button className="flex-1 px-4 py-2 text-white transition-colors duration-300 bg-red-600 rounded-lg hover:bg-red-700">
                      YouTube
                    </button>
                  </div>
                </div> */}
                <a
                  href={API_URL + videoUrl}
                  download="generated_video.mp4"
                  className="inline-flex items-center justify-center w-full px-6 py-3 mt-4 text-white transition-colors duration-300 rounded-lg bg-cyan-600 hover:bg-cyan-700"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Video
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TikTokVideoGenerator;
