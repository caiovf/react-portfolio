import { Link, useOutletContext } from "react-router";
import { motion } from "motion/react";
import {
  BookOpen,
  Settings,
  Zap,
  Globe,
  ChevronRight,
  Terminal,
  Package,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

// ─────────────────────────────────────────────
// Dados extraídos do DOCUMENTATION.md
// ─────────────────────────────────────────────

const configRows = [
  { field: "API Key",            desc: "OpenAI API Key (required)",                                                          default: "—" },
  { field: "Summary Model",      desc: "GPT model for generating summaries",                                                 default: "gpt-4o-mini" },
  { field: "Summary Length",     desc: "Character limit for the generated summary",                                          default: "350" },
  { field: "Default Voice (TTS)",desc: "Narration voice: Alloy, Echo, Fable, Onyx, Nova, Shimmer",                           default: "alloy" },
  { field: "TTS Model",          desc: "Audio quality: tts-1 (fast) or tts-1-hd (high quality)",                             default: "tts-1" },
  { field: "Widget Position",    desc: "before_content, after_content or disabled (manual shortcode)",                       default: "before_content" },
  { field: "Read Title",         desc: "Include the post title in the narrated introduction",                                default: "Enabled" },
  { field: "Read Author",        desc: "Include the post author in the narrated introduction",                               default: "Disabled" },
  { field: "Read Date",          desc: "Include the publish date in the narrated introduction",                              default: "Disabled" },
  { field: "Post Types",         desc: "Post types where the widget will be displayed",                                      default: "post" },
];

const faqItems = [
  {
    q: "Why do I need an API key?",
    a: "VoxAI is a plugin, not a middleman service. By using your own API key, you bypass the expensive monthly markups charged by other SaaS tools. You pay the raw, wholesale price directly for the processing.",
  },
  {
    q: "How much does audio cost?",
    a: "Because you pay directly via your API, the costs are incredibly low—often just a few pennies per full-length article. You are never charged per minute or per word by VoxAI.",
  },
  {
    q: "Does it slow down my site?",
    a: "No. The audio files are generated once and served efficiently. The player itself is lightweight and designed to have zero negative impact on your Core Web Vitals.",
  },
  {
    q: "Does it work with any theme?",
    a: "Yes. VoxAI is designed to be theme-agnostic. The audio player inherits a clean, modern styling that looks great out of the box on any WordPress theme or page builder.",
  },
  {
    q: "Can I automate audio generation?",
    a: "Absolutely. You can configure VoxAI to automatically generate and embed audio the moment you hit 'Publish' on a new post, making it entirely hands-off.",
  },
];

const changelogItems = [
  "🎉 Initial public release.",
  "Summary generation via OpenAI GPT-4o Mini.",
  "TTS audio player via OpenAI (6 voices).",
  "Reading time estimator with i18n support.",
  "Full support for Gutenberg sidebar panel.",
  "Support for Classic Editor metabox.",
  "Configurable widget position (before/after content / shortcode).",
  "Shortcodes: [voxaiau_tts], [voxaiau_summary].",
  "AJAX generation with real-time status polling.",
  "Display of estimated API cost per post.",
  "Full EN/PT-BR translation.",
  "Compatibility: PHP 7.4+ and WordPress 6.0+.",
];

// ─────────────────────────────────────────────
// Navegação lateral
// ─────────────────────────────────────────────
const navLinks = [
  { id: "installation",   label: "Installation" },
  { id: "configuration",  label: "Configuration" },
  { id: "usage",          label: "Editor Usage" },
  { id: "shortcodes",     label: "Shortcodes" },
  { id: "privacy",        label: "Privacy" },
  { id: "faq",            label: "FAQ" },
  { id: "changelog",      label: "Changelog" },
];

export default function Documentation() {
  const { project, slug } = useOutletContext();

  return (
    <div className="vox-subpage">
      {/* ── Page header */}
      <div className="vox-subpage__hero vox-section--dark">
        <div className="vox-container">
          {/* Breadcrumb */}
          <div className="vox-breadcrumb">
            <Link to={`/plugins/${slug}`}>{project.title}</Link>
            <ChevronRight style={{ width: 14, height: 14, opacity: 0.4 }} />
            <span>Documentation</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="vox-subpage__icon">
              <BookOpen style={{ width: 28, height: 28, color: "#ba9eff" }} />
            </div>
            <h1 className="vox-subpage__title">Documentation</h1>
            <p className="vox-subpage__desc">
              Everything you need to install, configure, and use{" "}
              <strong>{project.title}</strong> on your WordPress site.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Content */}
      <div className="vox-container vox-subpage__body">
        <aside className="vox-subpage__sidebar">
          <nav className="vox-doc-nav">
            <p className="vox-doc-nav__title">On this page</p>
            {navLinks.map((l) => (
              <a 
                key={l.id} 
                href={`#${l.id}`} 
                className="vox-doc-nav__link"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(l.id);
                  if (element) {
                    const y = element.getBoundingClientRect().top + window.scrollY - 90;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                    window.history.pushState(null, '', `#${l.id}`);
                  }
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="vox-subpage__content">

          {/* ── 1. Instalação */}
          <motion.section
            id="installation"
            className="vox-doc-section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <div className="vox-doc-section__header">
              <span className="vox-doc-section__icon"><Package /></span>
              <h2 className="vox-doc-section__title">Installation</h2>
            </div>
            <p className="vox-doc-section__desc">
              How to install and activate VoxAI on your WordPress site.
            </p>

            <p className="vox-doc-section__subtitle">Automatic Installation (Recommended)</p>
            <ol className="vox-doc-steps">
              {[
                "Go to your WordPress dashboard → Plugins → Add New.",
                'Search for "VoxAI - AI Audio & Summary".',
                'Click "Install Now" and then "Activate".',
                "Go to Settings → AI Audio & Summary and enter your OpenAI API key.",
              ].map((step, i) => (
                <li key={i} className="vox-doc-steps__item">
                  <span className="vox-doc-steps__num">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <p className="vox-doc-section__subtitle">Manual Installation</p>
            <ol className="vox-doc-steps">
              {[
                "Download the plugin .zip file.",
                "Go to your WordPress dashboard → Plugins → Add New → Upload Plugin.",
                'Select the .zip file, click "Install Now", and then "Activate".',
                "Go to Settings → AI Audio & Summary and enter your API key.",
              ].map((step, i) => (
                <li key={i} className="vox-doc-steps__item">
                  <span className="vox-doc-steps__num">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <p className="vox-doc-section__subtitle">Getting your OpenAI API Key</p>
            <ol className="vox-doc-steps">
              {[
                "Create an account at platform.openai.com.",
                'Navigate to "API Keys" and click "Create new secret key".',
                "Copy the key and paste it into Settings → AI Audio & Summary → API Key.",
              ].map((step, i) => (
                <li key={i} className="vox-doc-steps__item">
                  <span className="vox-doc-steps__num">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </motion.section>

          {/* ── 2. Configuração */}
          <motion.section
            id="configuration"
            className="vox-doc-section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            <div className="vox-doc-section__header">
              <span className="vox-doc-section__icon"><Settings /></span>
              <h2 className="vox-doc-section__title">Configuration</h2>
            </div>
            <p className="vox-doc-section__desc">
              Go to <strong>WordPress → Settings → "VoxAI Settings"</strong> to customize the plugin's behavior.
            </p>

            <div className="vox-api-params">
              <table className="vox-api-table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Description</th>
                    <th>Default</th>
                  </tr>
                </thead>
                <tbody>
                  {configRows.map((row) => (
                    <tr key={row.field}>
                      <td><code className="vox-api-code">{row.field}</code></td>
                      <td>{row.desc}</td>
                      <td><span className="vox-api-type">{row.default}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </motion.section>

          {/* ── 3. Uso no Editor */}
          <motion.section
            id="usage"
            className="vox-doc-section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="vox-doc-section__header">
              <span className="vox-doc-section__icon"><Zap /></span>
              <h2 className="vox-doc-section__title">Editor Usage</h2>
            </div>
            <p className="vox-doc-section__desc">
              Generate audio and summaries directly in the post editor.
            </p>

            <p className="vox-doc-section__subtitle">Gutenberg (Block Editor)</p>
            <ol className="vox-doc-steps">
              {[
                "Open or create a post in WordPress.",
                'In the sidebar (right panel), locate the "VoxAI" panel.',
                'Click "Generate Audio" to create the post narration.',
                'Click "Generate Summary" to create the smart TL;DR summary.',
                "Save the post — the player and summary will automatically appear on the frontend.",
              ].map((step, i) => (
                <li key={i} className="vox-doc-steps__item">
                  <span className="vox-doc-steps__num">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <p className="vox-doc-section__subtitle">Classic Editor</p>
            <ol className="vox-doc-steps">
              {[
                "Open or create a post in WordPress.",
                "Scroll down the editor page to find the VoxAI metabox.",
                "Select the desired voice from the voice dropdown.",
                'Click "Generate Audio" or "Generate Summary" as needed.',
                "Save the post.",
              ].map((step, i) => (
                <li key={i} className="vox-doc-steps__item">
                  <span className="vox-doc-steps__num">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="vox-doc-tip">
              <strong>Note:</strong> The summary and audio are preserved even if the post is edited. Both can only be deleted manually via their respective buttons in the editor.
            </div>
          </motion.section>

          {/* ── 4. Shortcodes */}
          <motion.section
            id="shortcodes"
            className="vox-doc-section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div className="vox-doc-section__header">
              <span className="vox-doc-section__icon"><Terminal /></span>
              <h2 className="vox-doc-section__title">Shortcodes</h2>
            </div>
            <p className="vox-doc-section__desc">
              Insert the player and summary anywhere in your theme, without relying on automatic positioning.
            </p>

            <div className="vox-doc-codes">
              <div className="vox-doc-code-row">
                <span className="shortcode">[voxaiau_tts]</span>
                <span className="vox-doc-code-row__desc">Renders the complete audio player.</span>
              </div>
              <div className="vox-doc-code-row">
                <span className="shortcode">[voxaiau_summary]</span>
                <span className="vox-doc-code-row__desc">Renders only the generated smart summary.</span>
              </div>
            </div>

            <div className="vox-doc-tip">
              <strong>Tip:</strong> To use shortcodes manually, set <strong>Widget Position</strong> to{" "}
              <code className="vox-api-code">disabled</code> in the settings, avoiding duplication.
            </div>
          </motion.section>

          {/* ── 5. Privacidade */}
          <motion.section
            id="privacy"
            className="vox-doc-section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="vox-doc-section__header">
              <span className="vox-doc-section__icon"><ShieldCheck /></span>
              <h2 className="vox-doc-section__title">Privacy & External Services</h2>
            </div>
            <p className="vox-doc-section__desc">
              VoxAI sends post content to the <strong>OpenAI API</strong> only when explicitly requested
              by the editor ("Generate Audio" or "Generate Summary" button) —{" "}
              <strong>never automatically</strong>.
            </p>

            <ol className="vox-doc-steps">
              {[
                "No data is stored on the plugin's servers.",
                "The generated MP3 file is saved locally in your WordPress (wp-content/uploads/voxai/).",
                "Audio playback never triggers the OpenAI API again.",
              ].map((item, i) => (
                <li key={i} className="vox-doc-steps__item">
                  <span className="vox-doc-steps__num">{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <p className="vox-doc-section__desc" style={{ marginTop: "1rem" }}>
              <strong>Third-party services used:</strong>{" "}
              <a href="https://openai.com" target="_blank" rel="noreferrer" className="vox-doc-link">
                OpenAI API
              </a>{" "}
              —{" "}
              <a href="https://openai.com/policies/terms-of-use" target="_blank" rel="noreferrer" className="vox-doc-link">
                Terms of Use
              </a>{" "}
              ·{" "}
              <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noreferrer" className="vox-doc-link">
                Privacy Policy
              </a>
            </p>
          </motion.section>

          {/* ── 6. FAQ */}
          <motion.section
            id="faq"
            className="vox-doc-section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <div className="vox-doc-section__header">
              <span className="vox-doc-section__icon"><HelpCircle /></span>
              <h2 className="vox-doc-section__title">FAQ</h2>
            </div>
            <p className="vox-doc-section__desc">Frequently asked questions about VoxAI.</p>

            <div className="vox-doc-faq">
              {faqItems.map((item, i) => (
                <div key={i} className="vox-doc-faq__item">
                  <p className="vox-doc-faq__q">{item.q}</p>
                  <p className="vox-doc-faq__a">{item.a}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── 7. Changelog */}
          <motion.section
            id="changelog"
            className="vox-doc-section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="vox-doc-section__header">
              <span className="vox-doc-section__icon"><RefreshCw /></span>
              <h2 className="vox-doc-section__title">Updates & Changelog</h2>
            </div>
            <p className="vox-doc-section__desc">
              Keep your plugin up to date. To update: deactivate the plugin, install the new version, and reactivate.
              Your settings and generated audio files are preserved between versions.
            </p>

            <p className="vox-doc-section__subtitle">v1.0.0 — April 2026</p>
            <ul className="vox-doc-changelog">
              {changelogItems.map((item, i) => (
                <li key={i} className="vox-doc-changelog__item">{item}</li>
              ))}
            </ul>
          </motion.section>

        </div>
      </div>
    </div>
  );
}
