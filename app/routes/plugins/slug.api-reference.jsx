import { Link, useOutletContext } from "react-router";
import { motion } from "motion/react";
import {
  Code2,
  ChevronRight,
  Mic2,
  FileText,
  Database,
  Radio,
  Webhook,
  Globe,
} from "lucide-react";

// ─────────────────────────────────────────────
// Dados extraídos do DOCUMENTATION.md
// ─────────────────────────────────────────────

const phpMethods = [
  {
    id: "generate-audio",
    icon: <Mic2 />,
    title: "Gerar Áudio",
    class: "VoxAiAu_API",
    method: "generate_tts_audio",
    description:
      "Envia o conteúdo do post para a API da OpenAI e gera um arquivo MP3, salvando-o no servidor.",
    usage: `$api = VoxAiAu_API::get_instance();
$audio_url = $api->generate_tts_audio( $post_id, $voice, $tts_model );`,
    params: [
      { name: "$post_id",   type: "int",    req: true,  desc: "ID do post do WordPress." },
      { name: "$voice",     type: "string", req: false, desc: "Voz TTS: alloy | echo | fable | onyx | nova | shimmer. Padrão: alloy." },
      { name: "$tts_model", type: "string", req: false, desc: "Modelo de áudio: tts-1 ou tts-1-hd. Padrão: valor das configurações." },
    ],
    response: `{
  "success":   true,
  "audio_url": "https://seusite.com/wp-content/uploads/voxai/2026/04/meu-post-2026-04-27-14-32-00.mp3",
  "has_audio": true
}`,
  },
  {
    id: "generate-summary",
    icon: <FileText />,
    title: "Gerar Resumo",
    class: "VoxAiAu_API",
    method: "generate_summary",
    description:
      "Envia o conteúdo para o modelo GPT-4o Mini e retorna um resumo TL;DR.",
    usage: `$api = VoxAiAu_API::get_instance();
$summary = $api->generate_summary( $content, $options );`,
    params: [
      { name: "$content",   type: "string", req: true,  desc: "Conteúdo do post do WordPress." },
      { name: "$max_words", type: "int",    req: false, desc: "Número máximo de palavras do resumo. Padrão: 90." },
      { name: "$title",     type: "string", req: false, desc: "Título do post para contexto adicional do prompt." },
    ],
    response: `{
  "success":     true,
  "summary":     "O VoxAI transforma posts em áudio...",
  "has_summary": true
}`,
  },
  {
    id: "cache-status",
    icon: <Database />,
    title: "Status do Post",
    class: "VoxAiAu_Cache",
    method: "get_audio / get_summary",
    description:
      "Verifica se o post já possui áudio e/ou resumo gerado.",
    usage: `$cache = VoxAiAu_Cache::get_instance();
$has_audio   = $cache->get_audio( $post_id );   // string|false
$has_summary = $cache->get_summary( $post_id ); // string|false`,
    params: [
      { name: "$post_id", type: "int", req: true, desc: "ID do post do WordPress." },
    ],
    response: `{
  "has_audio":   true,
  "audio_url":   "https://seusite.com/wp-content/uploads/voxai/2026/04/my-post.mp3",
  "has_summary": true
}`,
  },
];

const voices = [
  { id: "alloy",   label: "Alloy",   gender: "Neu" },
  { id: "echo",    label: "Echo",    gender: "M"   },
  { id: "fable",   label: "Fable",   gender: "F"   },
  { id: "onyx",    label: "Onyx",    gender: "M"   },
  { id: "nova",    label: "Nova",    gender: "F"   },
  { id: "shimmer", label: "Shimmer", gender: "F"   },
];

const filters = [
  { hook: "voxaiau_summary_model",         type: "string", desc: "Sobrescreve o modelo GPT usado para gerar resumos." },
  { hook: "voxaiau_summary_system_prompt", type: "string", desc: "Sobrescreve o prompt de sistema enviado ao GPT. Recebe $prompt e $content." },
  { hook: "voxaiau_tts_model",             type: "string", desc: "Sobrescreve o modelo TTS (tts-1 ou tts-1-hd)." },
  { hook: "voxaiau_tts_voice",             type: "string", desc: "Sobrescreve a voz padrão do TTS." },
  { hook: "voxaiau_tts_custom_intro_text", type: "string", desc: "Injeta um texto de introdução fixo antes do conteúdo narrado. Recebe $text e $post." },
];

