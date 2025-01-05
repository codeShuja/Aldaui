import React, { useState, useRef, useEffect } from 'react'
import Avatar from './ui/Avatar'
import { MoreVerticalIcon } from './icons/icon'

interface UserMenuProps {
  userName: string
  userEmail: string
  isCollapsed: boolean
}

const UserMenu: React.FC<UserMenuProps> = ({ userName, userEmail, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={`
    flex items-center w-full px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100
    ${isCollapsed ? 'justify-center' : ''}
  `}
      >
         <Avatar name={userName} size={isCollapsed ? 'sm' : 'md'} />

        {!isCollapsed && (
          <div className="ml-3 flex flex-col text-left w-full">
            <span className="font-semibold text-gray-700 text-sm md:text-base">{userName}</span>

            <span className="text-xs text-gray-500 md:text-sm truncate w-full">{userEmail}</span>
          </div>
        )}

        {!isCollapsed && <MoreVerticalIcon className="w-5 h-5 ml-auto" />}
      </button>


      {isOpen && !isCollapsed && (
        <div className="absolute bottom-full left-0 w-56 mb-2 bg-white rounded-md shadow-lg border border-gray-200">
          <div className="p-3 border-b border-gray-200">
            <p className="font-semibold">{userName}</p>
            <p className="text-sm text-gray-600 truncate w-full">{userEmail}</p>
          </div>

          <ul className="py-2">
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Upgrade to Pro
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Account
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Billing
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Notifications
              </a>
            </li>
          </ul>
          <div className="border-t border-gray-200 pt-2 pb-2">
            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
              Log out
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu

