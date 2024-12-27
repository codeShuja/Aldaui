import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info" | "warning"; 
  duration?: number; 
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500 border-green-600 text-white";
      case "error":
        return "bg-red-500 border-red-600 text-white";
      case "info":
        return "bg-blue-500 border-blue-600 text-white";
      case "warning":
        return "bg-yellow-500 border-yellow-600 text-black";
      default:
        return "bg-gray-500 border-gray-600 text-white";
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${getToastStyles()} border-l-4`}
      role="alert"
    >
      <span>{message}</span>
    </div>
  );
};

export default Toast;
