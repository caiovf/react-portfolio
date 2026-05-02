import { useState } from "react";
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
    question: "Preciso de uma conta OpenAI?",
    answer: "Sim. O plugin usa a API da OpenAI para gerar resumos e áudio. É necessário uma conta com créditos disponíveis.",
  },
  {
    question: "O conteúdo é enviado à OpenAI automaticamente?",
    answer: 'Não. O conteúdo só é enviado quando você clica explicitamente em "Gerar Resumo" ou "Gerar Áudio" no editor.',
  },
  {
    question: "Quanto custa usar?",
    answer: "O plugin é gratuito. Você paga diretamente à OpenAI pelo uso da API. Resumo típico (GPT-4o Mini, ~1000 palavras): menos de $0,001 USD. Áudio narrado (TTS-1, ~1000 palavras): aproximadamente $0,02–$0,04 USD.",
  },
  {
    question: "O arquivo de áudio fica no meu servidor?",
    answer: "Sim. O MP3 é salvo em wp-content/uploads/voxai/YYYY/MM/ e a reprodução nunca volta a chamar a OpenAI.",
  },
  {
    question: "Funciona com Gutenberg e Classic Editor?",
    answer: "Sim. O VoxAI tem suporte completo para ambos os editores.",
  },
  {
    question: "O resumo é atualizado quando edito o post?",
    answer: 'Não. O resumo é preservado mesmo após edições no conteúdo. Para gerar um novo resumo, delete o existente via botão no editor e clique em "Gerar Resumo" novamente.',
  },
  {
    question: "Posso usar em tipos de post customizados (CPTs)?",
    answer: "Sim. Configure os tipos de post desejados em Configurações → AI Audio & Summary → Post Types.",
  },
  {
    question: "Funciona com posts muito longos?",
    answer: "Sim. Para posts grandes, o plugin usa chunking inteligente do conteúdo para o resumo. Para o áudio, o texto é segmentado em blocos e os MP3s são concatenados automaticamente.",
  },
];


const tiers = [
  { label: "Single Site", sites: "1 site",  popular: false, monthly: "$9.99", annual: "$59.99",  lifetime: "$179.99" },
  { label: "5 Sites",     sites: "5 sites", popular: true,  monthly: "$18.99", annual: "$179.99", lifetime: "$359.99" },
  { label: "25 Sites",    sites: "25 sites",popular: false, monthly: "$27.99", annual: "$199.99", lifetime: "$539.99" },
  { label: "100 Sites",   sites: "100 sites",popular: false,monthly: "$36.99", annual: "$239.99", lifetime: "$719.99" },
];

