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
    colSpan: 2,
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
            <h2 className="vox-value-sticky__title">
              Why publishers and content sites use VoxAI
            </h2>
            <p className="vox-value-sticky__desc">
              You’re not paying for audio.<br/><br/>
              You’re paying for better content performance.
            </p>
          </div>

          <div className="vox-value-list">
            {valuePoints.map((point, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1 }}
                className="glass-surface vox-value-card"
              >
                <h3 className="vox-value-card__title">
                  {point.title}
                </h3>
                <p className="vox-value-card__desc" style={{ marginBottom: point.footer ? "1.5rem" : "0" }}>
                  {point.desc}
                </p>
                {point.footer && (
                  <p className="vox-value-card__footer">
                    {point.footer}
                  </p>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="vox-value-highlight"
            >
              <p>
                If VoxAI helps retain even a small percentage of visitors who would otherwise leave, it already pays for itself. <br/>
                <span>And it keeps doing that every time you publish.</span>
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
    <section className="vox-social-proof">
      <div className="vox-container">
        <div className="vox-section-header">
          <h2 className="vox-section-title">Early users testing VoxAI</h2>
          <p className="vox-section-desc">Real sites using audio to improve engagement.</p>
        </div>
        <div className="vox-compare-layout">
          <div className="vox-compare-section vox-compare-section--pro vox-social-card">
            <div className="vox-social-card__header">
              <span className="vox-social-card__name">SEO Blog</span>
              <span className="vox-social-card__stats">~15k monthly visitors</span>
            </div>
            <p className="vox-social-card__text">
              Reason for using VoxAI: "Testing if audio versions reduce bounce rate on 2,000+ word guides."
            </p>
          </div>
          <div className="vox-compare-section vox-compare-section--pro vox-social-card">
            <div className="vox-social-card__header">
              <span className="vox-social-card__name">Niche News Portal</span>
              <span className="vox-social-card__stats">~40k monthly visitors</span>
            </div>
            <p className="vox-social-card__text">
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
    <section className="vox-problem vox-section-pad" style={{ background: "#131313", position: "relative", overflow: "hidden" }}>
      {/* Decorative background elements */}
      <div className="vox-glow vox-glow--top-left" style={{ opacity: 0.3 }} />
      
      <div className="vox-container">
        <div className="vox-section-header">
          <h2 className="vox-section-title" style={{ maxWidth: "800px", margin: "0 auto 1.5rem" }}>
            You worked hard for the click. Don't lose visitors after it.
          </h2>
          <p className="vox-section-desc" style={{ maxWidth: "800px", margin: "0 auto" }}>
            Readers skim. Mobile users multitask. Long articles compete with distractions everywhere. If people don't want to read right now, that doesn't mean they want to leave.
          </p>
        </div>

        <div className="vox-problem__grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", 
          gap: "1.5rem",
          marginBottom: "3rem"
        }}>
          
          <motion.div 
            className="glass-surface vox-problem-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <div className="vox-problem-card__icon vox-problem-card__icon--purple">
              <Clock className="vox-problem-card__icon-svg" />
            </div>
            <h3 className="vox-problem-card__title">Visitors skim</h3>
            <p className="vox-problem-card__desc">
              Most users scan content instead of reading every paragraph.
            </p>
          </motion.div>

          <motion.div 
            className="glass-surface vox-problem-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="vox-problem-card__icon vox-problem-card__icon--red">
              <TrendingDown className="vox-problem-card__icon-svg" />
            </div>
            <h3 className="vox-problem-card__title">Engagement drops</h3>
            <p className="vox-problem-card__desc">
              Long content often loses attention before reaching the end.
            </p>
          </motion.div>

          <motion.div 
            className="glass-surface vox-problem-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="vox-problem-card__icon vox-problem-card__icon--blue">
              <AudioLines className="vox-problem-card__icon-svg" />
            </div>
            <h3 className="vox-problem-card__title">Audio changes consumption</h3>
            <p className="vox-problem-card__desc">
              Give readers another way to consume your content.
            </p>
          </motion.div>
        </div>

        {/* Analytics Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="vox-analytics-showcase"
        >
          {/* Subtle glow behind the images */}
          <div className="vox-glow vox-glow--bottom-left" style={{ opacity: 0.15, left: "20%", bottom: "-10%" }} />

          <div className="vox-analytics-header">
            <div className="vox-analytics-pill">
              <BarChart2 style={{ width: 14, height: 14, color: "#ba9eff" }} />
              <span className="vox-analytics-pill__text">Built-in Analytics</span>
            </div>
            
            <h3 className="vox-analytics-title">See what's actually working</h3>
            <p className="vox-analytics-desc">
              Don't guess if visitors are listening. Track total plays, unique listeners, and monitor performance post by post right from your WordPress dashboard.
            </p>
          </div>

          <div className="vox-analytics-images">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
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
                alignItems: "center",
                background: "rgba(255,255,255,0.02)"
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
              initial={{ opacity: 0, y: 20 }}
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
                alignItems: "center",
                background: "rgba(255,255,255,0.02)"
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
        </motion.div>

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
        <div className="vox-billing-toggle">
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
            Annual <span className="vox-billing-toggle__tag">Best Value</span>
          </button>
        </div>

        <p className="vox-pricing__subtitle">
          Start free, validate engagement, upgrade when your audience grows.
        </p>

        {/* Cards grid */}
        <div className={`vox-tier-grid${billing === "free" ? " vox-tier-grid--centered" : ""}`}>
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
              <div className="vox-tier-card__header">
                <h3 className="vox-tier-card__title">{tier.label}</h3>
                <p className="vox-tier-card__sites">License for {tier.sites}</p>
                {tier.description && (
                  <p className="vox-tier-card__desc">{tier.description}</p>
                )}
              </div>

              {/* Price */}
              <div className="vox-tier-card__price-wrap">
                <div className="vox-tier-card__price-row">
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
                  <div className="vox-tier-card__savings">
                    ≈ {tier.annualEquivalent}/mo <span className="vox-tier-card__savings-highlight">{tier.savings}</span>
                  </div>
                )}
                {billing === "monthly" && tier.pricingId !== "free" && (
                  <div className="vox-tier-card__higher-cost">
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
                    <Check />
                    <span>{f}</span>
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
    <section id="compare" className="vox-compare-section-wrap">
      <div className="vox-container">

        {/* Header */}
        <div className="vox-section-header" style={{ marginBottom: "3rem" }}>
          <h2 className="vox-section-title">Everything you get — free and paid.</h2>
          <p className="vox-section-desc" style={{ maxWidth: "480px" }}>
            The Free plan is a complete plugin, not a trial. Upgrade only when you need automation or advanced analytics.
          </p>
        </div>

        {/* Plan toggle */}
        <div className="vox-compare-toggle-wrap">
          <div className="vox-compare-toggle">
            {["free", "pro"].map((plan) => (
              <button
                key={plan}
                onClick={() => setActivePlan(plan)}
                className={`vox-compare-toggle__btn${activePlan === plan ? ` vox-compare-toggle__btn--active vox-compare-toggle__btn--${plan}` : ""}`}
              >
                {plan === "free" ? "Free  $0" : "Pro  from $9.99/mo"}
              </button>
            ))}
          </div>
        </div>

        {/* Feature table — stack on mobile, grid on desktop */}
        <div className="vox-compare-grid">
          {planCategories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              className={[
                "vox-compare-cat",
                cat.accent && "vox-compare-cat--accent",
                idx === planCategories.length - 1 && "vox-compare-cat--full",
              ].filter(Boolean).join(" ")}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
            >
              {/* Category header */}
              <div className="vox-compare-cat__header">
                {cat.accent && <span className="vox-compare-cat__dot" />}
                <span className="vox-compare-cat__name">{cat.name}</span>
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
                    className={[
                      "vox-compare-row",
                      isHighlight && "vox-compare-row--highlight",
                      i < cat.rows.length - 1 && "vox-compare-row--border",
                    ].filter(Boolean).join(" ")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                  >
                    {/* Label */}
                    <div className="vox-compare-row__label">
                      {isHighlight
                        ? <BarChart2 className="vox-compare-row__icon" />
                        : <div className="vox-compare-row__icon-spacer" />
                      }
                      <span className={[
                        "vox-compare-row__text",
                        !isAvailable && "vox-compare-row__text--off",
                        isHighlight && "vox-compare-row__text--highlight",
                      ].filter(Boolean).join(" ")}>
                        {row.label}
                      </span>
                      {isHighlight && activePlan === "free" && (
                        <span className="vox-compare-badge vox-compare-badge--free">Free</span>
                      )}
                      {isProOnly && activePlan === "free" && (
                        <span className="vox-compare-badge vox-compare-badge--pro">Pro</span>
                      )}
                    </div>

                    {/* Status indicator */}
                    <div className="vox-compare-row__status">
                      {isAvailable ? (
                        <div className="vox-compare-check-wrap">
                          {note && activePlan === "free" && isHighlight && (
                            <span className="vox-compare-note">{note}</span>
                          )}
                          <div className={`vox-compare-check${isHighlight ? " vox-compare-check--accent" : ""}`}>
                            <Check style={{ width: 12, height: 12, color: isHighlight ? "#000" : "#ba9eff" }} />
                          </div>
                        </div>
                      ) : (
                        <div className="vox-compare-x">
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
        <div className="vox-compare-cta">
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
                No usage fees — Pay OpenAI directly
              </span>
            </div>

            <h1 className="vox-hero__title">
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
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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
      <section id="setup" className="vox-setup-section">
        <div className="vox-container">
          <div className="vox-section-header">
            <h2 className="vox-section-title">Configure once. Works on every post.</h2>
            <p className="vox-section-desc" style={{ maxWidth: "440px" }}>Three tabs. A few dropdowns. That's all it takes to go from zero to automatic audio on every article you publish.</p>
          </div>

          <div className="vox-setup-steps">

            {/* Step 1 – General */}
            <div className="vox-setup-row vox-setup-row--text-left vox-setup-step">
              <div>
                <div className="vox-setup-step__number">
                  <span>1</span>
                </div>
                <h3 className="vox-setup-step__title">Connect your OpenAI key</h3>
                <a
                  href="https://platform.openai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vox-setup-step__link"
                >
                  platform.openai.com ↗
                </a>
                <p className="vox-setup-step__desc">
                  Paste your OpenAI API key in the General tab. VoxAI uses it to generate both text summaries and audio — no middleman, no markup.
                </p>
                <ul className="vox-setup-step__list">
                  {["Choose UI theme (light / dark / neutral)", "Set player position (before or after content)", "Enable on posts, pages or custom types"].map(item => (
                    <li key={item} className="vox-setup-step__item">
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="vox-setup-step__image-wrap">
                <img
                  src="/assets/voxai/img/voxai-setup-general.webp"
                  alt="VoxAI General Settings tab showing API key field, UI theme and post type configuration"
                  width={1918}
                  height={910}
                  className="vox-setup-step__image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Step 2 – Summary */}
            <div className="vox-setup-row vox-setup-row--text-right vox-setup-step">
              <div className="vox-setup-step__image-wrap">
                <img
                  src="/assets/voxai/img/voxai-setup-summary.webp"
                  alt="VoxAI Summary (Text) tab showing GPT-4o Mini model selection, summary length limit and format options"
                  width={1917}
                  height={913}
                  className="vox-setup-step__image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <div className="vox-setup-step__number">
                  <span>2</span>
                </div>
                <h3 className="vox-setup-step__title">Pick your AI model for summaries</h3>
                <p className="vox-setup-step__desc">
                  The Summary tab lets you choose the model that reads and condenses your articles. By default it uses <strong style={{ color: "#fff" }}>GPT-4o Mini</strong> — fast, accurate and among the most cost-effective options OpenAI offers.
                </p>
                <ul className="vox-setup-step__list">
                  {["AI model: GPT-4o Mini (Fast & Cheap)", "Summary length: up to 350 characters", "Format: paragraph or bulleted list"].map(item => (
                    <li key={item} className="vox-setup-step__item">
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step 3 – Audio */}
            <div className="vox-setup-row vox-setup-row--text-left vox-setup-step">
              <div>
                <div className="vox-setup-step__number">
                  <span>3</span>
                </div>
                <h3 className="vox-setup-step__title">Set voice, model and permissions</h3>
                <p className="vox-setup-step__desc">
                  The Audio tab controls the text-to-speech output. Choose a voice, pick between standard and HD quality, and define which WordPress roles can generate or delete audio on posts.
                </p>
                <ul className="vox-setup-step__list">
                  {["Voice: Alloy, Echo, Fable, Onyx, Nova, Shimmer", "Model: tts-1 ($0.015/1k) or tts-1-hd", "Permissions per role: Admin, Editor, Author, Contributor"].map(item => (
                    <li key={item} className="vox-setup-step__item">
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="vox-setup-step__image-wrap">
                <img
                  src="/assets/voxai/img/voxai-setup-audio.webp"
                  alt="VoxAI Audio (TTS) tab showing voice, model, intro elements and role-based permission controls"
                  width={1917}
                  height={911}
                  className="vox-setup-step__image"
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
      <section className="vox-final-cta">
        <div className="vox-container vox-final-cta__inner">
          <h2 className="vox-section-title vox-final-cta__title">Some people read. Others listen.</h2>
          <p className="vox-section-desc vox-final-cta__desc">Give visitors a way to consume content on their terms.</p>
          <a href="https://wordpress.org/plugins/voxai-ai-audio-summary-for-posts/" target="_blank" rel="noopener noreferrer" className="vox-btn-primary vox-final-cta__btn">Install VoxAI Free</a>
        </div>
      </section>
    </>
  );
}
