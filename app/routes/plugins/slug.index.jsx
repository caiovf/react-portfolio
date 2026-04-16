import { useOutletContext } from "react-router";
import { motion } from "motion/react";
import {
  AudioLines,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Sparkles,
  Timer,
  Database,
  Blocks,
  CheckCircle2,
  Check,
  X,
} from "lucide-react";

// ─────────────────────────────────────────────
// Static data — idêntico ao App.tsx original
// ─────────────────────────────────────────────
const features = [
  {
    title: "Resumos Inteligentes",
    description: "Gere TL;DR automáticos para seus leitores economizarem tempo.",
    tag: "Processamento Central",
    footer: "Powered by GPT-4o Mini",
    icon: <Sparkles className="vox-icon-primary" />,
    colSpan: 2,
    rowSpan: 1,
  },
  {
    title: "6 Vozes Premium",
    description: "Qualidade cinematográfica para cada parágrafo.",
    tag: "Narração Humana",
    list: ["Alloy", "Echo", "Fable", "Onyx", "Nova", "Shimmer"],
    colSpan: 1,
    rowSpan: 2,
  },
  {
    title: "Tempo de Leitura",
    description: "Cálculo automático de engajamento para seus posts.",
    icon: <Timer className="vox-icon-primary" />,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Armazenamento Local",
    description: "MP3s salvos no seu servidor. Custo de API baixíssimo (< $0.001 por post).",
    icon: <Database className="vox-icon-secondary" />,
    colSpan: 2,
    rowSpan: 1,
  },
  {
    title: "Nativo WP",
    description: "Funciona com blocos ou shortcodes.",
    icon: <Blocks className="vox-icon-secondary" />,
    colSpan: 1,
    rowSpan: 1,
  },
];

const steps = [
  {
    number: "1",
    title: "Insira sua API Key",
    description: "Conecte sua conta OpenAI de forma segura nas configurações do plugin.",
  },
  {
    number: "2",
    title: "Escolha o post",
    description: "No editor de posts, selecione as opções de áudio e resumo que deseja ativar.",
  },
  {
    number: "3",
    title: "Gere instantaneamente",
    description: "O áudio e o resumo são criados na hora e exibidos no frontend para seus leitores.",
  },
];

const faqs = [
  {
    question: "Qual o custo da OpenAI?",
    answer: "O VoxAI utiliza a sua própria chave de API. No modelo GPT-4o Mini e vozes TTS, o custo é extremamente baixo, girando em torno de $0.001 por post médio.",
  },
  {
    question: "Meus dados estão seguros?",
    answer: "Sim. O VoxAI não armazena seu conteúdo em servidores externos. A comunicação ocorre diretamente entre o seu site e a API da OpenAI.",
  },
  {
    question: "Funciona com o editor Gutenberg?",
    answer: "Totalmente. O VoxAI é otimizado para o editor de blocos nativo do WordPress, mas também funciona com o Classic Editor via Shortcodes.",
  },
];

