import { useState } from "react";
import Sidebar from "../../Sidebar";
import { SiteHeader } from "../site-header";
import {
  FileTextIcon,
  HomeIcon,
  PackageIcon,
  SalesIcon,
  SettingsIcon,
  UsersIcon,
} from "../../icons/icon";

const menuItems = [
  { title: 'Dashboard', icon: HomeIcon, path: '' },
  {
    title: 'Products', icon: PackageIcon, path: '', subItems: [
      { title: 'Add Product', path: '/products/add' },
      { title: 'View Products', path: '/products/view' },
      { title: 'Categories', path: '/products/categories' }
    ]
  },
  {
    title: 'Reports', icon: FileTextIcon, path: '', subItems: [
      { title: 'Sales', path: '/reports/sales' },
      { title: 'Inventory', path: '/reports/inventory' },
      { title: 'Finance', path: '/reports/finance' }
    ]
  },
  {
    title: 'Sales', icon: SalesIcon, path: '', subItems: [
      { title: 'Orders', path: '/sales/orders' },
      { title: 'Invoices', path: '/sales/invoices' },
      { title: 'Returns', path: '/sales/returns' }
    ]
  },
  { title: 'Customers', icon: UsersIcon, path: '' },
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
          <div className="flex flex-col gap-4 p-4 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="aspect-video rounded-xl bg-gray-500" />
              <div className="aspect-video rounded-xl bg-gray-200" />
              <div className="aspect-video rounded-xl bg-gray-200" />
            </div>

            <div className="flex-1 min-h-[100vh] rounded-xl bg-gray-200">
            </div>
          </div>
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
