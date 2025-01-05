import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, EyeFilledIcon, EyeSlashFilledIcon } from "../icons/icon";
import OtpInput from "../ui/OtpInput";
import { useToast } from "../ui/ToastContext";

const RecoverPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setToast } = useToast();

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || !password) {
      setToast("Please fill in all fields.", "warning");
      return;
    }
  
    setToast("Password successfully reset", "success");
    setTimeout(() => {
      navigate("/login", {
        state: { passwordUpdated: true },
      });
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[100vh] max-w-xs p-6">
        <div onClick={() => navigate("/login")} className="text-gray-500 cursor-pointer mb-6 flex items-center">
          <ArrowLeft />
          <span className="ml-2 text-sm">Back to Login</span>
        </div>
        <div className="text-center flex flex-col items-center justify-center mb-10">
          <h2 className="text-2xl font-bold ">{step === 1 ? "Recover Password" : "Email Verification"}</h2>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmitEmail} className="w-full flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Send Code
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitNewPassword} className="w-full flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Verification Code</label>
              <OtpInput
                length={6}
                value={verificationCode}
                onChange={setVerificationCode}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-400 focus:outline-none"
                >
                  {isPasswordVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Password  reset
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecoverPassword;
