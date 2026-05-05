import { useState } from "react";
import { useOutletContext, useLoaderData } from "react-router";
// Server Loader removido temporariamente pois é incompatível com ssr: false


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
  Clock,
  TrendingDown,
  BookOpen,
} from "lucide-react";

// ─────────────────────────────────────────────
// Static data — idêntico ao App.tsx original
// ─────────────────────────────────────────────
const features = [
  {
    title: "Reduce bounce from long content",
    description: "Long articles push visitors away. Audio gives them an easier way to stay without committing to reading everything.",    
    footer: "Even a small increase in engagement can reduce early exits.",
    icon: <TrendingDown className="vox-icon-primary" />,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Increase time on page",
    description: "When visitors can listen while doing something else, they stay longer. More time on page = stronger engagement signals.",
    footer: "Sites that add audio often see longer sessions because users keep listening while multitasking.",
    icon: <Clock className="vox-icon-primary" />,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Make your content accessible",
    description: "Audio opens your content to:",    
    list: ["visually impaired users", "auditory learners", "anyone dealing with screen fatigue"],
    footer: "You instantly make your content usable for audiences who wouldn’t fully engage with text alone.",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Get more value from every post",
    description: "You already created the content. Now you’re extracting more from it — without extra work.",
    footer: "One article becomes two formats, increasing its reach without additional production time.",
    icon: <Database className="vox-icon-secondary" />,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Improve user experience instantly",
    description: "A built-in audio player makes your site feel more modern, polished, and easier to use.",
    footer: "Small UX improvements like this can increase perceived quality and trust in your content.",
    icon: <Sparkles className="vox-icon-secondary" />,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Automate everything",
    description: "Generate audio automatically for every post you publish. No manual work. No extra steps.",
    footer: "Once configured, your entire content pipeline can include audio without extra effort.",
    icon: <Blocks className="vox-icon-secondary" />,
    colSpan: 1,
    rowSpan: 1,
  },
];

const steps = [
  {
    number: "1",
    title: "Add your API key",
    description: "Connect VoxAI to your own account. You stay in control of the costs, paying only fractions of a cent per generation directly to the provider.",
  },
  {
    number: "2",
    title: "Select your post",
    description: "Choose which articles you want to convert. You can process them individually as you write or bulk-generate audio for your entire back catalog.",
  },
  {
    number: "3",
    title: "Generate audio",
    description: "VoxAI creates the audio and embeds a sleek, responsive player directly into your post. Your visitors can now listen immediately.",
  },
];

const faqs = [
  {
    question: "Why do I need an API key?",
    answer: "VoxAI is a plugin, not a middleman service. By using your own API key, you bypass the expensive monthly markups charged by other SaaS tools. You pay the raw, wholesale price directly for the processing.",
  },
  {
    question: "VoxAI doesn’t charge for audio generation.",
    answer: "You connect your own OpenAI API key and pay only for what you use usually just a few cents per article.",
  },
  {
    question: "Does it slow down my site?",
    answer: "No. The audio files are generated once and served efficiently. The player itself is lightweight and designed to have zero negative impact on your Core Web Vitals.",
  },
  {
    question: "Does it work with any theme?",
    answer: "Yes. VoxAI is designed to be theme-agnostic. The audio player inherits a clean, modern styling that looks great out of the box on any WordPress theme or page builder.",
  },
  {
    question: "Can I automate audio generation?",
    answer: "Absolutely. You can configure VoxAI to automatically generate and embed audio the moment you hit 'Publish' on a new post, making it entirely hands-off.",
  },
];

