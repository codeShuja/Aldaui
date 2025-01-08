import { SyntaxHighlighter } from './syntax-highlighter'
import { Tabs } from './tabs'

interface PreviewCodeTabsProps {
  code: string
  children: React.ReactNode
}

export function PreviewCodeTabs({ code, children }: PreviewCodeTabsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-lg border border-gray-800 bg-gray-950">
      <div className="flex items-center px-4 py-2 bg-gray-900 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-gray-200">Usage</h2>
      </div>
      <Tabs
        items={[
          {
            label: 'Preview',
            value: 'preview',
            content: (
              <div className="min-h-[400px] flex items-center justify-center bg-gray-900 p-8">
                {children}
              </div>
            ),
          },
          {
            label: 'Code',
            value: 'code',
            content: (
              <div className="bg-gray-950 overflow-hidden">
                <SyntaxHighlighter code={code} />
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}

