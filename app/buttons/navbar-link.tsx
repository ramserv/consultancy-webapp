import { Link } from "react-router";

type NavBarLinkProps = {
  redirectTo: string;
  text: string;
};

export default function NavBarLink({ redirectTo, text }: NavBarLinkProps) {
  return (
    <Link
      to={redirectTo}
      className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
    >
      {text}
    </Link>
  );
}
