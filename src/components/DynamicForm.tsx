import React, { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon, UploadIcon } from "./icon/icon";
import Dropdown from "./ui/Dropdown";
import YearMonthDatePicker from "./ui/YearMonthDatePicker";

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "textarea" | "file" | "dropdown" | "date"; // Add "date" type
  value: string;
  required?: boolean;
  accept?: string;
  options?: { label: string; value: string }[]; // Options for dropdown
  placeholder?: string;
}

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (values: Record<string, string | File>) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string | File>>({});
  const [preview, setPreview] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [dropdownValues, setDropdownValues] = useState<Record<string, string | null>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, [e.target.name]: file || "" }));
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleDropdownSelect = (name: string, value: string) => {
    setDropdownValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDateChange = (date: Date | null, id: string) => {
    setFormData((prev) => ({ ...prev, [id]: date?.toLocaleDateString() || "" }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.id] && !dropdownValues[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({});
      setPreview(null);
      setDropdownValues({});
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto p-6 grid grid-cols-1 gap-6">
      <div className="w-full sm:grid sm:grid-cols-2 gap-6">
        {fields.map((field) => {
          const { id, label, type, required, accept, options, placeholder } = field;
          return (
            <div key={id} className="flex flex-col space-y-3">
              <label htmlFor={id} className="text-sm font-semibold text-gray-700 mt-0 flex items-center">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {type === "textarea" ? (
                <textarea
                  id={id}
                  name={id}
                  value={(formData[id] as string) || ""}
                  onChange={handleInputChange}
                  className={`mt-1 p-2 border rounded-md w-full text-sm focus:outline-none focus:ring-2 ${errors[id] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                  rows={3}
                  placeholder={placeholder || `Enter ${label}`}
                  required={required}
                />
              ) : type === "file" ? (
                <div className="flex flex-col items-center">
                  <label className="flex items-center justify-center gap-2 px-4 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 text-sm">
                    <UploadIcon className="text-base" />
                    <span>Choose File</span>
                    <input
                      id={id}
                      name={id}
                      type="file"
                      onChange={handleFileChange}
                      accept={accept || "*/*"}
                      className="hidden"
                      required={required}
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
              ) : type === "dropdown" && options ? (
                <Dropdown
                  items={options}
                  onSelect={(value) => handleDropdownSelect(id, value)}
                  selectedValue={dropdownValues[id] || null}
                  required={required}
                />
              ) : type === "date" ? (
                <YearMonthDatePicker
                  onChange={(date) => handleDateChange(date, id)}
                />
              ) : (
                <div className="relative">
                  <input
                    id={id}
                    name={id}
                    type={type === "password" ? (isPasswordVisible ? "text" : "password") : type}
                    value={(formData[id] as string) || ""}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${errors[id] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                    placeholder={placeholder || `${label}`}
                    required={required}
                  />
                  {type === "password" && (
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-400 focus:outline-none"
                    >
                      {isPasswordVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                    </button>
                  )}
                </div>
              )}
              {errors[id] && <span className="text-red-500 text-xs">{errors[id]}</span>}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end w-full sm:w-auto col-span-2">
        <button
          type="submit"
          className="px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none w-full sm:w-auto text-sm"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
