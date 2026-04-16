import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  useMatches,
} from "react-router";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { DataProvider } from "./contexts/dataContext";
import { NotFoundPage } from "./components/not-found";
import "./index.scss";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap",
  },
  { rel: "icon", href: "/favicon.ico" },
];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const matches = useMatches();
  const isPluginPage = matches.some((m) => m.handle?.layout === "plugin");

  if (isPluginPage) {
    return <Outlet />;
  }

  return (
    <DataProvider>
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <Analytics />
      <SpeedInsights />
      <Footer />
    </DataProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <NotFoundPage />;
  }

  return (
    <div className="error-container" style={{ padding: "60px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "16px" }}>Something went wrong</h1>
      <pre style={{ opacity: 0.6, fontSize: "0.9rem" }}>
        {error?.message ?? "Unknown error"}
      </pre>
    </div>
  );
}
