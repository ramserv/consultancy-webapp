import { Link } from "react-router";

type NavBarLinkProps = {
  redirectTo: string;
  text: string;
  onClick?: () => void;
};

export default function NavBarLink({
  redirectTo,
  text,
  onClick,
}: NavBarLinkProps) {
  return (
    <Link
      onClick={onClick}
      to={redirectTo}
      className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
    >
      {text}
    </Link>
  );
}
