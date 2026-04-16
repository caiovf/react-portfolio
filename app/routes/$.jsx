import { NotFoundPage } from "../components/not-found";

export function meta() {
  return [
    { title: "404 – Page Not Found | Caio Ferreira Front End Developer" },
    { name: "description", content: "This page doesn't exist." },
  ];
}

export default function CatchAll() {
  return <NotFoundPage />;
}
