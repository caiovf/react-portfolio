import { Link, useOutletContext } from "react-router";
import { motion } from "motion/react";
import {
  BookOpen,
  Download,
  Settings,
  Zap,
  Globe,
  ChevronRight,
  Terminal,
  Package,
  RefreshCw,
} from "lucide-react";

// ─────────────────────────────────────────────
// Estrutura da documentação
// ─────────────────────────────────────────────
const sections = [
  {
    id: "installation",
    icon: <Package />,
    title: "Instalação",
    description: "Como instalar e ativar o VoxAI no seu WordPress.",
    steps: [
      { label: "Faça o download do arquivo .zip do plugin." },
      { label: 'Acesse o painel do WordPress → Plugins → "Adicionar novo".' },
      { label: 'Clique em "Carregar plugin" e selecione o arquivo .zip.' },
      { label: 'Clique em "Instalar agora" e depois em "Ativar".' },
    ],
  },
  {
    id: "configuration",
    icon: <Settings />,
    title: "Configuração",
    description: "Defina sua API Key e personalize o comportamento do plugin.",
    steps: [
      { label: 'Acesse WordPress → Configurações → "VoxAI Settings".' },
      { label: "Cole a sua chave de API da OpenAI no campo indicado." },
      { label: "Escolha a voz padrão (Alloy, Echo, Fable, Onyx, Nova ou Shimmer)." },
      { label: 'Clique em "Salvar Configurações".' },
    ],
  },
  {
    id: "usage",
    icon: <Zap />,
    title: "Uso no Editor",
    description: "Gere áudio e resumos diretamente no editor de posts.",
    steps: [
      { label: "Abra ou crie um post no WordPress." },
      { label: 'Na barra lateral, localize o painel "VoxAI".' },
      { label: 'Clique em "Gerar Áudio" para criar a narração do post.' },
      { label: 'Clique em "Gerar Resumo" para criar o TL;DR inteligente.' },
      { label: "Salve o post — o player e o resumo aparecem automaticamente no frontend." },
    ],
  },
  {
    id: "shortcodes",
    icon: <Terminal />,
    title: "Shortcodes",
    description: "Insira o player e o resumo em qualquer lugar do seu tema.",
    codes: [
      { code: "[wp_ai_reader]",  desc: "Renderiza o player de áudio completo." },
      { code: "[wp_ai_summary]", desc: "Exibe apenas o resumo inteligente gerado." },
      { code: "[wp_ai_audio]",   desc: "Link direto para download do MP3 gerado." },
    ],
  },
  {
    id: "update",
    icon: <RefreshCw />,
    title: "Atualizações",
    description: "Mantenha o plugin sempre atualizado.",
    steps: [
      { label: "Novas versões são anunciadas na newsletter e no repositório GitHub." },
      { label: "Para atualizar: desative o plugin, instale a nova versão e reative." },
      { label: "Suas configurações e áudios gerados são preservados entre versões." },
    ],
  },
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
            <ChevronRight style={{ width: 14, height: 14, opacity: .4 }} />
            <span>Documentation</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5 }}
          >
            <div className="vox-subpage__icon">
              <BookOpen style={{ width: 28, height: 28, color: "#ba9eff" }} />
            </div>
            <h1 className="vox-subpage__title">Documentation</h1>
            <p className="vox-subpage__desc">
              Tudo o que você precisa para instalar, configurar e usar o{" "}
              <strong>{project.title}</strong> no seu WordPress.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Content */}
      <div className="vox-container vox-subpage__body">
        <aside className="vox-subpage__sidebar">
          <nav className="vox-doc-nav">
            <p className="vox-doc-nav__title">Nesta página</p>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="vox-doc-nav__link">
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className="vox-subpage__content">
          {sections.map((section, idx) => (
            <motion.section
              key={section.id}
              id={section.id}
              className="vox-doc-section"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="vox-doc-section__header">
                <span className="vox-doc-section__icon">{section.icon}</span>
                <h2 className="vox-doc-section__title">{section.title}</h2>
              </div>
              <p className="vox-doc-section__desc">{section.description}</p>

              {/* Steps */}
              {section.steps && (
                <ol className="vox-doc-steps">
                  {section.steps.map((step, i) => (
                    <li key={i} className="vox-doc-steps__item">
                      <span className="vox-doc-steps__num">{i + 1}</span>
                      <span>{step.label}</span>
                    </li>
                  ))}
                </ol>
              )}

              {/* Code rows */}
              {section.codes && (
                <div className="vox-doc-codes">
                  {section.codes.map((c) => (
                    <div key={c.code} className="vox-doc-code-row">
                      <span className="shortcode">{c.code}</span>
                      <span className="vox-doc-code-row__desc">{c.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
