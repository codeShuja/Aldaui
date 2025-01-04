import React from "react";
import { UploadIcon } from "../icon/icon";

interface FileInputProps {
  id: string;
  name: string;
  accept?: string;
  onFileChange: (file: File | null) => void;
  preview: string | null;
}

const FileInput: React.FC<FileInputProps> = ({ id, name, accept, onFileChange, preview }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onFileChange(file);
  };

  return (
    <div className="flex flex-col items-center">
      <label className="flex items-center justify-center gap-2 px-4 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 text-sm">
        <UploadIcon className="text-base" />
        <span>Choose File</span>
        <input
          id={id}
          name={name}
          type="file"
          onChange={handleFileChange}
          accept={accept || "*/*"}
          className="hidden"
        />
      </label>
      <div className="mt-2 flex justify-center w-full h-32 border rounded-md overflow-hidden">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-contain" />
        ) : (
          <span className="text-gray-500 text-sm flex items-center justify-center">No file selected</span>
        )}
      </div>
    </div>
  );
};

export default FileInput;