// ─────────────────────────────────────────────
// Landing page — index da rota /plugins/:slug
// ─────────────────────────────────────────────
export default function PluginIndex() {
  // Dados passados pelo layout pai via Outlet context
  useOutletContext(); // garante contexto, dados disponíveis se necessário

  return (
    <>
      {/* ── Hero Section */}
      <section className="vox-hero">
        <div className="vox-container vox-hero__grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="vox-hero__left"
          >
            <div className="vox-hero__badge">
              <span className="vox-pulse-dot" />
              <span className="vox-hero__badge-text">
                Inteligência Artificial para WordPress
              </span>
            </div>

            <h1 className="vox-hero__title">
              Dê voz ao seu conteúdo com{" "}
              <span className="vox-gradient-text">VoxAI</span>
            </h1>

            <p className="vox-hero__desc">
              Transforme posts em áudio e resumos inteligentes com apenas um clique.
              Engajamento imediato para o seu blog WordPress.
            </p>

            <div className="vox-hero__actions">
              <button className="vox-btn-primary">Ver Planos</button>
              <button className="vox-btn-ghost">Download</button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="vox-hero__right"
          >
            {/* Player Mockup */}
            <div className="vox-player glass-surface nebula-glow">
              <div className="vox-player__header">
                <div className="vox-player__icon">
                  <AudioLines style={{ color: "#000", width: 24, height: 24 }} />
                </div>
                <div>
                  <h3 className="vox-player__title">O Futuro do SEO é Auditivo</h3>
                  <p className="vox-player__subtitle">Narração por VoxAI • 2:45 min</p>
                </div>
              </div>

              <div className="vox-player__body">
                <div className="vox-progress">
                  <div className="vox-progress__fill" />
                </div>

                <div className="vox-player__controls">
                  <Shuffle className="vox-ctrl-icon" />
                  <div className="vox-player__center-controls">
                    <SkipBack className="vox-ctrl-icon vox-ctrl-icon--lg" />
                    <button className="vox-play-btn">
                      <Play style={{ fill: "currentColor", width: 24, height: 24, marginLeft: 3 }} />
                    </button>
                    <SkipForward className="vox-ctrl-icon vox-ctrl-icon--lg" />
                  </div>
                  <Volume2 className="vox-ctrl-icon vox-ctrl-icon--active" />
                </div>
              </div>
            </div>

            {/* Decorative glows */}
            <div className="vox-glow vox-glow--top-right" />
            <div className="vox-glow vox-glow--bottom-left" />
          </motion.div>
        </div>
      </section>

      {/* ── Features Bento Grid */}
      <section className="vox-features vox-section--dark" id="features">
        <div className="vox-container">
          <div className="vox-section-header">
            <h2 className="vox-section-title">Funcionalidades Inteligentes</h2>
            <p className="vox-section-desc">
              Tudo o que você precisa para tornar seu blog acessível e moderno com o poder da OpenAI.
            </p>
          </div>

          <div className="vox-bento">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-surface vox-bento-card vox-bento-card--col-${feature.colSpan} vox-bento-card--row-${feature.rowSpan}`}
              >
                <div className="vox-bento-card__top">
                  {feature.tag && (
                    <span className="vox-bento-tag">{feature.tag}</span>
                  )}
                  <h3 className="vox-bento-title">{feature.title}</h3>
                  <p className="vox-bento-desc">{feature.description}</p>

                  {feature.list && (
                    <ul className="vox-bento-list">
                      {feature.list.map((item) => (
                        <li key={item}>
                          <span className="vox-bento-dot" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="vox-bento-card__bottom">
                  {feature.footer && (
                    <span className="vox-bento-badge">{feature.footer}</span>
                  )}
                  {feature.icon}
                </div>

                <div className="vox-bento-watermark" aria-hidden="true">
                  {feature.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works */}
      <section className="vox-how" id="how-it-works">
        <div className="vox-container">
          <div className="vox-section-header">
            <h2 className="vox-section-title">Como Funciona</h2>
            <p className="vox-section-desc">Três passos simples para dar vida ao seu conteúdo.</p>
          </div>

          <div className="vox-steps">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="vox-step"
              >
                <div className="vox-step__number">{step.number}</div>
                <h3 className="vox-step__title">{step.title}</h3>
                <p className="vox-step__desc">{step.description}</p>
              </motion.div>
            ))}
            <div className="vox-steps__line" />
          </div>
        </div>
      </section>

      {/* ── Shortcodes */}
      <section className="vox-shortcodes vox-section--dark" id="shortcodes">
        <div className="vox-container vox-shortcodes__grid">
          <div className="vox-shortcodes__text">
            <h2 className="vox-shortcodes__title">Flexibilidade Total com Shortcodes</h2>
            <p className="vox-shortcodes__desc">
              Integre as funcionalidades do VoxAI em qualquer lugar do seu tema WordPress.
              Seja no topo do post, na sidebar ou em páginas personalizadas.
            </p>
            <div className="vox-checklist">
              {[
                "Compatível com Elementor e Divi",
                "Estilização via CSS customizado",
                "Suporte a Gutenberg nativo",
              ].map((item) => (
                <div key={item} className="vox-checklist__item">
                  <CheckCircle2 style={{ color: "#ba9eff", width: 20, height: 20, flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="vox-shortcodes__code">
            <div className="code-block">
              <div className="vox-code-dots">
                <div className="vox-code-dot vox-code-dot--red" />
                <div className="vox-code-dot vox-code-dot--yellow" />
                <div className="vox-code-dot vox-code-dot--green" />
                <span className="vox-code-filename">wordpress-shortcodes.php</span>
              </div>

              <div className="vox-code-entries">
                <div>
                  <span className="comment">// Renderiza o player completo</span>
                  <div className="vox-code-row">
                    <span className="shortcode">[wp_ai_reader]</span>
                  </div>
                </div>
                <div>
                  <span className="comment">// Exibe apenas o resumo inteligente</span>
                  <div className="vox-code-row">
                    <span className="shortcode">[wp_ai_summary]</span>
                  </div>
                </div>
                <div>
                  <span className="comment">// Download direto do áudio gerado</span>
                  <div className="vox-code-row">
                    <span className="shortcode">[wp_ai_audio]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing */}
      <section className="vox-pricing" id="pricing">
        <div className="vox-container vox-pricing__inner">
          <div className="vox-section-header">
            <h2 className="vox-section-title">Planos e Preços</h2>
            <p className="vox-section-desc">Escolha o nível de inteligência ideal para o seu projeto.</p>
          </div>

          <div className="vox-pricing__grid">
            {/* Free */}
            <div className="vox-plan">
              <div className="vox-plan__header">
                <h3 className="vox-plan__name">Free</h3>
                <div className="vox-plan__price">
                  R$ 0<span className="vox-plan__cycle">/mês</span>
                </div>
                <p className="vox-plan__tagline">Ideal para blogueiros iniciantes testarem a tecnologia.</p>
              </div>
              <ul className="vox-plan__features">
                <li><Check style={{ color: "#ba9eff", width: 20, height: 20 }} /><span>Geração manual de áudio</span></li>
                <li><Check style={{ color: "#ba9eff", width: 20, height: 20 }} /><span>Shortcodes básicos</span></li>
                <li className="vox-plan__feature--off"><X style={{ width: 20, height: 20 }} /><span>Automação de posts</span></li>
                <li className="vox-plan__feature--off"><X style={{ width: 20, height: 20 }} /><span>Suporte prioritário</span></li>
              </ul>
              <button className="vox-plan__cta vox-plan__cta--outline">Começar Agora</button>
            </div>

            {/* Pro */}
            <div className="vox-plan pricing-card pro">
              <div className="vox-plan__popular-badge">Mais Popular</div>
              <div className="vox-plan__header">
                <h3 className="vox-plan__name">Pro</h3>
                <div className="vox-plan__price vox-plan__price--pro">
                  R$ 49<span className="vox-plan__cycle">/mês</span>
                </div>
                <p className="vox-plan__tagline">Escalabilidade total e automação sem esforço.</p>
              </div>
              <ul className="vox-plan__features">
                <li><Check style={{ color: "#ba9eff", width: 20, height: 20 }} /><span className="vox-plan__bold">Automação completa</span></li>
                <li><Check style={{ color: "#ba9eff", width: 20, height: 20 }} /><span>Vozes ilimitadas OpenAI</span></li>
                <li><Check style={{ color: "#ba9eff", width: 20, height: 20 }} /><span>Custom CSS do Player</span></li>
                <li><Check style={{ color: "#ba9eff", width: 20, height: 20 }} /><span>Suporte prioritário 24/7</span></li>
              </ul>
              <button className="vox-plan__cta vox-plan__cta--pro">Assinar Pro</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ */}
      <section className="vox-faq vox-section--dark" id="faq">
        <div className="vox-container vox-faq__inner">
          <div className="vox-section-header">
            <h2 className="vox-section-title">Perguntas Frequentes</h2>
          </div>
          <div className="vox-faq__list">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="vox-faq__item"
              >
                <h4 className="vox-faq__question">{faq.question}</h4>
                <p className="vox-faq__answer">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
