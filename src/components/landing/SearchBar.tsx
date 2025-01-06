import { useState, useEffect, useRef } from 'react'
import { HistoryIcon, SearchIcon, StarIcon, XIcon } from '../icons/icon'

interface SearchItem {
  title: string
  url: string
}

const searchData = [
  { title: "Login Template", url: "/login" },
  { title: "Dashboard Template", url: "/dashboard" },
  { title: "Chart Template", url: "/chart" },
]

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

const MAX_RECENT_SEARCHES = 5

export function SearchBar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [results, setResults] = useState(searchData)
  const [recentSearches, setRecentSearches] = useState<SearchItem[]>([])
  const [favorites, setFavorites] = useState<SearchItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches')
    const savedFavorites = localStorage.getItem('favoriteSearches')

    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
    }
  }, [recentSearches])

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favoriteSearches', JSON.stringify(favorites))
    }
  }, [favorites])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const totalItems = query ? results.length : (favorites.length + recentSearches.length)
      if (totalItems === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % totalItems)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + totalItems) % totalItems)
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault()
        if (query) {
          handleSelect(results[selectedIndex])
        } else {
          const item = selectedIndex < favorites.length
            ? favorites[selectedIndex]
            : recentSearches[selectedIndex - favorites.length]
          handleSelect(item)
        }
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, results, favorites, recentSearches, query, onClose])

  useEffect(() => {
    setResults(
      searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    )
    setSelectedIndex(-1)
  }, [query])

  const handleSelect = (item: SearchItem) => {
    const newSearch = { title: item.title, url: item.url }
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.title !== item.title)
      return [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES)
    })
    window.location.href = item.url 
    onClose()
  }

  const handleRecentSearchClick = (item: SearchItem) => {
    window.location.href = item.url 
    onClose()
  }

  const toggleFavorite = (item: SearchItem) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some(f => f.title === item.title);
      let newFavorites;
      if (exists) {
        newFavorites = prevFavorites.filter(f => f.title !== item.title);
      } else {
        newFavorites = [...prevFavorites, item];
      }
      localStorage.setItem('favoriteSearches', JSON.stringify(newFavorites)); 
      return newFavorites;
    })
  }

  const isFavorite = (item: SearchItem) => {
    return favorites.some(f => f.title === item.title)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  const removeRecentSearch = (item: SearchItem) => {
    setRecentSearches(prev => prev.filter(s => s.title !== item.title))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-60">
      <div className="fixed left-1/2 top-1/4 w-full max-w-lg -translate-x-1/2 sm:px-6 sm:py-8 px-4 py-4">
        <div ref={modalRef} className="bg-white p-4 shadow-lg rounded-lg border z-70 mt-[20vh] dark:bg-black dark:text-white">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-300" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search docs..."
              className="w-full py-2 pl-10 pr-4 bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-500 dark:text-white dark:placeholder:text-gray-400"
              type="search"
            />
          </div>

          {query ? (
            results.length > 0 ? (
              <ul className="mt-4 max-h-80 overflow-auto">
                {results.map((item, index) => (
                  <li key={item.url} className="group">
                    <div className={cn(
                      "flex items-center justify-between px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                      selectedIndex === index ? "bg-blue-100 dark:bg-blue-900" : ""
                    )}>
                      <a
                        href={item.url}
                        onClick={(e) => {
                          e.preventDefault()
                          handleSelect(item)
                        }}
                        className="flex-1 text-sm text-gray-700 dark:text-gray-300"
                      >
                        {item.title}
                      </a>
                      <button
                        onClick={() => toggleFavorite(item)}
                        className={cn(
                          "text-black dark:text-white"
                        )}>
                        <StarIcon className="h-4 w-4" fill={isFavorite(item) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-sm text-gray-500 dark:text-gray-400">No results found.</p>
            )
          ) : (
            <>
              {favorites.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between px-4 mb-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200">Favorites</h3>
                  </div>
                  <ul className="max-h-40 overflow-auto">
                    {favorites.map((item, index) => (
                      <li key={item.url} className="group">
                        <div className={cn(
                          "flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md",
                          !query && selectedIndex === index ? "bg-blue-100 dark:bg-blue-900" : ""
                        )}>
                          <button
                            onClick={() => handleRecentSearchClick(item)}
                            className="flex-1 text-left text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                          >
                            {item.title}
                          </button>
                          <button
                            onClick={() => toggleFavorite(item)}
                            className="text-black dark:text-white"
                          >
                            <StarIcon className="h-4 w-4" fill="currentColor" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recentSearches.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between px-4 mb-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200">Recent searches</h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      Clear all
                    </button>
                  </div>
                  <ul className="max-h-40 overflow-auto">
                    {recentSearches.map((item, index) => (
                      <li key={item.url} className="group">
                        <div className={cn(
                          "flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md",
                          !query && selectedIndex === (index + favorites.length) ? "bg-blue-100 dark:bg-blue-900" : ""
                        )}>
                          <button
                            onClick={() => handleRecentSearchClick(item)}
                            className="flex-1 text-left text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                          >
                            <span className="flex items-center gap-2">
                              <HistoryIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                              {item.title}
                            </span>
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleFavorite(item)}
                              className={cn(
                                "text-black dark:text-white"
                              )}>
                              <StarIcon className="h-4 w-4" fill="currentColor" />
                            </button>
                            <button
                              onClick={() => removeRecentSearch(item)}
                              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
                            >
                              <XIcon className="h-2 w-2" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          <div className="mt-4 border-t pt-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="inline-flex gap-2">
              <kbd className="px-2 py-0.5 text-xs bg-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-200">↑↓</kbd> to navigate
            </span>
            <span className="inline-flex gap-2 ml-3">
              <kbd className="px-2 py-0.5 text-xs bg-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-200">esc</kbd> to close
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
