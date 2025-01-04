import React, { useState } from 'react';
import UserMenu from './UserMenu';
import { Link, useLocation } from 'react-router-dom'; 
import { 
  BriefcaseIcon, ChevronDownIcon, ChevronRightIcon, FileTextIcon, 
  HelpCircleIcon, HomeIcon, PackageIcon, SalesIcon, SettingsIcon, 
  TrendingUpIcon, TruckIcon, UsersIcon 
} from './icon/icon';

interface SidebarProps {
  isSidebarCollapsed: boolean;
}

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path: string;
  subItems?: { title: string; path: string }[]; 
}

const Sidebar = ({ isSidebarCollapsed }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: HomeIcon,
      path: '',
    },
    {
      title: 'Products',
      icon: PackageIcon,
      path: '',
      subItems: [
        { title: 'Add Product', path: '/products/add' },
        { title: 'View Products', path: '/products/view' },
        { title: 'Categories', path: '/products/categories' }
      ]
    },
    {
      title: 'Reports',
      icon: FileTextIcon,
      path: '',
      subItems: [
        { title: 'Sales', path: '/reports/sales' },
        { title: 'Inventory', path: '/reports/inventory' },
        { title: 'Finance', path: '/reports/finance' }
      ]
    },
    {
      title: 'Sales',
      icon: SalesIcon,
      path: '',
      subItems: [
        { title: 'Orders', path: '/sales/orders' },
        { title: 'Invoices', path: '/sales/invoices' },
        { title: 'Returns', path: '/sales/returns' }
      ]
    },
    {
      title: 'Customers',
      icon: UsersIcon,
      path: '',
    },
    {
      title: 'Brand',
      icon: BriefcaseIcon,
      path: '',
    },
    {
      title: 'Supplier',
      icon: TruckIcon,
      path: '',
    },
    {
      title: 'Marketing',
      icon: TrendingUpIcon,
      path: '',
      subItems: [
        { title: 'Campaigns', path: '/marketing/campaigns' },
        { title: 'Discounts', path: '/marketing/discounts' },
        { title: 'Analysis', path: '/marketing/analysis' }
      ]
    },
    {
      title: 'Settings',
      icon: SettingsIcon,
      path: '',
    },
    {
      title: 'Support',
      icon: HelpCircleIcon,
      path: '',
    }
  ];

  const userName = "Shujaa";
  const userEmail = "shujaa@example.com";

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {isSidebarCollapsed ? null : (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setExpandedItems({})}
        />
      )}

      <aside className={` 
        fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r 
        transition-all duration-300 z-40
        ${isSidebarCollapsed ? '-translate-x-full md:translate-x-0 md:w-20' : 'translate-x-0 w-64'}
        md:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          <div className="flex-1 py-4 overflow-y-auto scrollbar-hide">
            {menuItems.map((item, index) => (
              <div key={index} className="px-3 mb-2">
                <Link to={item.path}>
                  <button 
                    onClick={() => item.subItems && toggleExpand(item.title)}
                    className={`
                      flex items-center w-full px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100
                      ${isSidebarCollapsed ? 'md:justify-center' : ''}  
                      ${isActive(item.path) ? 'bg-gray-200 text-blue-600' : ''}
                    `}
                  >
                    <item.icon className="w-5 h-5 min-w-[1.25rem]" />
                    <span className={`ml-3 ${isSidebarCollapsed ? 'md:hidden' : ''}`}>
                      {item.title}
                    </span>
                    {item.subItems && !isSidebarCollapsed && (
                      expandedItems[item.title] ? (
                        <ChevronDownIcon className="w-4 h-4 ml-auto" />
                      ) : (
                        <ChevronRightIcon className="w-4 h-4 ml-auto" />
                      )
                    )}
                  </button>
                </Link>

                {item.subItems && !isSidebarCollapsed && expandedItems[item.title] && (
                  <div className="ml-11 mt-1 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link key={subIndex} to={subItem.path}>
                        <button 
                          className={`block w-full px-3 py-1 text-sm text-gray-600 rounded-lg hover:bg-gray-100 
                            ${isActive(subItem.path) ? 'bg-gray-200 text-blue-600' : ''}`}
                        >
                          {subItem.title}
                        </button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <UserMenu 
              userName={userName}
              userEmail={userEmail}
              isCollapsed={isSidebarCollapsed}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