const valuePoints = [
  {
    title: "Keep more visitors on your site",
    desc: "Most people don’t read full articles — they skim and leave. Audio gives them a reason to stay and engage with your content instead of bouncing early.",
    footer: "Even a small increase in time on page can make a real difference over time."
  },
  {
    title: "Get more value from content you already created",
    desc: "You’ve already invested time in writing your posts. VoxAI turns every article into a second format — without rewriting, recording, or editing.",
    footer: "More output. Same effort."
  },
  {
    title: "Avoid expensive audio platforms",
    desc: "Most tools charge recurring fees based on usage. VoxAI doesn’t. You use your own API and pay the real cost — often just a few cents per article.",
    footer: ""
  },
  {
    title: "Scale without increasing complexity",
    desc: "Whether you manage one site or many, VoxAI works the same way.",
    footer: "No per-article pricing. No hidden limits. No extra tools."
  },
  {
    title: "No new workflow to learn",
    desc: "Everything happens inside WordPress. No dashboards. No integrations. No extra steps.",
    footer: "You keep publishing the same way — just with more impact."
  }
];

const tiers = [
  { label: "Single Site", sites: "1 site",  popular: false, monthly: "$9.99", annual: "$59.99",  lifetime: "$179.99" },
  { label: "5 Sites",     sites: "5 sites", popular: true,  monthly: "$18.99", annual: "$179.99", lifetime: "$359.99" },
  { label: "25 Sites",    sites: "25 sites",popular: false, monthly: "$27.99", annual: "$199.99", lifetime: "$539.99" },
  { label: "100 Sites",   sites: "100 sites",popular: false,monthly: "$36.99", annual: "$239.99", lifetime: "$719.99" },
];

