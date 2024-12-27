import React, { createContext, useContext, useState } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastContextType {
  showToast: boolean;
  toastMessage: string;
  toastType: ToastType;
  setToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("success");

  const setToast = (message: string, type: ToastType) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const hideToast = () => setShowToast(false);

  return (
    <ToastContext.Provider value={{ showToast, toastMessage, toastType, setToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};
