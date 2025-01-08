interface CodeBlockProps {
    children: string
  }
  
  export function CodeBlock({ children }: CodeBlockProps) {
    return (
      <pre className="overflow-x-auto p-4">
        <code className="text-sm text-muted-foreground">{children}</code>
      </pre>
    )
  }
  
  