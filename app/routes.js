import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.jsx"),
  route("about", "routes/about.jsx"),
  route("portfolio", "routes/portfolio.jsx", { id: "p-list" }),
  route("portfolio/:slug", "routes/portfolio.$slug.jsx"),
  route("portfolio/category/:category", "routes/portfolio.jsx", { id: "p-cat" }),
  route("advancing-skills", "routes/portfolio.jsx", { id: "p-skills" }),
  route("plugins", "routes/plugins.jsx"),

  // Plugin pages — layout pai compartilha header/footer
  // Filhos adicionam sub-páginas (docs, api-reference, etc.)
  route("plugins/:slug", "routes/plugins/slug.layout.jsx", [
    index("routes/plugins/slug.index.jsx"),
    route("documentation",  "routes/plugins/slug.documentation.jsx"),
    route("api-reference",  "routes/plugins/slug.api-reference.jsx"),
    route("privacy",        "routes/plugins/slug.privacy.jsx"),
    route("terms",          "routes/plugins/slug.terms.jsx"),
  ]),

  route(".well-known/*", "routes/silence.jsx"),
  route("*", "routes/$.jsx"),
];
