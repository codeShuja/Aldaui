import { Outlet } from "react-router-dom"; 
import { navigation } from "../config/navigation";
import { SiteHeader } from "../../../components/landing/site-header";
import ManiSidebar from "../../../components/MainSidebar";
import { useState } from "react";

export const Components = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SiteHeader onToggleSidebar={toggleSidebar} />
      <ManiSidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        navigation={navigation}
      />
      <main className="flex-1 p-4 overflow-y-auto lg:ml-64 scrollbar-hide dark:bg-black">
        <div className="flex flex-1 flex-col gap-4 p-4 h-screen">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          </div>
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};
