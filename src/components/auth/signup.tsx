import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, EyeFilledIcon, EyeSlashFilledIcon } from "./icon";
import OtpInput from "../ui/OtpInput";
import { useToast } from "../ui/ToastContext";

const Signup: React.FC = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const navigate = useNavigate();
    const { setToast } = useToast();

    const handleSubmitEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
        setToast("Verification code sent to your email", "info");
    };

    const handleSubmitVerification = (e: React.FormEvent) => {
        e.preventDefault();
        if (!verificationCode) {
            setToast("Please enter the verification code.", "warning");
            return;
        }

        setToast("Registration completed successfully", "success");
        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, "");
        setUsername(value);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[100vh] max-w-xs p-6 ">

                <div onClick={() => navigate("/login")} className="text-gray-500 cursor-pointer mb-6 flex items-center">
                    <ArrowLeft />
                    <span className="ml-2 text-sm">Back to Login</span>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold">{step === 1 ? "Sign Up" : "Email Verification"}</h2>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleSubmitEmail} className="w-full flex flex-col gap-4">
                        <div className="relative text-center text-sm my-2 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-300">
                            <span className="relative z-10 bg-white px-2 text-gray-500">
                                Register an account to enjoy all the features and continue using the app. It's quick and easy!
                            </span>
                        </div>

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

                        <div>
                            <label className="block text-sm font-medium">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                placeholder="Enter your username"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                pattern="^[^\s]+$"
                                title="Username cannot contain spaces"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
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
                            Register
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitVerification} className="w-full flex flex-col gap-6">
                        <div className="mt-4 text-sm text-gray-600">
                            <p className="text-lg font-medium text-gray-800">We've sent a verification code to your email.</p>
                            <p className="text-lg font-bold text-blue-600">{email}</p>
                            <p className="text-sm text-gray-500 mt-2">Check your inbox (and spam folder) to continue.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Enter the Verification Code</label>
                            <OtpInput
                                length={6}
                                value={verificationCode}
                                onChange={setVerificationCode}
                            />
                            <p className="text-xs text-gray-500 mt-2">Enter the code sent to your email.</p>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Complete Registration
                        </button>
                    </form>

                )}
            </div>
        </div>
    );
};

export default Signup;
