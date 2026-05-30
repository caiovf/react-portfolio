import { useState, useRef, useEffect } from "react";
import { useOutletContext, useLoaderData } from "react-router";
// Server Loader removido temporariamente pois é incompatível com ssr: false


import { motion } from "motion/react";
import {
  AudioLines,
  Play,
  Pause,
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
  BarChart2,
} from "lucide-react";

// ─────────────────────────────────────────────
// Static data — idêntico ao App.tsx original
// ─────────────────────────────────────────────
const features = [
  {
    title: "Let users listen while multitasking",
    description: "Give visitors the freedom to consume your content while commuting, working, or doing chores.",
    icon: <Clock className="vox-icon-primary" />,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Better experience on mobile devices",
    description: "Reading long texts on small screens is tiring. Audio makes mobile consumption effortless.",
    icon: <TrendingDown className="vox-icon-primary" />,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Improve accessibility",
    description: "Make your site instantly usable for visually impaired users and auditory learners.",
    icon: <Blocks className="vox-icon-primary" />,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Increase time spent on page",
    description: "Users who listen stay longer. Stronger engagement signals and lower early exit rates.",
    icon: <Database className="vox-icon-secondary" />,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Extract more value from content you already created",
    description: "Turn every existing article into a new format without rewriting or recording anything manually.",
    icon: <Sparkles className="vox-icon-secondary" />,
    colSpan: 1,
    rowSpan: 1,
  },  
  {
    title: "Track audio performance post by post",    
    icon: <BarChart2 className="vox-icon-primary" />,
    colSpan: 1,
    rowSpan: 1,
    list: [
      "Total plays per post",      
      "Top-performing posts by audio engagement",
      "Aggregate plays across all content",
    ],    
  },
];

