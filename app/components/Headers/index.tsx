import { Link } from "react-router";
import LogoIcon from "../../images/logo/rsc_logo.png";
import DarkModeSwitcher from "./DarkModeSwitcher";
import NavBarLink from "~/buttons/navbar-link";
import NavBarButton from "~/buttons/navbar-button";

export default function Headers() {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
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

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <NavBarLink redirectTo="/services" text="Services" />
            <NavBarLink redirectTo="/about" text="About" />
            <NavBarButton redirectTo="/contact-us" text="Contact Us" />
            <DarkModeSwitcher />
          </ul>
        </div>
      </div>
    </header>
  );
}
