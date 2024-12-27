import React from "react";
import { useToast } from "./ToastContext"; 
import Toast from "./Toast"; 

const ToastContainer: React.FC = () => {
  const { showToast, toastMessage, toastType, hideToast } = useToast();

  if (!showToast) {
    return null;
  }

  return (
    <Toast
      message={toastMessage}
      type={toastType}
      onClose={hideToast}
    />
  );
};

export default ToastContainer;
