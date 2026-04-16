/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  AudioLines, 
  Play, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Shuffle, 
  Sparkles, 
  Mic2, 
  Timer, 
  Database, 
  Blocks, 
  CheckCircle2, 
  Check, 
  X, 
  Globe, 
  Share2, 
  Mail, 
  Send,
  ChevronRight
} from "lucide-react";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How it Works", href: "#how-it-works" },
  { name: "Shortcodes", href: "#shortcodes" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

const features = [
  {
    title: "Resumos Inteligentes",
    description: "Gere TL;DR automáticos para seus leitores economizarem tempo.",
    tag: "Processamento Central",
    footer: "Powered by GPT-4o Mini",
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    className: "md:col-span-2 md:row-span-1",
  },
  {
    title: "6 Vozes Premium",
    description: "Qualidade cinematográfica para cada parágrafo.",
    tag: "Narração Humana",
    list: ["Alloy", "Echo", "Fable", "Onyx", "Nova", "Shimmer"],
    className: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Tempo de Leitura",
    description: "Cálculo automático de engajamento para seus posts.",
    icon: <Timer className="w-8 h-8 text-primary" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Armazenamento Local",
    description: "MP3s salvos no seu servidor. Custo de API baixíssimo (< $0.001 por post).",
    icon: <Database className="w-8 h-8 text-secondary" />,
    className: "md:col-span-2 md:row-span-1 flex-col sm:flex-row items-center gap-6",
  },
  {
    title: "Nativo WP",
    description: "Funciona com blocos ou shortcodes.",
    icon: <Blocks className="w-8 h-8 text-secondary" />,
    className: "md:col-span-1 md:row-span-1",
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

export default function App() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white selection:bg-[#ba9eff] selection:text-[#39008c]">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#1a103d]/40 backdrop-blur-xl border-b border-white/5 shadow-[0px_40px_60px_rgba(186,158,255,0.08)]">
        <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent font-headline">
            VoxAI
          </div>
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-400 font-medium hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <button className="bg-gradient-to-br from-[#ba9eff] to-[#8455ef] text-black font-semibold px-6 py-2 rounded-xl hover:scale-105 transition-all active:scale-95">
            Download
          </button>
        </nav>
      </header>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201f1f] border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#ba9eff] pulse-glow"></span>
                <span className="text-xs font-medium uppercase tracking-widest text-[#adaaaa]">
                  Inteligência Artificial para WordPress
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-headline font-extrabold tracking-tight leading-tight mb-6">
                Dê voz ao seu conteúdo com <span className="bg-gradient-to-r from-[#ba9eff] to-[#699cff] bg-clip-text text-transparent">VoxAI</span>
              </h1>
              <p className="text-xl text-[#adaaaa] leading-relaxed mb-10 max-w-xl">
                Transforme posts em áudio e resumos inteligentes com apenas um clique. Engajamento imediato para o seu blog WordPress.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-br from-[#ba9eff] to-[#8455ef] text-black font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-lg shadow-[#ba9eff]/20">
                  Ver Planos
                </button>
                <button className="bg-[#262626]/20 border border-white/10 backdrop-blur-md text-white font-bold px-8 py-4 rounded-xl hover:bg-[#262626]/40 transition-all">
                  Download
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Player Mockup */}
              <div className="glass-surface p-8 rounded-3xl border border-white/10 nebula-glow">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ba9eff] to-[#699cff] flex items-center justify-center">
                    <AudioLines className="text-black w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-white">O Futuro do SEO é Auditivo</h3>
                    <p className="text-sm text-[#adaaaa]">Narração por VoxAI • 2:45 min</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="relative h-1.5 bg-[#262626] rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-[#ba9eff]"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Shuffle className="text-[#adaaaa] w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                    <div className="flex items-center gap-8">
                      <SkipBack className="text-[#adaaaa] w-6 h-6 cursor-pointer hover:text-white transition-colors" />
                      <button className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                        <Play className="fill-current w-6 h-6 ml-1" />
                      </button>
                      <SkipForward className="text-[#adaaaa] w-6 h-6 cursor-pointer hover:text-white transition-colors" />
                    </div>
                    <Volume2 className="text-[#ba9eff] w-5 h-5 cursor-pointer" />
                  </div>
                </div>
              </div>
              {/* Decorative Glows */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ba9eff]/20 blur-[80px] -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#699cff]/10 blur-[100px] -z-10"></div>
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="py-24 px-8 bg-[#131313]" id="features">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-headline font-bold mb-4">Funcionalidades Inteligentes</h2>
              <p className="text-[#adaaaa] max-w-2xl mx-auto">Tudo o que você precisa para tornar seu blog acessível e moderno com o poder da OpenAI.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-auto md:auto-rows-[240px]">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`glass-surface p-8 rounded-3xl flex flex-col justify-between group overflow-hidden relative ${feature.className}`}
                >
                  <div className="z-10">
                    {feature.tag && (
                      <span className="text-xs font-medium uppercase tracking-widest text-[#ba9eff] mb-4 block">
                        {feature.tag}
                      </span>
                    )}
                    <h3 className="text-2xl font-headline font-bold mb-2">{feature.title}</h3>
                    <p className="text-[#adaaaa] text-sm leading-relaxed">{feature.description}</p>
                    
                    {feature.list && (
                      <ul className="mt-4 space-y-2">
                        {feature.list.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-[#adaaaa] text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#699cff]"></span> {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="z-10 flex items-center justify-between">
                    {feature.footer && (
                      <span className="bg-[#ba9eff]/10 text-[#ba9eff] px-3 py-1 rounded-full text-xs font-semibold">
                        {feature.footer}
                      </span>
                    )}
                    {feature.icon}
                  </div>

                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    {feature.icon}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-24 px-8" id="how-it-works">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-headline font-bold mb-4">Como Funciona</h2>
              <p className="text-[#adaaaa]">Três passos simples para dar vida ao seu conteúdo.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="relative group"
                >
                  <div className="mb-8 w-16 h-16 rounded-2xl bg-[#201f1f] border border-white/10 flex items-center justify-center text-2xl font-bold font-headline text-[#ba9eff] group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-[#adaaaa]">{step.description}</p>
                </motion.div>
              ))}
              {/* Decorative Line */}
              <div className="hidden md:block absolute top-8 left-16 right-16 h-[2px] bg-gradient-to-r from-[#ba9eff]/10 via-[#ba9eff]/30 to-[#ba9eff]/10 -z-10"></div>
            </div>
          </div>
        </section>

        {/* Shortcodes Section */}
        <section className="py-24 px-8 bg-[#131313] overflow-hidden" id="shortcodes">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-headline font-bold mb-6">Flexibilidade Total com Shortcodes</h2>
              <p className="text-[#adaaaa] mb-8 text-lg">
                Integre as funcionalidades do VoxAI em qualquer lugar do seu tema WordPress. Seja no topo do post, na sidebar ou em páginas personalizadas.
              </p>
              <div className="space-y-4">
                {[
                  "Compatível com Elementor e Divi",
                  "Estilização via CSS customizado",
                  "Suporte a Gutenberg nativo"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#ba9eff] w-5 h-5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="code-block shadow-2xl">
                <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  <span className="ml-4 text-[#adaaaa]/50 text-xs font-sans">wordpress-shortcodes.php</span>
                </div>
                <div className="space-y-6">
                  <div>
                    <span className="comment block mb-2">// Renderiza o player completo</span>
                    <div className="p-3 bg-[#131313] rounded-lg border border-white/5 hover:border-[#ba9eff]/30 transition-all">
                      <span className="shortcode">[wp_ai_reader]</span>
                    </div>
                  </div>
                  <div>
                    <span className="comment block mb-2">// Exibe apenas o resumo inteligente</span>
                    <div className="p-3 bg-[#131313] rounded-lg border border-white/5 hover:border-[#ba9eff]/30 transition-all">
                      <span className="shortcode">[wp_ai_summary]</span>
                    </div>
                  </div>
                  <div>
                    <span className="comment block mb-2">// Download direto do áudio gerado</span>
                    <div className="p-3 bg-[#131313] rounded-lg border border-white/5 hover:border-[#ba9eff]/30 transition-all">
                      <span className="shortcode">[wp_ai_audio]</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 px-8" id="pricing">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-headline font-bold mb-4">Planos e Preços</h2>
              <p className="text-[#adaaaa]">Escolha o nível de inteligência ideal para o seu projeto.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Free Plan */}
              <div className="bg-[#131313] p-10 rounded-3xl border border-white/5 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Free</h3>
                  <div className="text-4xl font-black mb-4">R$ 0<span className="text-base font-normal text-[#adaaaa]">/mês</span></div>
                  <p className="text-[#adaaaa] text-sm">Ideal para blogueiros iniciantes testarem a tecnologia.</p>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-center gap-3">
                    <Check className="text-[#ba9eff] w-5 h-5" />
                    <span>Geração manual de áudio</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-[#ba9eff] w-5 h-5" />
                    <span>Shortcodes básicos</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#adaaaa]">
                    <X className="w-5 h-5" />
                    <span>Automação de posts</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#adaaaa]">
                    <X className="w-5 h-5" />
                    <span>Suporte prioritário</span>
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl border border-white/10 font-bold hover:bg-[#262626] transition-colors">
                  Começar Agora
                </button>
              </div>
              {/* Pro Plan */}
              <div className="pricing-card pro p-10 rounded-3xl flex flex-col relative">
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#ba9eff] text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-tighter">
                  Mais Popular
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Pro</h3>
                  <div className="text-4xl font-black mb-4 text-[#ba9eff]">R$ 49<span className="text-base font-normal text-[#adaaaa]">/mês</span></div>
                  <p className="text-[#adaaaa] text-sm">Escalabilidade total e automação sem esforço.</p>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-center gap-3">
                    <Check className="text-[#ba9eff] w-5 h-5" />
                    <span className="font-bold">Automação completa</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-[#ba9eff] w-5 h-5" />
                    <span>Vozes ilimitadas OpenAI</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-[#ba9eff] w-5 h-5" />
                    <span>Custom CSS do Player</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-[#ba9eff] w-5 h-5" />
                    <span>Suporte prioritário 24/7</span>
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl bg-[#ba9eff] text-black font-bold hover:scale-[1.02] transition-transform">
                  Assinar Pro
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-8 bg-[#131313]" id="faq">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-headline font-bold mb-4">Perguntas Frequentes</h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-[#1a1919] border border-white/5"
                >
                  <h4 className="text-lg font-bold mb-2">{faq.question}</h4>
                  <p className="text-[#adaaaa] leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#000000] py-16 px-8 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="text-xl font-black text-white font-headline">VoxAI</div>
            <p className="text-[#adaaaa] text-sm">O futuro da leitura é ouvir. Potencialize seu WordPress com IA de elite.</p>
            <div className="flex gap-4">
              <Globe className="text-[#adaaaa] hover:text-[#ba9eff] cursor-pointer transition-colors w-5 h-5" />
              <Share2 className="text-[#adaaaa] hover:text-[#ba9eff] cursor-pointer transition-colors w-5 h-5" />
              <Mail className="text-[#adaaaa] hover:text-[#ba9eff] cursor-pointer transition-colors w-5 h-5" />
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-bold">Produto</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#adaaaa] hover:text-[#ba9eff] transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-[#adaaaa] hover:text-[#ba9eff] transition-colors text-sm">API Reference</a></li>
              <li><a href="#" className="text-[#adaaaa] hover:text-[#ba9eff] transition-colors text-sm">Support</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-bold">Legal</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#adaaaa] hover:text-[#ba9eff] transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-[#adaaaa] hover:text-[#ba9eff] transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-bold">Newsletter</h5>
            <p className="text-[#adaaaa] text-sm">Receba atualizações sobre novas vozes e recursos.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu email" 
                className="bg-[#131313] border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-[#ba9eff] outline-none"
              />
              <button className="bg-[#ba9eff] p-2 rounded-lg text-black hover:scale-105 transition-transform">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#adaaaa] text-sm">© 2024 VoxAI Intelligence. Built for WordPress.</p>
          <p className="text-[#adaaaa] text-sm">Desenvolvido por <span className="text-white font-semibold">caioferreiradev</span></p>
        </div>
      </footer>
    </div>
  );
}
