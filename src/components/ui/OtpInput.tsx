import React from "react";

interface OtpInputProps {
  length: number;
  value: string;
  onChange: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value;

    if (/[^0-9]/.test(newValue) && newValue !== "") return;

    const otpArray = value.split("");
    otpArray[index] = newValue;
    onChange(otpArray.join(""));

    if (newValue && index < length - 1) {
      const nextField = document.getElementById(`otp-field-${index + 1}`);
      if (nextField) {
        nextField.focus();
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (value[index] !== "") {
        const otpArray = value.split("");
        otpArray[index] = "";
        onChange(otpArray.join(""));

        if (index > 0) {
          const prevField = document.getElementById(`otp-field-${index - 1}`);
          if (prevField) {
            prevField.focus();
          }
        }
      }
    } else if (e.key === "ArrowRight" && index < length - 1) {
      const nextField = document.getElementById(`otp-field-${index + 1}`);
      if (nextField) {
        nextField.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      const prevField = document.getElementById(`otp-field-${index - 1}`);
      if (prevField) {
        prevField.focus();
      }
    }
  };

  return (
    <div className="flex  justify-between">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          id={`otp-field-${index}`}
          type="text"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onFocus={handleFocus}
          onKeyDown={(e) => handleKeyDown(e, index)}
          required
          className="max-w-10 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OtpInput;
