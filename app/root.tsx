import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import "./css/satoshi.css";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import Headers from "./components/Headers";
import Footer from "./components/Footer";
import { ParallaxProvider } from "react-scroll-parallax";
import { LoaderProvider } from "./hooks/useLoader";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
        <title>RamServ Consultancy</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex flex-col min-h-screen">
            <Headers />
            <LoaderProvider>
              <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-screen-3xl 3xl:p-10">
                  {children}
                  <ScrollRestoration />
                  <Scripts />
                </div>
              </main>
            </LoaderProvider>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ParallaxProvider>
      <Outlet />
    </ParallaxProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
