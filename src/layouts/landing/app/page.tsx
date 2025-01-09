import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { SiteHeader } from "../../../components/landing/site-header";
import {
  HomeIcon,
  IconSymbol,
  LayersIcon,
  LayoutTemplateIcon,
  SettingsIcon,
  WindIcon,
} from "../../../components/icons/icon";
import { Outlet } from "react-router-dom";

const menuItems = [
  {
    title: 'Getting Started', icon: HomeIcon, path: '' , subItems: [
      { title: 'Installation', path: '/docs/installation' },
      { title: 'Configuration', path: '/docs/configuration' },
      { title: 'Playground', path: '/docs/playground' }
    ]
  },
  {
    title: 'Components', icon: LayersIcon, path: '', subItems: [
      { title: 'UI Elements', path: '/component/ui-elements' },
      { title: 'Forms', path: '/component/forms' },
      { title: 'Tables', path: '/component/tables' },
      { title: 'Buttons', path: '/component/buttons' },
    ]
  },
  {
    title: 'Tailwind', icon: WindIcon, path: '', subItems:[
      {title: 'Install' , path: '/tailwind/install'}
    ]
  },
  {
    title: 'Templates', icon: LayoutTemplateIcon, path: '', subItems: [
      { title: 'Login Template', path: '/login' },
      { title: 'Dashboard Template', path: '/dashboard' },
      { title: 'Chart Template', path: '/chart' }
    ]
  },
  { title: 'Icons', icon: IconSymbol, path: '', subItems:[
    {title: 'AldauiIcons', path: '/icons/aldauicons'}
  ] },
  { title: 'Settings', icon: SettingsIcon, path: '' },
];

export const Components = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader onToggleSidebar={toggleSidebar} />

      <div className="relative flex  justify-center">
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg sm:shadow-none h-full transform flex justify-center container ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 sm:h-auto`}
        >
          <Sidebar menuItems={menuItems} />
        </div>

        <main
          className={`container items-center flex-1 transition-all md:ml-[255px] duration-300 ${
            isSidebarOpen ? "sm:pl-64" : "sm:pl-0"
          }`}
        >
        <Outlet />

        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};
