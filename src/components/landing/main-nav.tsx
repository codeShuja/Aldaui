import { Link } from "react-router-dom";

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block text-primary text-xl">
          Aldaui
        </span>
      </Link>

      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          to="/"
          className="transition-colors text-text dark:text-white hover:text-primary hover:underline"
        >
          Documentation
        </Link>
        <Link
          to="/"
          className="transition-colors text-text dark:text-white hover:text-primary hover:underline"
        >
          Components
        </Link>
        <Link
          to="/"
          className="transition-colors text-text dark:text-white hover:text-primary hover:underline"
        >
          Examples
        </Link>
      </nav>
    </div>
  );
}
