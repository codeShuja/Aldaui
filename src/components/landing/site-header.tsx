import { useState, useEffect } from "react";
import { AldauiIcon, GitHubIcon, SearchIcon } from "../icons/icon";
import { Button } from "../ui/button";
import { MainNav } from "./main-nav";
import { ModeToggle } from "./mode-toggle";
import { SearchBar } from "./SearchBar";
import { Link } from "react-router-dom";

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const handleCloseSearch = () => {
    setSearchOpen(false);
  };

  return (
    <header className="sm:py-2 px-4 py-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center dark:bg-surface-dark">
      <div className="container flex h-14 items-center">
        <div className="flex items-center mr-2">
          <Link to="/" className="h-14 w-14">
            <AldauiIcon className="h-14 w-14 text-primary" />
          </Link>
        </div>
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button
              variant="outline"
              className="inline-flex items-center whitespace-nowrap"
              size="sm"
              onClick={handleSearchToggle}
            >
              <SearchIcon className="mr-2 h-4 w-4" />
              Search docs...
              <kbd className="ml-4 dark:border-transparent pointer-events-none hidden h-5 select-none items-center gap-1 rounded border sm:flex">
                <span className="text-xs ">⌘</span>K
              </kbd>
            </Button>
          </div>
          <div className="flex">
            <Button size="sm" variant="outline">
              <a href="https://github.com/Gutierrez-16/Aldaui">
                <GitHubIcon className="h-6 w-6" />
              </a>
            </Button>
          </div>

          <ModeToggle />
        </div>

      </div>

      <SearchBar isOpen={searchOpen} onClose={handleCloseSearch} />
    </header>
  );
}
