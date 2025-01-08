import { useState } from 'react'
import { ActiveIcon, CopyIcon } from '../../../icons/icon'

export function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <button
      onClick={copyToClipboard}
      className="absolute top-2 right-2 p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors"
      aria-label={isCopied ? "Copied!" : "Copy code"}
    >
      {isCopied ? (
        <ActiveIcon className="w-4 h-4" />
      ) : (
        <CopyIcon className="w-4 h-4" />
      )}
    </button>
  )
}

