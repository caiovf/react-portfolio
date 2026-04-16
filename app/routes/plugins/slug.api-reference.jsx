import { Link, useOutletContext } from "react-router";
import { motion } from "motion/react";
import { Code2, ChevronRight, Cpu, Mic2, FileText, Clock } from "lucide-react";

// ─────────────────────────────────────────────
// Tipos e endpoints da API
// ─────────────────────────────────────────────
const endpoints = [
  {
    id: "generate-audio",
    method: "POST",
    path: "wp_ai_generate_audio",
    badge: "POST",
    title: "Gerar Áudio",
    icon: <Mic2 />,
    description: "Envia o conteúdo de um post para a API da OpenAI e gera o arquivo MP3, salvando-o no servidor.",
    params: [
      { name: "post_id",    type: "int",     req: true,  desc: "ID do post do WordPress." },
      { name: "voice",      type: "string",  req: false, desc: "Voz TTS. Padrão: alloy. Opções: alloy | echo | fable | onyx | nova | shimmer." },
      { name: "overwrite",  type: "boolean", req: false, desc: "Se true, substitui o arquivo de áudio existente." },
    ],
    response: `{
  "success": true,
  "audio_url": "https://seu-site.com/wp-content/uploads/voxai/post-42.mp3",
  "duration":  "2m 34s"
}`,
  },
  {
    id: "generate-summary",
    method: "POST",
    path: "wp_ai_generate_summary",
    badge: "POST",
    title: "Gerar Resumo",
    icon: <FileText />,
    description: "Envia o conteúdo do post para o modelo GPT-4o Mini e retorna um resumo TL;DR.",
    params: [
      { name: "post_id",    type: "int",     req: true,  desc: "ID do post do WordPress." },
      { name: "max_words",  type: "int",     req: false, desc: "Número máximo de palavras no resumo. Padrão: 80." },
      { name: "language",   type: "string",  req: false, desc: "Idioma do resumo. Padrão: pt-BR." },
    ],
    response: `{
  "success": true,
  "summary": "O VoxAI transforma posts em áudio de alta qualidade usando a API da OpenAI, ..."
}`,
  },
  {
    id: "get-status",
    method: "GET",
    path: "wp_ai_status",
    badge: "GET",
    title: "Status do Post",
    icon: <Clock />,
    description: "Verifica se o post já possui áudio e/ou resumo gerado.",
    params: [
      { name: "post_id", type: "int", req: true, desc: "ID do post do WordPress." },
    ],
    response: `{
  "has_audio":   true,
  "audio_url":   "https://seu-site.com/wp-content/uploads/voxai/post-42.mp3",
  "has_summary": true,
  "summary":     "O VoxAI transforma posts em áudio..."
}`,
  },
  {
    id: "voices",
    method: "GET",
    path: "wp_ai_voices",
    badge: "GET",
    title: "Vozes Disponíveis",
    icon: <Mic2 />,
    description: "Lista todas as vozes TTS disponíveis no plano atual.",
    params: [],
    response: `{
  "voices": [
    { "id": "alloy",   "label": "Alloy",   "plan": "free" },
    { "id": "echo",    "label": "Echo",    "plan": "free" },
    { "id": "fable",   "label": "Fable",   "plan": "pro"  },
    { "id": "onyx",    "label": "Onyx",    "plan": "pro"  },
    { "id": "nova",    "label": "Nova",    "plan": "pro"  },
    { "id": "shimmer", "label": "Shimmer", "plan": "pro"  }
  ]
}`,
  },
];

const methodColor = { GET: "#699cff", POST: "#ba9eff" };

export default function ApiReference() {
  const { project, slug } = useOutletContext();

  return (
    <div className="vox-subpage">
      {/* ── Page header */}
      <div className="vox-subpage__hero vox-section--dark">
        <div className="vox-container">
          <div className="vox-breadcrumb">
            <Link to={`/plugins/${slug}`}>{project.title}</Link>
            <ChevronRight style={{ width: 14, height: 14, opacity: .4 }} />
            <span>API Reference</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5 }}
          >
            <div className="vox-subpage__icon">
              <Code2 style={{ width: 28, height: 28, color: "#699cff" }} />
            </div>
            <h1 className="vox-subpage__title">API Reference</h1>
            <p className="vox-subpage__desc">
              Funções PHP disponíveis para integrar o <strong>{project.title}</strong> com
              temas, plugins e hooks personalizados.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Content */}
      <div className="vox-container vox-subpage__body">
        <aside className="vox-subpage__sidebar">
          <nav className="vox-doc-nav">
            <p className="vox-doc-nav__title">Endpoints</p>
            {endpoints.map((ep) => (
              <a key={ep.id} href={`#${ep.id}`} className="vox-doc-nav__link">
                <span
                  className="vox-doc-nav__badge"
                  style={{ color: methodColor[ep.method] }}
                >
                  {ep.method}
                </span>
                {ep.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className="vox-subpage__content">
          {endpoints.map((ep, idx) => (
            <motion.section
              key={ep.id}
              id={ep.id}
              className="vox-doc-section vox-api-section"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              {/* Method + path */}
              <div className="vox-api-section__path">
                <span
                  className="vox-api-badge"
                  style={{ background: `${methodColor[ep.method]}20`, color: methodColor[ep.method] }}
                >
                  {ep.method}
                </span>
                <code className="vox-api-path-code">{ep.path}()</code>
              </div>

              <div className="vox-doc-section__header">
                <span className="vox-doc-section__icon">{ep.icon}</span>
                <h2 className="vox-doc-section__title">{ep.title}</h2>
              </div>

              <p className="vox-doc-section__desc">{ep.description}</p>

              {/* Parameters */}
              {ep.params.length > 0 && (
                <div className="vox-api-params">
                  <p className="vox-api-params__title">Parâmetros</p>
                  <table className="vox-api-table">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Obrig.</th>
                        <th>Descrição</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ep.params.map((p) => (
                        <tr key={p.name}>
                          <td><code className="vox-api-code">{p.name}</code></td>
                          <td><span className="vox-api-type">{p.type}</span></td>
                          <td>
                            {p.req
                              ? <span className="vox-api-req">Sim</span>
                              : <span className="vox-api-opt">Não</span>}
                          </td>
                          <td>{p.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Response */}
              <div className="vox-api-response">
                <p className="vox-api-params__title">Retorno (JSON)</p>
                <div className="code-block">
                  <pre className="vox-api-pre">{ep.response}</pre>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