function ValueSection() {
  return (
    <section className="vox-value" id="value">
      <div className="vox-container">
        <div className="vox-value-grid">
          
          <div className="vox-value-sticky">
            <h2 className="vox-section-title" style={{ textAlign: "left", fontSize: "2.5rem", marginBottom: "1.5rem", maxWidth: "410px" }}>
              Why VoxAI is worth it
            </h2>
            <p className="vox-section-desc" style={{ textAlign: "left", fontSize: "1.1rem", maxWidth: "400px", margin: "0" }}>
              You’re not paying for audio.<br/><br/>
              You’re paying for better content performance.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {valuePoints.map((point, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1 }}
                className="glass-surface"
                style={{ padding: "3rem", borderRadius: "1.5rem", borderLeft: "4px solid #ba9eff" }}
              >
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", color: "#fff" }}>
                  {point.title}
                </h3>
                <p style={{ color: "#adaaaa", lineHeight: 1.6, fontSize: "1.1rem", marginBottom: point.footer ? "1.5rem" : "0" }}>
                  {point.desc}
                </p>
                {point.footer && (
                  <p style={{ color: "#ba9eff", fontSize: "1rem", fontWeight: 600 }}>
                    {point.footer}
                  </p>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginTop: "2rem", padding: "2rem", background: "rgba(186, 158, 255, 0.05)", borderRadius: "1rem", textAlign: "center" }}
            >
              <p style={{ color: "#fff", fontSize: "1.2rem", lineHeight: 1.6, fontWeight: 500 }}>
                If VoxAI helps retain even a small percentage of visitors who would otherwise leave, it already pays for itself. <br/>
                <span style={{ color: "#ba9eff" }}>And it keeps doing that every time you publish.</span>
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="vox-comparison" style={{ padding: "6rem 0" }}>
      <div className="vox-container">
        <div className="vox-section-header">
          <h2 className="vox-section-title">See what other site owners are saying</h2>
          <p className="vox-section-desc">Real impact from VoxAI across different projects.</p>
        </div>
        <div className="vox-compare-layout">
          <div className="vox-compare-section vox-compare-section--pro" style={{ padding: "2rem" }}>
            <p style={{ fontStyle: "italic", marginBottom: "1rem", color: "#fff" }}>"We added audio to our long-form guides and saw a clear increase in session duration within weeks. People actually stay and listen while browsing."</p>
            <p style={{ fontWeight: 700, color: "#ba9eff" }}>— Content Manager, SEO blog with 50+ articles</p>
          </div>
          <div className="vox-compare-section vox-compare-section--pro" style={{ padding: "2rem" }}>
            <p style={{ fontStyle: "italic", marginBottom: "1rem", color: "#fff" }}>"Managing multiple niche sites, this saved me from paying for multiple SaaS tools. I control the cost and scale it easily"</p>
            <p style={{ fontWeight: 700, color: "#ba9eff" }}>— Affiliate site owner managing 12+ sitesU</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="vox-problem" style={{ padding: "6rem 0", background: "#131313", position: "relative", overflow: "hidden" }}>
      {/* Decorative background elements */}
      <div className="vox-glow vox-glow--top-left" style={{ opacity: 0.3 }} />
      
      <div className="vox-container">
        <div className="vox-section-header" style={{ marginBottom: "4rem" }}>
          <h2 className="vox-section-title" style={{ fontSize: "2.5rem", maxWidth: "800px", margin: "0 auto 1.5rem" }}>
            Most visitors don’t read your content
          </h2>
          <p className="vox-section-desc" style={{ maxWidth: "800px", margin: "0 auto" }}>
            You spend hours creating content. Most visitors skim and leave before reaching the middle.
          </p>
        </div>

        <div className="vox-problem__grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "2rem",
          marginBottom: "3rem"
        }}>
          
          <motion.div 
            className="glass-surface vox-problem-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            style={{ padding: "2.5rem 2rem", textAlign: "left", borderRadius: "24px" }}
          >
            <div style={{ 
              width: "48px", height: "48px", borderRadius: "12px", 
              background: "rgba(186, 158, 255, 0.1)", display: "flex", 
              alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" 
            }}>
              <Clock style={{ color: "#ba9eff", width: 24, height: 24 }} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem", color: "#fff" }}>Screen Fatigue</h3>
            <p style={{ color: "#adaaaa", lineHeight: 1.6 }}>
              People are busy. They are multitasking, commuting, or simply experiencing screen fatigue. When confronted with a wall of text, their instinct is to leave.
            </p>
          </motion.div>

          <motion.div 
            className="glass-surface vox-problem-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ padding: "2.5rem 2rem", textAlign: "left", borderRadius: "24px" }}
          >
            <div style={{ 
              width: "48px", height: "48px", borderRadius: "12px", 
              background: "rgba(255, 107, 107, 0.1)", display: "flex", 
              alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" 
            }}>
              <TrendingDown style={{ color: "#ff6b6b", width: 24, height: 24 }} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem", color: "#fff" }}>Lost Engagement</h3>
            <p style={{ color: "#adaaaa", lineHeight: 1.6 }}>
              This means your best content goes unread, your time on page drops, and you lose opportunities to connect with your audience.
            </p>
          </motion.div>

          <motion.div 
            className="glass-surface vox-problem-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ padding: "2.5rem 2rem", textAlign: "left", borderRadius: "24px" }}
          >
            <div style={{ 
              width: "48px", height: "48px", borderRadius: "12px", 
              background: "rgba(105, 156, 255, 0.1)", display: "flex", 
              alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" 
            }}>
              <BookOpen style={{ color: "#699cff", width: 24, height: 24 }} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem", color: "#fff" }}>The Solution</h3>
            <p style={{ color: "#adaaaa", lineHeight: 1.6 }}>
              Turn readers into listeners right from your dashboard. Give them a second way to consume your content without leaving your site.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const freemiusData = null; 
  const [billing, setBilling] = useState("annual"); 

  const pluginId = "26907";
  const publicKey = "pk_e1246c6f65f95bccf2e2af8906d0e";
  const proPlanId = "44556";

  const fallbackTiers = [
    { 
      label: "Personal", sites: "1 site", popular: false, 
      monthly: "$9.99", annual: "$59.99", annualEquivalent: "$4.99", savings: "Save 50%",
      cta: "Start with Personal",
      pricingId: "58285",
      features: [
        "1 website",
        "All Pro features",
        "Audio player included",
        "Manual & automatic generation",
        "Full WordPress integration",
      ]
    },
    { 
      label: "Freelancer", sites: "10 sites", popular: true, 
      monthly: "$24.99", annual: "$149.99", annualEquivalent: "$12.50", savings: "Save 50%",
      cta: "Start with Freelancer",
      pricingId: "62369",
      features: [
        "Up to 10 websites",
        "All Pro features",
        "Automation at scale",
        "Advanced customization",
        "Priority updates",
      ]
    },
    { 
      label: "Agency", sites: "Unlimited Sites", popular: false, 
      monthly: null, annual: "$299.99", annualEquivalent: "$24.99", savings: "Best scale value",
      cta: "Get Agency License",
      pricingId: "62369",
      features: [
        "Unlimited websites",
        "All Pro features",
        "Built for scalability",
        "Manage multiple client sites",
        "Future updates included",
      ]
    }
  ];

  let activeTiers = fallbackTiers;

  if (freemiusData) {
      console.log("Freemius Data fetched dynamically:", freemiusData);
  }

  const handleCheckout = async (tier) => {
    try {
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
      alert("Failed to load checkout. Please try again.");
    }
  };

  return (
    <section className="vox-pricing" id="pricing">
      <div className="vox-container vox-pricing__inner">

        {/* Header */}
        <div className="vox-section-header">
          <h2 className="vox-section-title">Simple pricing. No hidden costs.</h2>
          <p className="vox-section-desc">
            No usage fees. No markup. You pay OpenAI directly.
          </p>
        </div>

        {/* Toggle */}
        <div className="vox-billing-toggle" style={{ marginBottom: "1rem" }}>
          <button
            className={`vox-billing-toggle__btn${billing === "monthly" ? " vox-billing-toggle__btn--active" : ""}`}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </button>
          <button
            className={`vox-billing-toggle__btn${billing === "annual" ? " vox-billing-toggle__btn--active" : ""}`}
            onClick={() => setBilling("annual")}
          >
            Annual <span style={{ fontSize: "0.75rem", background: "rgba(186, 158, 255, 0.2)", padding: "2px 6px", borderRadius: "4px", marginLeft: "6px", color: "#ba9eff" }}>Best Value</span>
          </button>
        </div>

        <p style={{ textAlign: "center", color: "#adaaaa", marginBottom: "3rem", fontSize: "0.9rem" }}>
          Start monthly. Upgrade to yearly anytime.
        </p>

        {/* Cards grid */}
        <div className="vox-tier-grid">
          {activeTiers.filter(tier => billing === "monthly" ? tier.monthly !== null : true).map((tier, idx) => (
            <motion.div
              key={tier.label}
              className={`vox-tier-card${tier.popular ? " vox-tier-card--popular" : ""}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              {tier.popular && (
                <div className="vox-tier-card__badge">⭐ Most Popular</div>
              )}

              {/* Header */}
              <div className="vox-tier-card__header">
                <h3 className="vox-tier-card__title">{tier.label}</h3>
                <p className="vox-tier-card__sites">License for {tier.sites}</p>
              </div>

              {/* Price */}
              <div className="vox-tier-card__price-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0, marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <motion.span
                    key={billing + tier.label}
                    className="vox-tier-card__price"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {(billing === "monthly" ? tier.monthly : tier.annual) || "—"}
                  </motion.span>
                  <span className="vox-tier-card__cycle">
                    {billing === "monthly" ? "/mo" : "/yr"}
                  </span>
                </div>
                
                {billing === "annual" && (
                  <div style={{ fontSize: "0.75rem", color: "#adaaaa" }}>
                    ≈ {tier.annualEquivalent}/mo <span style={{ color: "#ba9eff", fontWeight: "600", marginLeft: "4px" }}>{tier.savings}</span>
                  </div>
                )}
                {billing === "monthly" && (
                  <div style={{ fontSize: "0.75rem", color: "#8a8a8a", fontStyle: "italic" }}>
                    Higher cost over time
                  </div>
                )}
              </div>

              {/* CTA */}
              <button 
                className={`vox-tier-card__cta${tier.popular ? " vox-tier-card__cta--popular" : ""}`}
                onClick={() => handleCheckout(tier)}
                disabled={!(billing === "monthly" ? tier.monthly : tier.annual)}
                style={!(billing === "monthly" ? tier.monthly : tier.annual) ? { opacity: 0.5, cursor: "not-allowed" } : {}}
              >
                {!(billing === "monthly" ? tier.monthly : tier.annual) 
                  ? "Unavailable" 
                  : tier.cta}
              </button>

              {/* Features */}
              <ul className="vox-tier-card__features">
                {tier.features.map((f, i) => (
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
                No usage fees — you pay OpenAI directly
              </span>
            </div>

            <h1 className="vox-hero__title" style={{ fontSize: "3rem", lineHeight: 1.1 }}>
              Keep your visitors on the page longer by giving them a reason to listen
            </h1>

            <p className="vox-hero__desc">
              Turn every post into audio and keep visitors engaged without changing how you publish.
            </p>

            <div className="vox-hero__actions">
              <button className="vox-btn-primary" onClick={() => document.getElementById('pricing').scrollIntoView()}>Turn your first post into audio</button>
              <button className="vox-btn-ghost" onClick={() => document.getElementById('how-it-works').scrollIntoView()}>See How It Works</button>
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
                  <h3 className="vox-player__title">Listen instead of reading.</h3>
                  <p className="vox-player__subtitle">Narrated by VoxAI • 2:45 min</p>
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

      {/* ── Problem Section */}
      <ProblemSection />

      {/* ── Features Bento Grid */}
      <section className="vox-features" id="features">
        <div className="vox-container">
          <div className="vox-section-header">
            <h2 className="vox-section-title">Give every post a second format</h2>
            <p className="vox-section-desc">VoxAI turns your content into audio automatically</p>
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
                    <p className="vox-bento-footer">{feature.footer}</p>
                  )}
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
            <h2 className="vox-section-title">From text to audio in three simple steps.</h2>
            <p className="vox-section-desc">Bring your content to life effortlessly.</p>
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
            <h2 className="vox-shortcodes__title">A native WordPress experience.</h2>
            <p className="vox-shortcodes__desc">
              VoxAI was built specifically for WordPress. There are no messy embeds to copy-paste, no external dashboards to log into, and no bloated scripts slowing down your site. It integrates seamlessly into your existing publishing workflow.
            </p>
            <div className="vox-checklist">
              {[
                "No external tools needed",
                "Works with your existing workflow",
                "Lightweight and optimized player",
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
                  <span className="comment">// Renders the complete audio player</span>
                  <div className="vox-code-row">
                    <span className="shortcode">[voxaiau_tts]</span>
                  </div>
                </div>
                <div>
                  <span className="comment">// Renders only the smart summary</span>
                  <div className="vox-code-row">
                    <span className="shortcode">[voxaiau_summary]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Value Section */}
      <ValueSection />

      {/* ── Social Proof */}
      <SocialProof />

      {/* ── Pricing */}
      <PricingSection />

      {/* ── FAQ */}
      <section className="vox-faq vox-section--dark" id="faq">
        <div className="vox-container vox-faq__inner">
          <div className="vox-section-header">
            <h2 className="vox-section-title">Frequently Asked Questions</h2>
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

      {/* ── Final CTA */}
      <section style={{ padding: "6rem 0", textAlign: "center" }}>
        <div className="vox-container" style={{ maxWidth: "600px" }}>
          <h2 className="vox-section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Most people won’t read your content.</h2>
          <p className="vox-section-desc" style={{ marginBottom: "2rem" }}>Give them a reason to listen</p>
          <button className="vox-btn-primary" onClick={() => document.getElementById('pricing').scrollIntoView()}>Get Started Now</button>
        </div>
      </section>
    </>
  );
}
