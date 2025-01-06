import { useState } from "react";
import { Link } from "react-router";
import LogoIcon from "../images/logo/rsc_logo.png";
import NavBarLink from "~/buttons/navbar-link";
import NavBarButton from "~/buttons/navbar-button";
import DarkModeSwitcher from "~/components/Headers/DarkModeSwitcher";

export default function Headers() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu

  return (
    <header className="sticky top-0 z-50 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link className="block flex-shrink-0" to="/">
            <div className="w-32">
              <img
                src={LogoIcon}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Hamburger Menu - Visible only on smaller screens */}
        <button
          className="block md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-white dark:bg-boxdark shadow-lg md:static md:block md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-0">
            <NavBarLink redirectTo="/services" text="Services" />
            <NavBarLink redirectTo="/about" text="About" />
            <NavBarButton redirectTo="/contact-us" text="Contact Us" />
            <DarkModeSwitcher />
          </ul>
        </nav>
      </div>
    </header>
  );
}
