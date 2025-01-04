import React from 'react'

interface AvatarProps {
  name: string
  imageSrc?: string
  size?: 'sm' | 'md' | 'lg'
}

const Avatar: React.FC<AvatarProps> = ({ name, imageSrc, size = 'md' }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  }

  const colorClasses = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
  ]

  const colorClass = colorClasses[name.length % colorClasses.length]

  return (
    <div className={`relative inline-flex items-center justify-center rounded-full ${sizeClasses[size]}`}>
      {imageSrc ? (
        <img src={imageSrc} alt={name} className="w-full h-full object-cover rounded-full" />
      ) : (
        <div className={`flex items-center justify-center w-full h-full rounded-full ${colorClass}`}>
          <span className="font-medium text-white">{initials}</span>
        </div>
      )}
    </div>
  )
}

export default Avatar