const actions = [
  {
    hook: "voxaiau_audio_generated",
    params: "$post_id, $audio_url",
    desc: "Disparada logo após o MP3 ser salvo no servidor. Ideal para processamento assíncrono.",
  },
];

const restEndpoints = [
  {
    id: "rest-summary",
    method: "GET",
    path: "/wp-json/voxai/v1/summary/{id}",
    description:
      "Retorna o resumo de um post. Se o resumo ainda não existe, ele é gerado e cacheado automaticamente.",
    auth: "Pública para posts com status publish. Posts com senha ou privados exigem autenticação.",
    params: [
      { name: "id", type: "int", desc: "ID do post do WordPress." },
    ],
    response: `{
  "success": true,
  "summary": "<p>Resumo inteligente gerado pelo VoxAI...</p>",
  "source":  "cache"
}`,
    sourceNote: 'O campo source pode ser "cache" (resumo já existia) ou "generated" (gerado agora).',
    errorResponse: `{
  "code":    "post_not_found",
  "message": "Post not found.",
  "data":    { "status": 404 }
}`,
    errorCodes: [
      { code: "post_not_found", status: "404",     desc: "Post não encontrado." },
      { code: "rest_forbidden", status: "401/403", desc: "Post protegido por senha ou usuário sem permissão." },
      { code: "empty_content",  status: "404",     desc: "Post sem conteúdo para resumir." },
      { code: "missing_api_key",status: "500",     desc: "API Key da OpenAI não configurada." },
      { code: "api_rate_limit", status: "429",     desc: "Limite de requisições da OpenAI atingido." },
      { code: "api_unauthorized",status: "401",    desc: "API Key inválida ou revogada." },
    ],
  },
];

const methodColor = { GET: "#699cff", POST: "#ba9eff" };

const navLinks = [
  { id: "generate-audio",   label: "generate_tts_audio()" },
  { id: "generate-summary", label: "generate_summary()" },
  { id: "cache-status",     label: "VoxAiAu_Cache" },
  { id: "voices",           label: "Vozes Disponíveis" },
  { id: "hooks",            label: "Filtros & Actions" },
  { id: "rest-summary",     label: "REST API" },
];

