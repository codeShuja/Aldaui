import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import UserMenu from '../../components/UserMenu';
import { 
  BriefcaseIcon, FileTextIcon, HomeIcon, PackageIcon, SalesIcon, 
  SettingsIcon, TrendingUpIcon, TruckIcon, UsersIcon, HelpCircleIcon 
} from '../../components/icons/icon';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize); 

    return () => window.removeEventListener('resize', handleResize); 
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

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
    { title: 'Brand', icon: BriefcaseIcon, path: '' },
    { title: 'Supplier', icon: TruckIcon, path: '' },
    {
      title: 'Marketing', icon: TrendingUpIcon, path: '', subItems: [
        { title: 'Campaigns', path: '/marketing/campaigns' },
        { title: 'Discounts', path: '/marketing/discounts' },
        { title: 'Analysis', path: '/marketing/analysis' }
      ]
    },
    { title: 'Settings', icon: SettingsIcon, path: '' },
    { title: 'Support', icon: HelpCircleIcon, path: '' }
  ];

  const userName = "Shujaa";
  const userEmail = "shujaa@example.com";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />

      <Sidebar isSidebarCollapsed={isSidebarCollapsed} menuItems={menuItems}>
        <div className="border-t">
          <UserMenu userName={userName} userEmail={userEmail} isCollapsed={isSidebarCollapsed} />
        </div>
      </Sidebar>

      <main className={`pt-16 transition-all duration-300 ${isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'}`}>
        <div className="flex flex-1 flex-col gap-4 p-4 h-screen">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-gray-200" />
            <div className="aspect-video rounded-xl bg-gray-200" />
            <div className="aspect-video rounded-xl bg-gray-200" />
          </div>

          <div className="min-h-[100vh] flex-1 rounded-xl bg-gray-200 md:min-h-[100vh]">
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
