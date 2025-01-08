interface PreviewProps {
    children: React.ReactNode
  }
  
  export function Preview({ children }: PreviewProps) {
    return (
      <div className="flex min-h-[350px] w-full items-center justify-center rounded-md border bg-background p-4">
        {children}
      </div>
    )
  }
  
  