export default function ApiReference() {
  const { project, slug } = useOutletContext();

  return (
    <div className="vox-subpage">
      {/* ── Page header */}
      <div className="vox-subpage__hero vox-section--dark">
        <div className="vox-container">
          <div className="vox-breadcrumb">
            <Link to={`/plugins/${slug}`}>{project.title}</Link>
            <ChevronRight style={{ width: 14, height: 14, opacity: 0.4 }} />
            <span>API Reference</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="vox-subpage__icon">
              <Code2 style={{ width: 28, height: 28, color: "#699cff" }} />
            </div>
            <h1 className="vox-subpage__title">API Reference</h1>
            <p className="vox-subpage__desc">
              Funções PHP disponíveis para integrar o{" "}
              <strong>{project.title}</strong> com temas, plugins e hooks personalizados.
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

          {/* ── PHP Methods */}
          {phpMethods.map((ep, idx) => (
            <motion.section
              key={ep.id}
              id={ep.id}
              className="vox-doc-section vox-api-section"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              {/* Class + method badge */}
              <div className="vox-api-section__path">
                <span className="vox-api-badge" style={{ background: "rgba(105,156,255,.15)", color: "#699cff" }}>
                  PHP
                </span>
                <code className="vox-api-path-code">
                  {ep.class}::{ep.method}()
                </code>
              </div>

              <div className="vox-doc-section__header">
                <span className="vox-doc-section__icon">{ep.icon}</span>
                <h2 className="vox-doc-section__title">{ep.title}</h2>
              </div>

              <p className="vox-doc-section__desc">{ep.description}</p>

              {/* Usage */}
              <p className="vox-doc-section__subtitle">Uso</p>
              <div className="vox-api-response">
                <div className="code-block">
                  <pre className="vox-api-pre">{ep.usage}</pre>
                </div>
              </div>

              {/* Parameters */}
              <p className="vox-doc-section__subtitle">Parâmetros</p>
              <div className="vox-api-params">
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

              {/* Response */}
              <p className="vox-doc-section__subtitle">Retorno (JSON)</p>
              <div className="vox-api-response">
                <div className="code-block">
                  <pre className="vox-api-pre">{ep.response}</pre>
                </div>
              </div>
            </motion.section>
          ))}

          {/* ── Vozes Disponíveis */}
          <motion.section
            id="voices"
            className="vox-doc-section vox-api-section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div className="vox-api-section__path">
              <span className="vox-api-badge" style={{ background: "rgba(105,156,255,.15)", color: "#699cff" }}>
                PHP
              </span>
              <code className="vox-api-path-code">vozes disponíveis</code>
            </div>

            <div className="vox-doc-section__header">
              <span className="vox-doc-section__icon"><Radio /></span>
              <h2 className="vox-doc-section__title">Vozes Disponíveis</h2>
            </div>
            <p className="vox-doc-section__desc">
              Lista todas as vozes TTS disponíveis. Passe o <code className="vox-api-code">id</code> para o parâmetro{" "}
              <code className="vox-api-code">$voice</code> de <code className="vox-api-code">generate_tts_audio()</code>.
            </p>

            <div className="vox-api-params">
              <table className="vox-api-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Label</th>
                    <th>Gênero</th>
                  </tr>
                </thead>
                <tbody>
                  {voices.map((v) => (
                    <tr key={v.id}>
                      <td><code className="vox-api-code">{v.id}</code></td>
                      <td>{v.label}</td>
                      <td><span className="vox-api-type">{v.gender}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="vox-doc-section__subtitle">Retorno (JSON)</p>
            <div className="vox-api-response">
              <div className="code-block">
                <pre className="vox-api-pre">{`{
  "voices": [
    { "id": "alloy",   "label": "Alloy",   "gender": "Neu" },
    { "id": "echo",    "label": "Echo",    "gender": "M"   },
    { "id": "fable",   "label": "Fable",   "gender": "F"   },
    { "id": "onyx",    "label": "Onyx",    "gender": "M"   },
    { "id": "nova",    "label": "Nova",    "gender": "F"   },
    { "id": "shimmer", "label": "Shimmer", "gender": "F"   }
  ]
}`}</pre>
              </div>
            </div>
          </motion.section>

          {/* ── Filtros & Actions */}
          <motion.section
            id="hooks"
            className="vox-doc-section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="vox-doc-section__header">
              <span className="vox-doc-section__icon"><Webhook /></span>
              <h2 className="vox-doc-section__title">Filtros & Actions</h2>
            </div>
            <p className="vox-doc-section__desc">
              O VoxAI expõe filtros e actions para desenvolvedores personalizarem o comportamento sem modificar o core do plugin.
            </p>

            {/* Filters table */}
            <p className="vox-doc-section__subtitle">Filtros</p>
            <div className="vox-api-params">
              <table className="vox-api-table">
                <thead>
                  <tr>
                    <th>Filtro</th>
                    <th>Tipo</th>
                    <th>Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {filters.map((f) => (
                    <tr key={f.hook}>
                      <td><code className="vox-api-code">{f.hook}</code></td>
                      <td><span className="vox-api-type">{f.type}</span></td>
                      <td>{f.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Filter examples */}
            <p className="vox-doc-section__subtitle">Exemplo — Trocar o modelo de resumo</p>
            <div className="vox-api-response">
              <div className="code-block">
                <pre className="vox-api-pre">{`add_filter( 'voxaiau_summary_model', function( $model ) {
    return 'gpt-4o'; // Usa GPT-4o em vez de GPT-4o Mini
});`}</pre>
              </div>
            </div>

            <p className="vox-doc-section__subtitle">Exemplo — Adicionar introdução personalizada ao áudio</p>
            <div className="vox-api-response">
              <div className="code-block">
                <pre className="vox-api-pre">{`add_filter( 'voxaiau_tts_custom_intro_text', function( $text, $post ) {
    return 'Bem-vindo ao Meu Site. Você está ouvindo: ' . $post->post_title . '.';
}, 10, 2 );`}</pre>
              </div>
            </div>

            {/* Actions table */}
            <p className="vox-doc-section__subtitle">Actions</p>
            <div className="vox-api-params">
              <table className="vox-api-table">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Parâmetros</th>
                    <th>Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {actions.map((a) => (
                    <tr key={a.hook}>
                      <td><code className="vox-api-code">{a.hook}</code></td>
                      <td><span className="vox-api-type">{a.params}</span></td>
                      <td>{a.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="vox-doc-section__subtitle">Exemplo — Processar o áudio após geração</p>
            <div className="vox-api-response">
              <div className="code-block">
                <pre className="vox-api-pre">{`add_action( 'voxaiau_audio_generated', function( $post_id, $audio_url ) {
    // Enfileirar tarefa de transcrição, notificação, etc.
}, 10, 2 );`}</pre>
              </div>
            </div>
          </motion.section>

          {/* ── REST API */}
          {restEndpoints.map((ep, idx) => (
            <motion.section
              key={ep.id}
              id={ep.id}
              className="vox-doc-section vox-api-section"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx + 5) * 0.05 }}
            >
              <div className="vox-api-section__path">
                <span
                  className="vox-api-badge"
                  style={{
                    background: `${methodColor[ep.method]}20`,
                    color: methodColor[ep.method],
                  }}
                >
                  {ep.method}
                </span>
                <code className="vox-api-path-code">{ep.path}</code>
              </div>

              <div className="vox-doc-section__header">
                <span className="vox-doc-section__icon"><Globe /></span>
                <h2 className="vox-doc-section__title">REST API — Resumo</h2>
              </div>

              <p className="vox-doc-section__desc">{ep.description}</p>

              <div className="vox-doc-tip">
                <strong>Autenticação:</strong> {ep.auth}
              </div>

              {/* URL params */}
              <p className="vox-doc-section__subtitle">Parâmetros de URL</p>
              <div className="vox-api-params">
                <table className="vox-api-table">
                  <thead>
                    <tr>
                      <th>Parâmetro</th>
                      <th>Tipo</th>
                      <th>Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ep.params.map((p) => (
                      <tr key={p.name}>
                        <td><code className="vox-api-code">{p.name}</code></td>
                        <td><span className="vox-api-type">{p.type}</span></td>
                        <td>{p.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Success response */}
              <p className="vox-doc-section__subtitle">Resposta de sucesso (200)</p>
              <div className="vox-api-response">
                <div className="code-block">
                  <pre className="vox-api-pre">{ep.response}</pre>
                </div>
              </div>
              {ep.sourceNote && (
                <div className="vox-doc-tip" style={{ marginTop: ".75rem" }}>
                  {ep.sourceNote}
                </div>
              )}

              {/* Error response */}
              <p className="vox-doc-section__subtitle">Resposta de erro</p>
              <div className="vox-api-response">
                <div className="code-block">
                  <pre className="vox-api-pre">{ep.errorResponse}</pre>
                </div>
              </div>

              {/* Error codes */}
              <p className="vox-doc-section__subtitle">Códigos de erro comuns</p>
              <div className="vox-api-params">
                <table className="vox-api-table">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Status HTTP</th>
                      <th>Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ep.errorCodes.map((e) => (
                      <tr key={e.code}>
                        <td><code className="vox-api-code">{e.code}</code></td>
                        <td><span className="vox-api-type">{e.status}</span></td>
                        <td>{e.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>
          ))}

        </div>
      </div>
    </div>
  );
}
