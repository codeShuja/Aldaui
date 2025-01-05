import { useState, useEffect } from "react";
import { BarsIcon } from "./icons/icon";

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

const Navbar = ({ toggleSidebar, isSidebarCollapsed }: NavbarProps) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const date = now.toLocaleDateString("es-ES", {
        weekday: "long", day: "numeric", month: "long", year: "numeric"
      });

      setCurrentTime(`${hours}:${minutes}:${seconds} - ${date}`);
    };

    updateClock();

    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <span
              className={`font-semibold transition-opacity duration-300 ${
                isSidebarCollapsed } 
              }`}
            >
              Company Logo
            </span>
          </div>

          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg flex items-center justify-center"
            aria-label="Toggle Sidebar"
          >
            <BarsIcon className="h-5 w-5 transition-transform" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {currentTime}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
