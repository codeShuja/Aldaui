import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  useEffect(() => {
    const handleResize = () => {
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prevState => !prevState)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        toggleSidebar={toggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
      />

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
  )
}

export default Dashboard
