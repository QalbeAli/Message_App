"use client";
import React, { useState } from "react";
import FileUpload from "../ui/file-upload";

export function FileUploadDemo() {
  const [, setFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="w-full max-w-4xl mx-auto border border-dashed rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 dark:bg-black border-neutral-200 dark:border-neutral-800">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}
