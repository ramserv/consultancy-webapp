import { Link } from "react-router";

type NavBarButtonProps = {
  redirectTo: string;
  text: string;
};

export default function NavBarButton({ redirectTo, text }: NavBarButtonProps) {
  return (
    <Link
      to={redirectTo}
      className="w-full px-6 py-2 text-center text-white bg-ramserv rounded-md hover:bg-blue-600"
    >
      {text}
    </Link>
  );
}
