import { CopyButton } from "../../../../components/landing/components/preview/copy-button";

export default function ConfigAldaui() {
    const codeExample1 = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`;
    const codeExample2 = `import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;`;
    const codeExample3 = `import { Route, Routes } from "react-router-dom";

import { ToastProvider } from "../components/ui/ToastContext";
import ToastContainer from "../components/ui/ToastContainer";

import { ThemeProvider } from "../lib/theme-provider";  

function AppRoutes() {
  return (
    <ThemeProvider> 
      <ToastProvider>
        <Routes>
         <Route/>
        </Routes>
        <ToastContainer />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default AppRoutes;
`;
    const codeExample4 = `import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
`;
    return (
        <div className="flex-1 px-8 py-2 dark:text-white">
            <h1 className="text-3xl font-bold mb-4">Configuration</h1>
            <p className="text-gray-600 mb-8">
                Global configuration options of the components.
            </p>
            <div className="relative my-6">
                <div className="absolute right-4 top-4">
                    <CopyButton text={codeExample1} />
                </div>
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 pt-12 font-mono text-sm overflow-x-auto">
                    {codeExample1}
                </pre>
            </div>

            <div className="text-gray-500">
                <div className="absolute right-4 top-4">

                    <CopyButton text={codeExample2} />
                </div>
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 pt-12 font-mono text-sm overflow-x-auto">
                    {codeExample2}
                </pre>
            </div>
        </div>
    );
}