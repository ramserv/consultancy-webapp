import { Link, useNavigate } from "react-router";

type NavBarButtonProps = {
  redirectTo: string;
  text: string;
  onClick?: () => void;
};

export default function NavBarButton({
  redirectTo,
  text,
  onClick,
}: NavBarButtonProps) {
  const navigate = useNavigate();
  return (
    <Link
      onClick={() => {
        onClick?.();
        navigate(redirectTo);
      }}
      to={redirectTo}
      className="w-full px-6 py-2 text-center text-white bg-ramserv rounded-md hover:bg-blue-600"
    >
      {text}
    </Link>
  );
}