const steps = [
  {
    number: "1",
    title: "Connect your OpenAI API",
    description: "Get you key from OpenAi to generate audio directly, without paying middleman markups.",
  },
  {
    number: "2",
    title: "Select your post type",
    description: "Choose which types of content should have audio. You can enable it for posts, pages, or custom post types.",
  },
  {
    number: "3",
    title: "Audio appears automatically",
    description: "VoxAI creates the audio and embeds a responsive player in your content automatically.",
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
    title: "Keep readers engaged",
    desc: "When faced with a long article, many visitors leave. Audio gives them an effortless alternative to stay and consume your content.",
  },
  {
    title: "Transform existing content into audio",
    desc: "Breathe new life into your archives. You already did the hard work of writing; now let VoxAI turn it into a listenable format.",
  },
  {
    title: "Improve accessibility",
    desc: "Instantly upgrade your site's accessibility for users who rely on screen readers or simply prefer listening.",
  },
  {
    title: "Create better mobile experiences",
    desc: "Reading 2,000 words on a smartphone is difficult. A native audio player makes your content perfectly suited for mobile multitasking.",
  },
  {
    title: "No new workflow required",
    desc: "VoxAI works behind the scenes. Just publish your posts like you normally do, and the audio is generated and embedded automatically.",
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
              Why publishers and content sites use VoxAI
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
          <h2 className="vox-section-title">Early users testing VoxAI</h2>
          <p className="vox-section-desc">Real sites using audio to improve engagement.</p>
        </div>
        <div className="vox-compare-layout">
          <div className="vox-compare-section vox-compare-section--pro" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem" }}>
              <span style={{ color: "#ba9eff", fontWeight: 600 }}>SEO Blog</span>
              <span style={{ color: "#adaaaa", fontSize: "0.9rem" }}>~15k monthly visitors</span>
            </div>
            <p style={{ color: "#fff", lineHeight: 1.6 }}>
              Reason for using VoxAI: "Testing if audio versions reduce bounce rate on 2,000+ word guides."
            </p>
          </div>
          <div className="vox-compare-section vox-compare-section--pro" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem" }}>
              <span style={{ color: "#ba9eff", fontWeight: 600 }}>Niche News Portal</span>
              <span style={{ color: "#adaaaa", fontSize: "0.9rem" }}>~40k monthly visitors</span>
            </div>
            <p style={{ color: "#fff", lineHeight: 1.6 }}>
              Reason for using VoxAI: "Giving mobile users a way to listen to daily updates while commuting."
            </p>
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
            You worked hard for the click. Don't lose visitors after it.
          </h2>
          <p className="vox-section-desc" style={{ maxWidth: "800px", margin: "0 auto" }}>
            Readers skim. Mobile users multitask. Long articles compete with distractions everywhere. If people don't want to read right now, that doesn't mean they want to leave.
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
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem", color: "#fff" }}>Visitors skim</h3>
            <p style={{ color: "#adaaaa", lineHeight: 1.6 }}>
              Most users scan content instead of reading every paragraph.
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
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem", color: "#fff" }}>Engagement drops</h3>
            <p style={{ color: "#adaaaa", lineHeight: 1.6 }}>
              Long content often loses attention before reaching the end.
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
              <AudioLines style={{ color: "#699cff", width: 24, height: 24 }} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem", color: "#fff" }}>Audio changes consumption</h3>
            <p style={{ color: "#adaaaa", lineHeight: 1.6 }}>
              Give readers another way to consume your content.
            </p>
          </motion.div>
        </div>

        {/* Analytics Showcase */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          marginTop: "4rem",
          position: "relative"
        }}>
          {/* Subtle glow behind the images */}
          <div className="vox-glow vox-glow--bottom-left" style={{ opacity: 0.15, left: "20%", bottom: "-10%" }} />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-surface"
            style={{ 
              borderRadius: "24px", 
              overflow: "hidden", 
              padding: "1rem", 
              boxShadow: "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center"
            }}
          >
            <img 
              src="/assets/voxai/img/voxai-4.png" 
              alt="VoxAI Analytics Highlights" 
              style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }} 
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-surface"
            style={{ 
              borderRadius: "24px", 
              overflow: "hidden", 
              padding: "1rem", 
              boxShadow: "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center"
            }}
          >
            <img 
              src="/assets/voxai/img/voxai-5.png" 
              alt="VoxAI Detailed Statistics" 
              style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }} 
              loading="lazy" 
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function PricingSection() {
  const freemiusData = null; 
  const [billing, setBilling] = useState("free"); 

  const pluginId = "26907";
  const publicKey = "pk_e1246c6f65f95bccf2e2af8906d0e";
  const proPlanId = "44556";

  const fallbackTiers = [
    { 
      label: "Free", sites: "1 site", popular: true, badge: "⭐ Start Here",
      description: "Install from WordPress.org and start generating audio immediately. No credit card required.",
      monthly: "$0", annual: "$0", annualEquivalent: "$0", savings: "",
      cta: "Install Free",
      pricingId: "free",
      features: [
        "📊 Analytics dashboard included",
        "Plays per post + unique listeners",
        "Daily plays chart (Chart.js)",
        "Top 5 posts by audio engagement",
        "AI summary (OpenAI / Claude / Gemini)",
        "Text-to-speech — 6 voices, MP3 local",
        "Responsive audio player",
        "Gutenberg & Classic Editor support",
        "Cost estimator per post",
        "Shortcodes [voxaiau_summary] [voxaiau_tts]",
        "WP AI Client compatible (WP 7.0)",
        "Community support",
      ]
    },
    { 
      label: "Creator", sites: "1 site", popular: false, 
      description: "Ideal for content creators and growing blogs.",
      monthly: "$9.99", annual: "$59.99", annualEquivalent: "$4.99", savings: "Save 50%",
      cta: "Start with Creator",
      pricingId: "58285",
      features: [
        "Everything in Free, plus:",
        "Auto-generate audio on publish",
        "Bulk generator with cost estimate",
        "Sticky player (fixed bottom bar)",
        "Karaoke mode (paragraph sync)",
        "Avg. listen time + completion rate",
        "Seek count analytics",
        "Custom prompt & audio intro template",
        "AI Status column in post list",
        "Priority support",
      ]
    },
    { 
      label: "Agency", sites: "Unlimited Sites", popular: false, 
      description: "For publishers and multiple websites.",
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
    },
    { 
      label: "Freelancer", sites: "10 sites", popular: false, 
      description: "For professionals managing client projects.",
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
    }
  ];

  let activeTiers = fallbackTiers;

  if (freemiusData) {
      console.log("Freemius Data fetched dynamically:", freemiusData);
  }

  const handleCheckout = async (tier) => {
    if (tier.pricingId === "free") {
      window.open("https://wordpress.org/plugins/voxai-ai-audio-summary-for-posts/", "_blank", "noopener,noreferrer");
      return;
    }

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
            className={`vox-billing-toggle__btn${billing === "free" ? " vox-billing-toggle__btn--active" : ""}`}
            onClick={() => setBilling("free")}
          >
            Free
          </button>
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

        <p style={{ textAlign: "center", color: "#fff", marginBottom: "3rem", fontSize: "1.1rem", fontWeight: 500 }}>
          Start free, validate engagement, upgrade when your audience grows.
        </p>

        {/* Cards grid */}
        <div className="vox-tier-grid" style={billing === "free" ? { display: "flex", justifyContent: "center" } : {}}>
          {activeTiers.filter(tier => {
            if (billing === "free") return tier.pricingId === "free";
            return tier.pricingId !== "free" && (billing === "monthly" ? tier.monthly !== null : true);
          }).map((tier, idx) => (
            <motion.div
              key={tier.label}
              className={`vox-tier-card${tier.popular ? " vox-tier-card--popular" : ""}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              {(tier.popular || tier.badge) && (
                <div className="vox-tier-card__badge">{tier.badge || "⭐ Most Popular"}</div>
              )}

              {/* Header */}
              <div className="vox-tier-card__header" style={{ marginBottom: "1.5rem" }}>
                <h3 className="vox-tier-card__title">{tier.label}</h3>
                <p className="vox-tier-card__sites" style={{ marginBottom: "0.5rem" }}>License for {tier.sites}</p>
                {tier.description && (
                  <p className="vox-tier-card__desc" style={{ color: "#adaaaa", fontSize: "0.9rem", lineHeight: 1.4 }}>{tier.description}</p>
                )}
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
                    {billing === "free" ? tier.monthly : (billing === "monthly" ? tier.monthly : tier.annual) || "—"}
                  </motion.span>
                  {billing !== "free" && (
                    <span className="vox-tier-card__cycle">
                      {billing === "monthly" ? "/mo" : "/yr"}
                    </span>
                  )}
                </div>
                
                {billing === "annual" && tier.annualEquivalent && tier.annualEquivalent !== "$0" && (
                  <div style={{ fontSize: "0.75rem", color: "#adaaaa" }}>
                    ≈ {tier.annualEquivalent}/mo <span style={{ color: "#ba9eff", fontWeight: "600", marginLeft: "4px" }}>{tier.savings}</span>
                  </div>
                )}
                {billing === "monthly" && tier.pricingId !== "free" && (
                  <div style={{ fontSize: "0.75rem", color: "#8a8a8a", fontStyle: "italic" }}>
                    Higher cost over time
                  </div>
                )}
              </div>

              {/* CTA */}
              <button 
                className={`vox-tier-card__cta${tier.popular ? " vox-tier-card__cta--popular" : ""}`}
                onClick={() => handleCheckout(tier)}
                disabled={!(billing === "monthly" || billing === "free" ? tier.monthly : tier.annual)}
                style={!(billing === "monthly" || billing === "free" ? tier.monthly : tier.annual) ? { opacity: 0.5, cursor: "not-allowed" } : {}}
              >
                {!(billing === "monthly" || billing === "free" ? tier.monthly : tier.annual) 
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
// Plan Comparison — Free vs Pro
// ─────────────────────────────────────────────
const planCategories = [
  {
    name: "Analytics & Tracking",
    accent: true,
    rows: [
      { label: "Analytics dashboard",            free: true,  pro: true,  freeNote: "included",       proNote: "included" },
      { label: "Plays per post + unique listeners", free: true, pro: true },
      { label: "Daily plays chart + top 5 posts", free: true, pro: true },
      { label: "Avg. listen time",               free: false, pro: true,  proNote: "Pro only" },
      { label: "Completion rate",                free: false, pro: true,  proNote: "Pro only" },
      { label: "Seek count per session",         free: false, pro: true,  proNote: "Pro only" },
    ],
  },
  {
    name: "Audio & AI Generation",
    rows: [
      { label: "AI summary (OpenAI / Claude / Gemini)", free: true, pro: true },
      { label: "Text-to-speech — 6 voices, MP3 local",  free: true, pro: true },
      { label: "Cost estimator per post",         free: true, pro: true },
      { label: "Custom audio intro template",     free: false, pro: true, proNote: "Pro only" },
      { label: "Custom system prompt",            free: false, pro: true, proNote: "Pro only" },
    ],
  },
  {
    name: "Automation",
    rows: [
      { label: "Manual generation (editor metabox)", free: true, pro: true },
      { label: "Auto-generate on publish / schedule", free: false, pro: true, proNote: "Pro only" },
      { label: "Bulk generator with cost preview",    free: false, pro: true, proNote: "Pro only" },
    ],
  },
  {
    name: "Player & Frontend",
    rows: [
      { label: "Responsive audio player",         free: true, pro: true },
      { label: "Shortcodes [summary] [tts]",      free: true, pro: true },
      { label: "Sticky player (persistent bar)",  free: false, pro: true, proNote: "Pro only" },
      { label: "Karaoke mode — paragraph sync",   free: false, pro: true, proNote: "Pro only" },
    ],
  },
  {
    name: "Admin & Workflow",
    rows: [
      { label: "Gutenberg & Classic Editor metabox", free: true, pro: true },
      { label: "WP AI Client compatible (WP 7.0)",   free: true, pro: true },
      { label: "AI Status column in post list",       free: false, pro: true, proNote: "Pro only" },
      { label: "Real-time editor monitoring",         free: false, pro: true, proNote: "Pro only" },
      { label: "Priority support + Freemius billing", free: false, pro: true, proNote: "Pro only" },
    ],
  },
];

function PlanCompare() {
  const [activePlan, setActivePlan] = useState("free");

  return (
    <section id="compare" style={{ padding: "6rem 0", background: "linear-gradient(180deg, #0a0a0a 0%, #111 100%)" }}>
      <div className="vox-container">

        {/* Header */}
        <div className="vox-section-header" style={{ marginBottom: "3rem" }}>
          <h2 className="vox-section-title">Everything you get — free and paid.</h2>
          <p className="vox-section-desc" style={{ maxWidth: "480px" }}>
            The Free plan is a complete plugin, not a trial. Upgrade only when you need automation or advanced analytics.
          </p>
        </div>

        {/* Plan toggle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3.5rem" }}>
          <div style={{
            display: "inline-flex",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "9999px",
            padding: "4px",
            gap: "2px",
            position: "relative",
          }}>
            {["free", "pro"].map((plan) => (
              <button
                key={plan}
                onClick={() => setActivePlan(plan)}
                style={{
                  padding: "0.55rem 2rem",
                  borderRadius: "9999px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  transition: "all 0.25s",
                  background: activePlan === plan
                    ? plan === "free"
                      ? "rgba(255,255,255,0.10)"
                      : "linear-gradient(135deg, #ba9eff, #8455ef)"
                    : "transparent",
                  color: activePlan === plan ? "#fff" : "#adaaaa",
                  boxShadow: activePlan === plan && plan === "pro" ? "0 4px 16px rgba(132,85,239,0.35)" : "none",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.03em",
                }}
              >
                {plan === "free" ? "Free  $0" : "Pro  from $9.99/mo"}
              </button>
            ))}
          </div>
        </div>

        {/* Feature table */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", 
          gap: "1.25rem", 
          alignItems: "stretch",
          maxWidth: "960px",
          margin: "0 auto"
        }}>
          {planCategories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gridColumn: idx === planCategories.length - 1 ? "1 / -1" : undefined,
                borderRadius: "1.25rem",
                overflow: "hidden",
                border: cat.accent
                  ? "1px solid rgba(186,158,255,0.22)"
                  : "1px solid rgba(255,255,255,0.06)",
                background: cat.accent
                  ? "rgba(186,158,255,0.03)"
                  : "rgba(255,255,255,0.02)",
              }}
            >
              {/* Category header */}
              <div style={{
                padding: "0.9rem 1.5rem",
                borderBottom: cat.accent
                  ? "1px solid rgba(186,158,255,0.12)"
                  : "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                background: cat.accent ? "rgba(186,158,255,0.05)" : "rgba(255,255,255,0.02)",
              }}>
                {cat.accent && (
                  <span style={{
                    display: "inline-block",
                    width: "6px", height: "6px",
                    borderRadius: "50%",
                    background: "#ba9eff",
                    boxShadow: "0 0 8px #ba9eff",
                    flexShrink: 0,
                  }} />
                )}
                <span style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: cat.accent ? "#ba9eff" : "#adaaaa",
                }}>{cat.name}</span>
              </div>

              {/* Rows */}
              {cat.rows.map((row, i) => {
                const isAvailable = activePlan === "free" ? row.free : row.pro;
                const note = activePlan === "free" ? row.freeNote : row.proNote;
                const isProOnly = !row.free && row.pro;
                const isHighlight = cat.accent && i === 0;

                return (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.85rem 1.5rem",
                      borderBottom: i < cat.rows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      background: isHighlight ? "rgba(186,158,255,0.04)" : "transparent",
                      transition: "background 0.2s",
                    }}
                  >
                    {/* Label */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flex: 1 }}>
                      {isHighlight ? (
                        <BarChart2 style={{ width: 15, height: 15, color: "#ba9eff", flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: 15, height: 15, flexShrink: 0 }} />
                      )}
                      <span style={{
                        fontSize: "0.9rem",
                        color: isAvailable ? (isHighlight ? "#fff" : "#e0e0e0") : "#4a4a4a",
                        fontWeight: isHighlight ? 700 : 400,
                        transition: "color 0.25s",
                      }}>
                        {row.label}
                      </span>
                      {isHighlight && activePlan === "free" && (
                        <span style={{
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "#0a0a0a",
                          background: "#ba9eff",
                          borderRadius: "9999px",
                          padding: "2px 8px",
                          marginLeft: "4px",
                        }}>
                          Free
                        </span>
                      )}
                      {isProOnly && activePlan === "free" && (
                        <span style={{
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          color: "#ba9eff",
                          background: "rgba(186,158,255,0.1)",
                          borderRadius: "9999px",
                          padding: "2px 7px",
                          marginLeft: "4px",
                          border: "1px solid rgba(186,158,255,0.2)",
                        }}>
                          Pro
                        </span>
                      )}
                    </div>

                    {/* Status indicator */}
                    <div style={{ flexShrink: 0, marginLeft: "1rem" }}>
                      {isAvailable ? (
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                        }}>
                          {note && activePlan === "free" && isHighlight && (
                            <span style={{ fontSize: "0.75rem", color: "#ba9eff", fontStyle: "italic" }}>{note}</span>
                          )}
                          <div style={{
                            width: 22, height: 22,
                            borderRadius: "50%",
                            background: isHighlight ? "#ba9eff" : "rgba(186,158,255,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                            <Check style={{ fill: "transparent", width: 12, height: 12, color: isHighlight ? "#000" : "#ba9eff" }} />
                          </div>
                        </div>
                      ) : (
                        <div style={{
                          width: 22, height: 22,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.04)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <X style={{ width: 11, height: 11, color: "#3a3a3a" }} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="https://wordpress.org/plugins/voxai-ai-audio-summary-for-posts/"
            target="_blank"
            rel="noopener noreferrer"
            className="vox-btn-primary"
            style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
          >
            Install Free — No card needed
          </a>
          <button
            className="vox-btn-ghost"
            onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
          >
            See Pro pricing ↓
          </button>
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

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    const isPt = document.documentElement.lang === 'pt' || 
                 (document.querySelector('.goog-te-combo') && document.querySelector('.goog-te-combo').value === 'pt');
    
    const audioSrc = isPt 
      ? "/assets/voxai/audio/alloy_gpt-4o-mini-tts_1x_2026-05-18T22_17_30-607Z-pt-br.wav"
      : "/assets/voxai/audio/alloy_gpt-4o-mini-tts_1x_2026-05-18T22_16_51-968Z.wav";

    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.onended = () => setIsPlaying(false);
    } else if (audioRef.current.src && !audioRef.current.src.includes(audioSrc.split('/').pop())) {
      audioRef.current.pause();
      audioRef.current.src = audioSrc;
      audioRef.current.load();
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

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
              Turn any WordPress post into audio automatically
            </h1>

            <p className="vox-hero__desc">
              Most visitors won't read every word. Let them listen instead. Convert articles into audio and create a better experience for readers, mobile users and long form content.
            </p>

            <div className="vox-hero__actions">
              <a href="https://wordpress.org/plugins/voxai-ai-audio-summary-for-posts/" target="_blank" rel="noopener noreferrer" className="vox-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>Install Free Plugin</a>
              <button className="vox-btn-ghost" onClick={toggleAudio}>
                {isPlaying ? "Pause Demo" : "Listen to Demo"}
              </button>
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
                  <h3 className="vox-player__title">Article: How to Improve SEO in WordPress</h3>
                  <p className="vox-player__subtitle">Audio generated automatically</p>
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
                    <button className="vox-play-btn" onClick={toggleAudio}>
                      {isPlaying ? (
                        <Pause style={{ fill: "currentColor", width: 24, height: 24, marginLeft: 0 }} />
                      ) : (
                        <Play style={{ fill: "currentColor", width: 24, height: 24, marginLeft: 3 }} />
                      )}
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
            <h2 className="vox-section-title">Turn articles into content people consume differently</h2>
            <p className="vox-section-desc">Give visitors another way to consume your content without changing your workflow.</p>
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

      {/* ── Easy Setup Section */}
      <section id="setup" style={{ padding: "6rem 0", background: "linear-gradient(180deg, #0a0a0a 0%, #131313 100%)" }}>
        <div className="vox-container">
          <div className="vox-section-header" style={{ marginBottom: "4rem" }}>
            <h2 className="vox-section-title" style={{ fontSize: "2.5rem" }}>Configure once. Works on every post.</h2>
            <p className="vox-section-desc" style={{ maxWidth: "440px" }}>Three tabs. A few dropdowns. That's all it takes to go from zero to automatic audio on every article you publish.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>

            {/* Step 1 – General */}
            <div className="vox-setup-row vox-setup-row--text-left">
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "50%", background: "rgba(186,158,255,0.15)", border: "1px solid rgba(186,158,255,0.3)", marginBottom: "1.5rem" }}>
                  <span style={{ color: "#ba9eff", fontWeight: 700, fontSize: "1.1rem" }}>1</span>
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", lineHeight: "1.1em" }}>Connect your OpenAI key</h3>
                <a
                  href="https://platform.openai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block", fontSize: "0.85rem", color: "#ba9eff", opacity: 0.8, marginBottom: "1rem", textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  platform.openai.com ↗
                </a>
                <p style={{ color: "#adaaaa", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  Paste your OpenAI API key in the General tab. VoxAI uses it to generate both text summaries and audio — no middleman, no markup.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {["Choose UI theme (light / dark / neutral)", "Set player position (before or after content)", "Enable on posts, pages or custom types"].map(item => (
                    <li key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", color: "#adaaaa", fontSize: "0.95rem" }}>
                      <Check style={{ width: 16, height: 16, color: "#ba9eff", flexShrink: 0, marginTop: "3px" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 48px rgba(0,0,0,0.5)" }}>
                <img
                  src="/assets/voxai/img/voxai-setup-general.webp"
                  alt="VoxAI General Settings tab showing API key field, UI theme and post type configuration"
                  width={1918}
                  height={910}
                  style={{ display: "block", width: "100%", height: "auto" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Step 2 – Summary */}
            <div className="vox-setup-row vox-setup-row--text-right">
              <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 48px rgba(0,0,0,0.5)" }}>
                <img
                  src="/assets/voxai/img/voxai-setup-summary.webp"
                  alt="VoxAI Summary (Text) tab showing GPT-4o Mini model selection, summary length limit and format options"
                  width={1917}
                  height={913}
                  style={{ display: "block", width: "100%", height: "auto" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "50%", background: "rgba(186,158,255,0.15)", border: "1px solid rgba(186,158,255,0.3)", marginBottom: "1.5rem" }}>
                  <span style={{ color: "#ba9eff", fontWeight: 700, fontSize: "1.1rem" }}>2</span>
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Pick your AI model for summaries</h3>
                <p style={{ color: "#adaaaa", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  The Summary tab lets you choose the model that reads and condenses your articles. By default it uses <strong style={{ color: "#fff" }}>GPT-4o Mini</strong> — fast, accurate and among the most cost-effective options OpenAI offers.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {["AI model: GPT-4o Mini (Fast & Cheap)", "Summary length: up to 350 characters", "Format: paragraph or bulleted list"].map(item => (
                    <li key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", color: "#adaaaa", fontSize: "0.95rem" }}>
                      <Check style={{ width: 16, height: 16, color: "#ba9eff", flexShrink: 0, marginTop: "3px", fill: "transparent" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step 3 – Audio */}
            <div className="vox-setup-row vox-setup-row--text-left">
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "50%", background: "rgba(186,158,255,0.15)", border: "1px solid rgba(186,158,255,0.3)", marginBottom: "1.5rem" }}>
                  <span style={{ color: "#ba9eff", fontWeight: 700, fontSize: "1.1rem" }}>3</span>
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Set voice, model and permissions</h3>
                <p style={{ color: "#adaaaa", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  The Audio tab controls the text-to-speech output. Choose a voice, pick between standard and HD quality, and define which WordPress roles can generate or delete audio on posts.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {["Voice: Alloy, Echo, Fable, Onyx, Nova, Shimmer", "Model: tts-1 ($0.015/1k) or tts-1-hd", "Permissions per role: Admin, Editor, Author, Contributor"].map(item => (
                    <li key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", color: "#adaaaa", fontSize: "0.95rem" }}>
                      <Check style={{ width: 16, height: 16, color: "#ba9eff", flexShrink: 0, marginTop: "3px", fill: "transparent" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 48px rgba(0,0,0,0.5)" }}>
                <img
                  src="/assets/voxai/img/voxai-setup-audio.webp"
                  alt="VoxAI Audio (TTS) tab showing voice, model, intro elements and role-based permission controls"
                  width={1917}
                  height={911}
                  style={{ display: "block", width: "100%", height: "auto" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Free vs Pro comparison */}
      <PlanCompare />

      {/* ── Shortcodes */}
      <section className="vox-shortcodes vox-section--dark" id="shortcodes">
        <div className="vox-container vox-shortcodes__grid">
          <div className="vox-shortcodes__text">
            <h2 className="vox-shortcodes__title">Built for WordPress, not bolted onto it.</h2>
            <p className="vox-shortcodes__desc">
              VoxAI feels like a native part of your workflow. Configure once and let every future article automatically become available in audio.
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
          <h2 className="vox-section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Some people read. Others listen.</h2>
          <p className="vox-section-desc" style={{ marginBottom: "2rem" }}>Give visitors a way to consume content on their terms.</p>
          <a href="https://wordpress.org/plugins/voxai-ai-audio-summary-for-posts/" target="_blank" rel="noopener noreferrer" className="vox-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>Install VoxAI Free</a>
        </div>
      </section>
    </>
  );
}
