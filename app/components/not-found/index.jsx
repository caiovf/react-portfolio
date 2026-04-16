import { Link, useRouteError, isRouteErrorResponse } from "react-router";
import "../../styles/not-found.scss";

export function NotFoundPage() {
  const error = useRouteError?.();
  const is404 = !error || (isRouteErrorResponse(error) && error.status === 404);

  return (
    <div className="not-found-page">
      <div className="container">
        <p className="not-found-code">{is404 ? "404" : "Ops"}</p>
        <h1 className="not-found-title">
          {is404 ? "Page not found" : "Something went wrong"}
        </h1>
        <p className="not-found-desc">
          {is404
            ? "The page you're looking for doesn't exist or was moved. Let's get you back on track."
            : "An unexpected error occurred. Please try again later."}
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-btn not-found-btn--primary">
            ← Go Home
          </Link>
          <Link to="/portfolio" className="not-found-btn not-found-btn--secondary">
            View Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
