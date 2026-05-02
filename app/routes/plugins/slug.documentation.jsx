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
  { field: "API Key",            desc: "Chave de API da OpenAI (obrigatória)",                                               default: "—" },
  { field: "Modelo de Resumo",   desc: "Modelo GPT para geração de resumos",                                                 default: "gpt-4o-mini" },
  { field: "Tamanho do Resumo",  desc: "Limite de caracteres do resumo gerado",                                              default: "350" },
  { field: "Voz Padrão (TTS)",   desc: "Voz de narração: Alloy, Echo, Fable, Onyx, Nova, Shimmer",                          default: "alloy" },
  { field: "Modelo TTS",         desc: "Qualidade do áudio: tts-1 (rápido) ou tts-1-hd (alta qualidade)",                   default: "tts-1" },
  { field: "Posição do Widget",  desc: "before_content, after_content ou disabled (shortcode manual)",                       default: "before_content" },
  { field: "Ler Título",         desc: "Inclui o título do post na introdução narrada",                                      default: "Ativado" },
  { field: "Ler Autor",          desc: "Inclui o autor do post na introdução narrada",                                       default: "Desativado" },
  { field: "Ler Data",           desc: "Inclui a data de publicação na introdução narrada",                                  default: "Desativado" },
  { field: "Post Types",         desc: "Tipos de post em que o widget será exibido",                                         default: "post" },
];

const faqItems = [
  {
    q: "Preciso de uma conta OpenAI?",
    a: "Sim. O plugin usa a API da OpenAI para gerar resumos e áudio. É necessário uma conta com créditos disponíveis.",
  },
  {
    q: "O conteúdo é enviado à OpenAI automaticamente?",
    a: 'Não. O conteúdo só é enviado quando você clica explicitamente em "Gerar Resumo" ou "Gerar Áudio" no editor.',
  },
  {
    q: "Quanto custa usar?",
    a: "O plugin é gratuito. Você paga diretamente à OpenAI pelo uso da API. Resumo típico (GPT-4o Mini, ~1000 palavras): menos de $0,001 USD. Áudio narrado (TTS-1, ~1000 palavras): aproximadamente $0,02–$0,04 USD.",
  },
  {
    q: "O arquivo de áudio fica no meu servidor?",
    a: "Sim. O MP3 é salvo em wp-content/uploads/voxai/YYYY/MM/ e a reprodução nunca volta a chamar a OpenAI.",
  },
  {
    q: "Funciona com Gutenberg e Classic Editor?",
    a: "Sim. O VoxAI tem suporte completo para ambos os editores.",
  },
  {
    q: "O resumo é atualizado quando edito o post?",
    a: 'Não. O resumo é preservado mesmo após edições no conteúdo. Para gerar um novo resumo, delete o existente via botão no editor e clique em "Gerar Resumo" novamente.',
  },
  {
    q: "Posso usar em tipos de post customizados (CPTs)?",
    a: "Sim. Configure os tipos de post desejados em Configurações → AI Audio & Summary → Post Types.",
  },
  {
    q: "Funciona com posts muito longos?",
    a: "Sim. Para posts grandes, o plugin usa chunking inteligente do conteúdo para o resumo. Para o áudio, o texto é segmentado em blocos e concatenados automaticamente.",
  },
];

const changelogItems = [
  "🎉 Lançamento público inicial.",
  "Geração de resumo via OpenAI GPT-4o Mini.",
  "Player de áudio TTS via OpenAI (6 vozes).",
  "Estimador de tempo de leitura com suporte a i18n.",
  "Suporte completo ao painel lateral do Gutenberg.",
  "Suporte ao metabox do Classic Editor.",
  "Posição configurável do widget (antes/depois do conteúdo / shortcode).",
  "Shortcodes: [voxaiau_tts], [voxaiau_summary].",
  "Geração AJAX com polling de status em tempo real.",
  "Exibição de custo estimado de API por post.",
  "Tradução completa para PT-BR.",
  "Compatibilidade: PHP 7.4+ e WordPress 6.0+.",
];

