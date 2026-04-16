import { Outlet, Link, useLoaderData, useLocation } from "react-router";
import {
  AudioLines,
  Globe,
  Share2,
  Mail,
  Send,
  BookOpen,
  Code2,
  MessageCircle,
} from "lucide-react";
import { getAllData } from "../../utils/data";
import { GTranslate } from "../../components/gtranslate/gtranslate";
import "../../styles/plugin-single.scss";
import "../../styles/plugin-subpages.scss";


// ─────────────────────────────────────────────
// handle → root.jsx omite Header/Footer do portfólio
// ─────────────────────────────────────────────
export const handle = { layout: "plugin" };

// ─────────────────────────────────────────────
// links → fontes do design original
// ─────────────────────────────────────────────
export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800;900&family=JetBrains+Mono:wght@400&display=swap",
  },
];

// ─────────────────────────────────────────────
// Sub-páginas disponíveis por plugin
// (futuro: pode ser configurado por plugin no JSON)
// ─────────────────────────────────────────────
const subPages = [
  { name: "Features",      href: "#features",    anchorOnly: true },
  { name: "How it Works",  href: "#how-it-works", anchorOnly: true },
  { name: "Shortcodes",    href: "#shortcodes",   anchorOnly: true },
  { name: "Pricing",       href: "#pricing",      anchorOnly: true },
  { name: "FAQ",           href: "#faq",          anchorOnly: true },
];

// ─────────────────────────────────────────────
// Loader — carrega o projeto e repassa via Outlet context
// ─────────────────────────────────────────────
export async function loader({ params }) {
  const data = await getAllData();
  const project = data.projectsData.plugins?.find((p) => p.slug === params.slug);
  if (!project) throw new Response("Not Found", { status: 404 });
  return { project, slug: params.slug };
}

export function meta({ data }) {
  if (!data?.project) return [{ title: "Plugin Not Found" }];
  return [
    { title: `${data.project.title} | Caio Ferreira Front End Developer` },
    { name: "description", content: data.project.description },
  ];
}

// ─────────────────────────────────────────────
// Layout do plugin — Header + Footer + Outlet
// ─────────────────────────────────────────────
export default function PluginLayout() {
  const { project, slug } = useLoaderData();
  const location = useLocation();

  // Detecta se estamos em uma sub-página (não no index do plugin)
  const isSubPage = location.pathname !== `/plugins/${slug}` &&
                    location.pathname !== `/plugins/${slug}/`;

  return (
    <div className="vox-root">
      {/* ── Header */}
      <header className="vox-header">
        <nav className="vox-header__nav">
          {/* Logo — leva de volta ao index do plugin */}
          <Link to={`/plugins/${slug}`} className="vox-logo">
            {project.title}
          </Link>

          {/* Anchor nav — visível só na landing page, vira breadcrumb nas sub-páginas */}
          {!isSubPage ? (
            <div className="vox-header__links">
              {subPages.map((link) => (
                <a key={link.name} href={link.href} className="vox-header__link">
                  {link.name}
                </a>
              ))}
            </div>
          ) : (
            <div className="vox-header__links">
              <Link to={`/plugins/${slug}`} className="vox-header__link">
                ← Overview
              </Link>
              <Link to={`/plugins/${slug}/documentation`} className="vox-header__link vox-header__link--page">
                Documentation
              </Link>
              <Link to={`/plugins/${slug}/api-reference`} className="vox-header__link vox-header__link--page">
                API Reference
              </Link>
            </div>
          )}

          {/* Direita: Portfólio + Download */}
          <div className="vox-header__right">
            <GTranslate 
                className="" 
                style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '50px',
                    color: '#fff' 
                }} 
            />
            <Link to="/plugins" className="vox-back-btn">
              ← Portfolio
            </Link>
            <button className="vox-btn-download">Download</button>
          </div>
        </nav>
      </header>

      {/* ── Conteúdo da rota filha */}
      <main className="vox-main">
        <Outlet context={{ project, slug }} />
      </main>

      {/* ── Footer */}
      <footer className="vox-footer">
        <div className="vox-container vox-footer__grid">
          <div className="vox-footer__col">
            <div className="vox-footer__brand">{project.title}</div>
            <p className="vox-footer__text">
              The future of reading is listening. Power up your WordPress with elite AI.
            </p>
            <div className="vox-footer__socials">
              <Globe className="vox-footer__social-icon" />
              <Share2 className="vox-footer__social-icon" />
              <Mail className="vox-footer__social-icon" />
            </div>
          </div>

          <div className="vox-footer__col">
            <h5 className="vox-footer__col-title">Product</h5>
            <ul className="vox-footer__links">
              <li>
                <Link to={`/plugins/${slug}/documentation`}>
                  Documentation
                </Link>
              </li>
              <li>
                <Link to={`/plugins/${slug}/api-reference`}>
                  API Reference
                </Link>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
            </ul>
          </div>

          <div className="vox-footer__col">
            <h5 className="vox-footer__col-title">Legal</h5>
            <ul className="vox-footer__links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          <div className="vox-footer__col">
            <h5 className="vox-footer__col-title">Newsletter</h5>
            <p className="vox-footer__text">Receive updates on new voices and features.</p>
            <div className="vox-newsletter">
              <input
                type="email"
                placeholder="Your email"
                className="vox-newsletter__input"
                aria-label="Email newsletter"
              />
              <button className="vox-newsletter__btn" aria-label="Submit">
                <Send style={{ width: 20, height: 20 }} />
              </button>
            </div>
          </div>
        </div>

        <div className="vox-container vox-footer__bottom">
          <p>© 2024 VoxAI Intelligence. Built for WordPress.</p>
          <p>
            Developed by{" "}
            <span className="vox-footer__author">caioferreiradev</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
