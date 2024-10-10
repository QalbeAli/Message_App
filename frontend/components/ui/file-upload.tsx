import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, FileText, Video, Music } from 'lucide-react';
import { useDropzone, Accept } from "react-dropzone";

const mainVariant = {
  initial: { scale: 1 },
  animate: { scale: 1.05 },
};

interface FileUploadProps {
  onChange?: (files: File[]) => void;
  acceptedFileTypes?: 'audio' | 'video' | 'both';
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange, acceptedFileTypes = 'audio' }) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAcceptObject = (): Accept => {
    switch (acceptedFileTypes) {
      case 'audio':
        return { 'audio/*': [] };
      case 'video':
        return { 'video/*': [] };
      case 'both':
        return { 'audio/*': [], 'video/*': [] };
      default:
        return { 'audio/*': [] };
    }
  };

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    if (onChange) {
      onChange(newFiles);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
    accept: getAcceptObject(),
  });

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('audio/')) {
      return <Music className="w-6 h-6 mr-3 text-cyan-400" />;
    } else if (file.type.startsWith('video/')) {
      return <Video className="w-6 h-6 mr-3 text-cyan-400" />;
    }
    return <FileText className="w-6 h-6 mr-3 text-cyan-400" />;
  };

  const getAcceptString = () => {
    switch (acceptedFileTypes) {
      case 'audio':
        return 'audio/*';
      case 'video':
        return 'video/*';
      case 'both':
        return 'audio/*,video/*';
      default:
        return 'audio/*';
    }
  };

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        variants={mainVariant}
        className="relative block w-full p-8 overflow-hidden transition-all duration-300 border border-gray-700 cursor-pointer group/file rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 hover:shadow-lg hover:shadow-cyan-500/20"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
          accept={getAcceptString()}
        />
        <div className="flex flex-col items-center justify-center">
          <Upload className="w-12 h-12 mb-4 text-cyan-400" />
          <p className="mb-2 text-xl font-bold text-white">
            Upload {acceptedFileTypes === 'both' ? 'Audio or Video' : acceptedFileTypes.charAt(0).toUpperCase() + acceptedFileTypes.slice(1)} File
          </p>
          <p className="text-center text-gray-400">
            Drag and drop your {acceptedFileTypes === 'both' ? 'audio or video' : acceptedFileTypes} file here or click to browse
          </p>
          <div className="relative w-full max-w-xl mx-auto mt-6">
            {files.length > 0 ? (
              files.map((file, idx) => (
                <motion.div
                  key={`file-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center justify-between p-4 mb-4 bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center">
                    {getFileIcon(file)}
                    <div>
                      <p className="max-w-xs font-medium text-white truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(idx)}
                    className="text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={mainVariant}
                className="p-8 text-center border-2 border-gray-700 border-dashed rounded-lg"
              >
                {isDragActive ? (
                  <p className="text-lg text-cyan-400">Drop it here</p>
                ) : (
                  <p className="text-lg text-gray-400">No file selected</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FileUpload;