// ─────────────────────────────────────────────
// Navegação lateral
// ─────────────────────────────────────────────
const navLinks = [
  { id: "installation",   label: "Instalação" },
  { id: "configuration",  label: "Configuração" },
  { id: "usage",          label: "Uso no Editor" },
  { id: "shortcodes",     label: "Shortcodes" },
  { id: "privacy",        label: "Privacidade" },
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
              <h2 className="vox-doc-section__title">Instalação</h2>
            </div>
            <p className="vox-doc-section__desc">
              Como instalar e ativar o VoxAI no seu WordPress.
            </p>

            <p className="vox-doc-section__subtitle">Instalação Automática (Recomendada)</p>
            <ol className="vox-doc-steps">
              {[
                "Acesse o painel do WordPress → Plugins → Adicionar novo.",
                'Pesquise por "VoxAI - AI Audio & Summary".',
                'Clique em "Instalar agora" e depois em "Ativar".',
                "Acesse Configurações → AI Audio & Summary e insira sua chave de API da OpenAI.",
              ].map((step, i) => (
                <li key={i} className="vox-doc-steps__item">
                  <span className="vox-doc-steps__num">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <p className="vox-doc-section__subtitle">Instalação Manual</p>
            <ol className="vox-doc-steps">
              {[
                "Faça o download do arquivo .zip do plugin.",
                "Acesse o painel do WordPress → Plugins → Adicionar novo → Carregar plugin.",
                'Selecione o arquivo .zip e clique em "Instalar agora", depois em "Ativar".',
                "Acesse Configurações → AI Audio & Summary e insira sua chave de API.",
              ].map((step, i) => (
                <li key={i} className="vox-doc-steps__item">
                  <span className="vox-doc-steps__num">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <p className="vox-doc-section__subtitle">Obtendo sua chave de API OpenAI</p>
            <ol className="vox-doc-steps">
              {[
                "Crie uma conta em platform.openai.com.",
                'Navegue até "API Keys" e clique em "Create new secret key".',
                "Copie a chave e cole em Configurações → AI Audio & Summary → API Key.",
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
              <h2 className="vox-doc-section__title">Configuração</h2>
            </div>
            <p className="vox-doc-section__desc">
              Acesse <strong>WordPress → Configurações → "VoxAI Settings"</strong> para personalizar o comportamento do plugin.
            </p>

            <div className="vox-api-params">
              <table className="vox-api-table">
                <thead>
                  <tr>
                    <th>Campo</th>
                    <th>Descrição</th>
                    <th>Padrão</th>
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

            <div className="vox-doc-tip">
              <strong>Modo Sandbox:</strong> Para testar a interface sem gastar créditos da OpenAI, use a chave{" "}
              <code className="vox-api-code">MOCK_TEST_KEY_123</code>. O plugin retornará dados simulados de resumo e áudio.
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
              <h2 className="vox-doc-section__title">Uso no Editor</h2>
            </div>
            <p className="vox-doc-section__desc">
              Gere áudio e resumos diretamente no editor de posts.
            </p>

            <p className="vox-doc-section__subtitle">Gutenberg (Block Editor)</p>
            <ol className="vox-doc-steps">
              {[
                "Abra ou crie um post no WordPress.",
                'Na barra lateral (painel direito), localize o painel "VoxAI".',
                'Clique em "Gerar Áudio" para criar a narração do post.',
                'Clique em "Gerar Resumo" para criar o resumo TL;DR inteligente.',
                "Salve o post — o player e o resumo aparecerão automaticamente no frontend.",
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
                "Abra ou crie um post no WordPress.",
                "Role a página do editor até encontrar o metabox VoxAI.",
                "Selecione a voz desejada no seletor de vozes.",
                'Clique em "Gerar Áudio" ou "Gerar Resumo" conforme necessário.',
                "Salve o post.",
              ].map((step, i) => (
                <li key={i} className="vox-doc-steps__item">
                  <span className="vox-doc-steps__num">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="vox-doc-tip">
              <strong>Nota:</strong> O resumo e o áudio são preservados mesmo se o post for editado. Ambos só são deletados manualmente pelo botão correspondente no editor.
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
              Insira o player e o resumo em qualquer lugar do seu tema, sem depender da posição automática.
            </p>

            <div className="vox-doc-codes">
              <div className="vox-doc-code-row">
                <span className="shortcode">[voxaiau_tts]</span>
                <span className="vox-doc-code-row__desc">Renderiza o player de áudio completo.</span>
              </div>
              <div className="vox-doc-code-row">
                <span className="shortcode">[voxaiau_summary]</span>
                <span className="vox-doc-code-row__desc">Exibe apenas o resumo inteligente gerado.</span>
              </div>
            </div>

            <div className="vox-doc-tip">
              <strong>Dica:</strong> Para usar os shortcodes manualmente, defina <strong>Posição do Widget</strong> como{" "}
              <code className="vox-api-code">disabled</code> nas configurações, evitando duplicação.
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
              <h2 className="vox-doc-section__title">Privacidade & Serviços Externos</h2>
            </div>
            <p className="vox-doc-section__desc">
              O VoxAI envia conteúdo de posts para a <strong>API da OpenAI</strong> apenas quando solicitado
              explicitamente pelo editor (botão "Gerar Áudio" ou "Gerar Resumo") —{" "}
              <strong>nunca automaticamente</strong>.
            </p>

            <ol className="vox-doc-steps">
              {[
                "Nenhum dado é armazenado nos servidores do plugin.",
                "O arquivo MP3 gerado é salvo localmente no seu WordPress (wp-content/uploads/voxai/).",
                "A reprodução do áudio nunca aciona a API OpenAI novamente.",
              ].map((item, i) => (
                <li key={i} className="vox-doc-steps__item">
                  <span className="vox-doc-steps__num">{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <p className="vox-doc-section__desc" style={{ marginTop: "1rem" }}>
              <strong>Serviços de terceiros utilizados:</strong>{" "}
              <a href="https://openai.com" target="_blank" rel="noreferrer" className="vox-doc-link">
                OpenAI API
              </a>{" "}
              —{" "}
              <a href="https://openai.com/policies/terms-of-use" target="_blank" rel="noreferrer" className="vox-doc-link">
                Termos de Uso
              </a>{" "}
              ·{" "}
              <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noreferrer" className="vox-doc-link">
                Política de Privacidade
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
            <p className="vox-doc-section__desc">Perguntas frequentes sobre o VoxAI.</p>

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
              <h2 className="vox-doc-section__title">Atualizações & Changelog</h2>
            </div>
            <p className="vox-doc-section__desc">
              Mantenha o plugin sempre atualizado. Para atualizar: desative o plugin, instale a nova versão e reative.
              Suas configurações e áudios gerados são preservados entre versões.
            </p>

            <p className="vox-doc-section__subtitle">v1.0.0 — Abril 2026</p>
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