function FeatureComparison() {
  return (
    <section className="vox-comparison" id="compare">
      <div className="vox-container">
        <div className="vox-section-header">
          <h2 className="vox-section-title">Comparativo: Free vs Pro</h2>
          <p className="vox-section-desc">
            Entenda as diferenças detalhadas e escolha a versão ideal para o seu projeto.
          </p>
        </div>

        <div className="vox-compare-layout">
          
          {/* Seção Gratuita */}
          <div className="vox-compare-section">
            <div className="vox-compare-section__header">
              <h3>Versão Gratuita</h3>
              <p>Toda a fundação necessária com processamento manual.</p>
            </div>
            
            <div className="vox-compare-section__content">
              <div className="vox-compare-group">
                <h4>Modelos e Vozes</h4>
                <ul>
                  <li><strong>Resumos:</strong> GPT-4o-mini, GPT-4o, GPT-3.5-turbo, o1-preview e o1-mini.</li>
                  <li><strong>Áudio (TTS):</strong> tts-1 (padrão) e tts-1-hd (alta definição).</li>
                  <li><strong>Vozes:</strong> Alloy, Echo, Fable, Onyx, Nova e Shimmer.</li>
                </ul>
              </div>

              <div className="vox-compare-group">
                <h4>Geração e Controle</h4>
                <ul>
                  <li><strong>Geração Manual:</strong> Via Meta Box no painel de edição de cada post.</li>
                  <li><strong>Controles:</strong> Limite de caracteres e definição de permissões de usuário.</li>
                  <li><strong>Post Types:</strong> Suporte configurável para Posts, Páginas e CPTs.</li>
                </ul>
              </div>

              <div className="vox-compare-group">
                <h4>Player e UI</h4>
                <ul>
                  <li><strong>Posicionamento:</strong> Automático ou manual via shortcodes.</li>
                  <li><strong>Temas:</strong> Claro (Light) e Escuro (Dark).</li>
                  <li><strong>Intro:</strong> Opcional de narração do título, autor e data.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="vox-compare-divider" />

          {/* Seção Pro */}
          <div className="vox-compare-section vox-compare-section--pro">
            <div className="vox-compare-section__header">
              <h3><span className="vox-compare-pro-badge">💎 Premium</span> VoxAI Pro</h3>
              <p>Focada em automação em massa, personalização e UX imersiva.</p>
            </div>
            
            <div className="vox-compare-section__content">
              <div className="vox-compare-group">
                <h4>Automação e Escala</h4>
                <ul>
                  <li><strong>Auto-Generate:</strong> Geração instantânea ao publicar ou agendar um post.</li>
                  <li><strong>Bulk Generation:</strong> Painel para processar centenas de posts sem esforço.</li>
                </ul>
              </div>

              <div className="vox-compare-group">
                <h4>Personalização Avançada</h4>
                <ul>
                  <li><strong>Custom Prompt:</strong> Controle tom de voz, regras editoriais e idiomas na IA.</li>
                  <li><strong>Custom Intro:</strong> Crie templates fixos com variáveis como {"{{title}}"} e {"{{author}}"}.</li>
                </ul>
              </div>

              <div className="vox-compare-group">
                <h4>Experiência do Usuário (UX)</h4>
                <ul>
                  <li><strong>Sticky Player:</strong> Player flutuante no rodapé acompanha a rolagem.</li>
                  <li><strong>Karaoke Mode:</strong> Highlight visual do parágrafo atual sincronizado ao áudio.</li>
                  <li><strong>Admin Workflow:</strong> Colunas de status no WP e integração nativa no Gutenberg.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [billing, setBilling] = useState("annual"); // "monthly" | "annual" | "lifetime"

  // Preços e IDs reais extraídos da API do Freemius (seguro manter no frontend)
  const pluginId = "26907";
  const publicKey = "pk_e1246c6f65f95bccf2e2af8906d0e";
  const proPlanId = "44556";

  const activeTiers = [
    { 
      label: "Single Site", sites: "1 site", popular: false, 
      monthly: "$9.99", annual: "$99.99", lifetime: "$299.99",
      pricingId: "58285"
    },
    { 
      label: "5 Sites", sites: "5 sites", popular: true, 
      monthly: "$24.99", annual: "$239.99", lifetime: "$719.99",
      pricingId: "58287"
    },
    { 
      label: "25 Sites", sites: "25 sites", popular: false, 
      monthly: "$60.99", annual: "$587.99", lifetime: "$1769.99",
      pricingId: "58288"
    },
    { 
      label: "100 Sites", sites: "100 sites", popular: false, 
      monthly: "$66.99", annual: "$647.99", lifetime: "$1949.99",
      pricingId: "58289"
    },
  ];

  const handleCheckout = async (tier) => {
    try {
      // Dynamic import to prevent Vite/React context crashes and reduce bundle size
      const { Checkout: FreemiusCheckout } = await import('@freemius/checkout');
      
      const handler = new FreemiusCheckout({
        plugin_id: pluginId,
        public_key: publicKey,
      });
      handler.open({
        plan_id: proPlanId,
        pricing_id: tier.pricingId,
        billing_cycle: billing
      });
    } catch (err) {
      console.error("Failed to load Freemius Checkout:", err);
      alert("Não foi possível carregar o checkout. Tente novamente.");
    }
  };

  return (
    <section className="vox-pricing" id="pricing">
      <div className="vox-container vox-pricing__inner">

        {/* Header */}
        <div className="vox-section-header">
          <h2 className="vox-section-title">Planos e Preços</h2>
          <p className="vox-section-desc">
            Escolha o número de sites e o ciclo de cobrança ideal para o seu projeto.
          </p>
        </div>

        {/* Toggle */}
        <div className="vox-billing-toggle">
          <button
            className={`vox-billing-toggle__btn${billing === "monthly" ? " vox-billing-toggle__btn--active" : ""}`}
            onClick={() => setBilling("monthly")}
          >
            Mensal
          </button>
          <button
            className={`vox-billing-toggle__btn${billing === "annual" ? " vox-billing-toggle__btn--active" : ""}`}
            onClick={() => setBilling("annual")}
          >
            Anual
          </button>
          <button
            className={`vox-billing-toggle__btn${billing === "lifetime" ? " vox-billing-toggle__btn--active" : ""}`}
            onClick={() => setBilling("lifetime")}
          >
            Lifetime
            <span className="vox-billing-toggle__tag">Melhor valor</span>
          </button>
        </div>

        {/* Cards grid */}
        <div className="vox-tier-grid">
          {activeTiers.map((tier, idx) => (
            <motion.div
              key={tier.label}
              className={`vox-tier-card${tier.popular ? " vox-tier-card--popular" : ""}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              {tier.popular && (
                <div className="vox-tier-card__badge">⭐ Mais Popular</div>
              )}

              {/* Sites label */}
              <div className="vox-tier-card__header">
                <h3 className="vox-tier-card__title">{tier.label}</h3>
                <p className="vox-tier-card__sites">Licença para {tier.sites}</p>
              </div>

              {/* Price */}
              <div className="vox-tier-card__price-wrap" style={{ marginBottom: "1rem" }}>
                <motion.span
                  key={billing + tier.label}
                  className="vox-tier-card__price"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {billing === "monthly" ? tier.monthly : billing === "annual" ? tier.annual : tier.lifetime}
                </motion.span>
                <span className="vox-tier-card__cycle">
                  {billing === "monthly" ? "/mês" : billing === "annual" ? "/ano" : "único"}
                </span>
              </div>

              {/* CTA */}
              <button 
                className={`vox-tier-card__cta${tier.popular ? " vox-tier-card__cta--popular" : ""}`}
                onClick={() => handleCheckout(tier)}
              >
                {billing === "lifetime" ? "Comprar Lifetime" : "Assinar Pro"}
              </button>

              {/* Features */}
              <ul className="vox-tier-card__features">
                {[
                  "Tudo da versão Free, plus:",
                  "Automação e Geração em Massa",
                  "Personalização Avançada (Prompts/Intros)",
                  "Sticky Player & Karaoke Mode",
                ].map((f, i) => (
                  <li key={f}>
                    <Check style={{ width: 15, height: 15, color: i === 0 ? "#fff" : "#ba9eff", flexShrink: 0 }} />
                    <span style={i === 0 ? { fontWeight: 700, color: "#fff" } : {}}>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

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
                  <span className="comment">// Renderiza o player de áudio completo</span>
                  <div className="vox-code-row">
                    <span className="shortcode">[voxaiau_tts]</span>
                  </div>
                </div>
                <div>
                  <span className="comment">// Exibe apenas o resumo inteligente gerado</span>
                  <div className="vox-code-row">
                    <span className="shortcode">[voxaiau_summary]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Comparison */}
      <FeatureComparison />

      {/* ── Pricing */}
      <PricingSection />

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
