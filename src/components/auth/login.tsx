import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EyeFilledIcon, EyeSlashFilledIcon, GitHubIcon, GoogleIcon } from "../icon/icon";

const Login = () => {
  const [action, setAction] = useState<string | null>(null);
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { usernameOrEmail, password };
    setAction(`submit ${JSON.stringify(data)}`);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleGoogleLogin = () => {
    setAction("Google login clicked");
  };

  const handleGitHubLogin = () => {
    setAction("GitHub login clicked");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[100vh] max-w-xs p-6">
        <div className="text-center font-normal mb-6">
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="usernameOrEmail" className="block text-sm font-semibold mb-2">
              Username or Email
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="Enter your username or email"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-400 focus:outline-none"
              >
                {isPasswordVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <label className="text-sm flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link to="/login/recover" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Iniciar Sesión
          </button>
          <div className="relative text-center text-sm my-6 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-300">
            <span className="relative z-10 bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>

          <button
            type="button"  
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <GoogleIcon className="text-xl" />
            <span className="ml-2">Login with Google</span>
          </button>

          <button
            type="button"  
            onClick={handleGitHubLogin}
            className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none mt-4"
          >
            <GitHubIcon className="text-xl text-gray-800" />
            <span className="ml-2">Login with GitHub</span>
          </button>

          {action && (
            <div className="mt-4 text-xs text-gray-500">
              Action: <code>{action}</code>
            </div>
          )}
        </form>

        <div className="text-center text-sm mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/login/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
