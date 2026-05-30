# VoxAI — Comparativo de Planos: Free vs Pro

> Análise técnica baseada no código-fonte dos repositórios  
> `voxai-audio-summary-posts` (v1.1.0) e `voxai-audio-summary-posts-pro` (v1.0.1)  
> Atualizado em: Maio de 2026

---

## Resumo Executivo

| | **Free** | **Pro** |
|---|:---:|:---:|
| Versão analisada | 1.1.0 | 1.0.1 |
| Arquivos principais | 9 classes | 3 classes (add-on) |
| Requer plano Free? | — | ✅ Obrigatório |
| Licença | GPLv2+ | GPLv2+ (com licença Freemius) |
| Instalação | WordPress.org | Download direto / upload manual |

---

## 1. Geração de Resumo (Summary)

| Funcionalidade | Free | Pro |
|---|:---:|:---:|
| Geração de resumo via OpenAI (GPT-4o Mini) | ✅ | ✅ herdado |
| Geração de resumo via Claude (Anthropic) | ✅ | ✅ herdado |
| Geração de resumo via Gemini (Google) | ✅ | ✅ herdado |
| Integração com WP AI Client (WordPress 7.0) | ✅ | ✅ herdado |
| Fallback automático entre provedores | ✅ | ✅ herdado |
| Formato de saída: Parágrafo contínuo | ✅ | ✅ herdado |
| Formato de saída: Lista com bullets (•) | ✅ | ✅ herdado |
| Controle de tamanho máximo do resumo (chars) | ✅ | ✅ herdado |
| Prompt do sistema otimizado (editorial/jornalístico) | ✅ | ✅ herdado |
| **Custom System Prompt** (substituição total do prompt padrão) | ❌ | ✅ **PRO** |
| Variável dinâmica `{{summary_limit}}` no prompt customizado | ❌ | ✅ **PRO** |
| Aviso de validação ao salvar prompt sem `{{summary_limit}}` | ❌ | ✅ **PRO** |

**Detalhe técnico Pro:** O hook `voxaiau_summary_system_prompt` permite ao Pro sobrescrever completamente o prompt padrão via `apply_custom_system_prompt()`. O limite de caracteres é injetado via shortcode `{{summary_limit}}` que é substituído em tempo de execução.

---

## 2. Geração de Áudio (Text-to-Speech)

| Funcionalidade | Free | Pro |
|---|:---:|:---:|
| TTS via OpenAI (modelo `tts-1`) | ✅ | ✅ herdado |
| TTS via OpenAI (modelo `tts-1-hd`) | ✅ | ✅ herdado |
| 6 vozes disponíveis (Alloy, Echo, Fable, Onyx, Nova, Shimmer) | ✅ | ✅ herdado |
| Intro automática com GPT (título, autor, data) | ✅ | ✅ herdado |
| Chunking inteligente (textos longos, ~2.500 chars/chunk) | ✅ | ✅ herdado |
| MP3 salvo no servidor (sem chamada de API no playback) | ✅ | ✅ herdado |
| Controle de timeout estendido (150s por chunk) | ✅ | ✅ herdado |
| Leitura de título / autor / data configurável | ✅ | ✅ herdado |
| **Custom Audio Intro Template** (bypass do GPT com template fixo) | ❌ | ✅ **PRO** |
| Variáveis `{{title}}`, `{{author}}`, `{{date}}` no template de intro | ❌ | ✅ **PRO** |
| **Karaoke Mode** (highlight de parágrafos sincronizado com o áudio) | ❌ | ✅ **PRO** |
| Processamento Whisper para timestamps de segmentos | ❌ | ✅ **PRO** |
| Agendamento assíncrono do job Whisper (10s após geração do MP3) | ❌ | ✅ **PRO** |
| Metadata `_voxaiau_whisper_timestamps` (array compacto s/e/t) | ❌ | ✅ **PRO** |
| Status do Whisper (`scheduled` → `processing` → `completed/failed`) | ❌ | ✅ **PRO** |

**Detalhe técnico Pro:** O hook `voxaiau_tts_custom_intro_text` intercepta a geração da intro antes de chegar ao GPT. Se um template for definido, o GPT não é chamado — economizando tokens. O Karaoke usa `whisper-1` (Whisper API) para gerar timestamps `start/end/text` por segmento, salvos em `_voxaiau_whisper_timestamps`.

---

## 3. Automação e Geração em Lote

| Funcionalidade | Free | Pro |
|---|:---:|:---:|
| Geração manual post a post (via metabox/sidebar) | ✅ | ✅ herdado |
| **Auto-Generate on Publish** (geração automática ao publicar) | ❌ | ✅ **PRO** |
| Auto-geração ao agendar post (`future` status) | ❌ | ✅ **PRO** |
| Re-geração ao atualizar post publicado sem áudio | ❌ | ✅ **PRO** |
| Execução via WordPress Cron (`wp_schedule_single_event`) | ❌ | ✅ **PRO** |
| **Bulk Generator** (geração em lote de múltiplos posts) | ❌ | ✅ **PRO** |
| Filtros de lote: sem resumo / sem áudio / sem karaoke / pendentes | ❌ | ✅ **PRO** |
| Seleção de modelo de texto e TTS por lote | ❌ | ✅ **PRO** |
| Estimativa de custo prévia no Bulk Generator | ❌ | ✅ **PRO** |
| Override de modelo por post (`_voxaiau_bulk_text_model`) | ❌ | ✅ **PRO** |
| Status de processamento em tempo real (`_voxaiau_is_processing`) | ❌ | ✅ **PRO** |
| Coluna "AI Status" na lista de posts (com ícones + polling) | ❌ | ✅ **PRO** |
| Coluna AI Status ordenável | ❌ | ✅ **PRO** |

**Detalhe técnico Pro:** O fluxo de auto-geração usa `transition_post_status` + `wp_schedule_single_event` (delay de 5s). O Bulk Generator agenda via AJAX e monitora via polling com `voxaiau_pro_check_any_processing` (1 query SQL otimizada por batch de post_ids).

---

## 4. Player de Áudio (Frontend)

| Funcionalidade | Free | Pro |
|---|:---:|:---:|
| Player de áudio embarcado no post | ✅ | ✅ herdado |
| Resumo colapsável (accordion) | ✅ | ✅ herdado |
| Estimativa de tempo de leitura | ✅ | ✅ herdado |
| Posicionamento configurável (antes/depois do conteúdo/shortcode) | ✅ | ✅ herdado |
| Shortcodes `[voxaiau_summary]` e `[voxaiau_tts]` | ✅ | ✅ herdado |
| **Sticky Player** (player fixo na base da tela ao scrollar) | ❌ | ✅ **PRO** |
| **Karaoke Mode** visual (highlight de parágrafos em tempo real) | ❌ | ✅ **PRO** |
| CSS e JS Pro adicionais no frontend (carregados após o Free) | ❌ | ✅ **PRO** |
| Banner "Upgrade to Pro" oculto para licenciados | ❌ | ✅ **PRO** |

**Detalhe técnico Pro:** O Pro injeta `is_sticky_enabled` e `is_karaoke_enabled` + array `whisper_karaoke` no objeto JS via filtro `voxaiau_public_js_data`. O player Pro carrega `voxai-pro-public.css` e `voxai-pro-public.js` sempre *após* os assets do Free (dependency chain).

---

## 5. Analytics e Estatísticas

| Funcionalidade | Free | Pro |
|---|:---:|:---:|
| Dashboard de Estatísticas (página admin) | ✅ | ✅ herdado |
| KPIs de cobertura: posts com áudio, % cobertura, armazenamento | ✅ | ✅ herdado |
| Total de plays mensais | ✅ | ✅ herdado |
| Ouvintes únicos mensais | ✅ | ✅ herdado |
| Gráfico diário de plays (Chart.js) | ✅ | ✅ herdado |
| Top 5 posts do mês | ✅ | ✅ herdado |
| Painel de detalhes por post (plays + únicos) | ✅ | ✅ herdado |
| Rastreamento básico: play count + sessão única | ✅ | ✅ herdado |
| **Tempo médio de escuta** (Avg. Time / `avg_seconds`) | ❌ | ✅ **PRO** |
| **Taxa de conclusão** (Completion Rate) | ❌ | ✅ **PRO** |
| **Contagem de seeks** (interações de navegação no áudio) | ❌ | ✅ **PRO** |
| Tabela Pro dedicada no banco (`wp_voxaiau_pro_plays`) | ❌ | ✅ **PRO** |
| REST endpoint `/voxai/v1/track-pro` para tracking avançado | ❌ | ✅ **PRO** |
| KPIs Pro injetados no detalhe de post (Avg. Time / Completion) | ❌ | ✅ **PRO** |
| Filtros AJAX `voxaiau_stats_monthly_ajax_kpis` e `voxaiau_stats_post_ajax_stats` | ❌ | ✅ **PRO** |

**Detalhe técnico Free:** A tabela `wp_voxaiau_plays` registra `post_id`, `session_id` e `started_at`.  
**Detalhe técnico Pro:** A tabela `wp_voxaiau_pro_plays` adiciona `seconds_heard`, `duration`, `completed` (bool) e `seek_count`. As métricas são calculadas agregando por mês/post e expostas via hooks de filtro que o Free já prevê nos seus endpoints AJAX.

---

## 6. Admin, Editor e UX

| Funcionalidade | Free | Pro |
|---|:---:|:---:|
| Metabox no Classic Editor (gerar resumo + áudio) | ✅ | ✅ herdado |
| Sidebar panel no Gutenberg (com polling em tempo real) | ✅ | ✅ herdado |
| Estimador de custo por post | ✅ | ✅ herdado |
| Notificações de status no editor | ✅ básico | ✅ melhorado |
| **Monitor de status no Gutenberg** (painel lateral Pro) | ❌ | ✅ **PRO** |
| **Monitor de status no Classic Editor** (polling Pro) | ❌ | ✅ **PRO** |
| Script Gutenberg dedicado (`wp-ai-reader-pro-gutenberg.js`) | ❌ | ✅ **PRO** |
| Metabox desativado visualmente enquanto processa (opacity + grayscale) | ❌ | ✅ **PRO** |
| CSS premium nas páginas de configurações | ❌ | ✅ **PRO** |
| **Bulk Generator** (submenu dedicado no admin) | ❌ | ✅ **PRO** |
| Registro de meta fields para REST API (Gutenberg) | ❌ | ✅ **PRO** |
| Suporte a Freemius (billing, licença, conta) | ❌ | ✅ **PRO** |
| Billing: planos Mensal / Anual / Vitalício | ❌ | ✅ **PRO** |
| Oculta aba "Upgrade to Pro" quando licenciado | ❌ | ✅ **PRO** |

---

## 7. Compatibilidade, Integração e Arquitetura

| Aspecto | Free | Pro |
|---|:---:|:---:|
| WordPress mínimo | 6.0 | 6.0 |
| PHP mínimo | 7.4 | 7.4 |
| Compatível com WordPress 7.0 (WP AI Client) | ✅ | ✅ |
| Editor Gutenberg | ✅ | ✅ |
| Classic Editor plugin | ✅ | ✅ |
| Abilities API (WP 7.0) — `voxai/generate-audio`, `voxai/generate-summary` | ✅ | ✅ |
| GitHub Updater (atualizações automáticas) | ✅ | via Freemius |
| Singleton pattern (instância única) | ✅ | ✅ |
| Auto-loader PSR-4 customizado | ✅ | ❌ (usa `require_once`) |
| Modo mock/sandbox (chave `MOCK_TEST_KEY_123`) | ✅ | — |
| Internacionalização (i18n) — pt_BR incluso | ✅ | ✅ |
| Desinstalação limpa (`uninstall.php`) | ✅ | — |
| Opera como plugin autônomo | ✅ | ❌ (depende do Free) |

---

## 8. Hooks e Extensibilidade

O Free expõe os seguintes hooks que o Pro consome:

| Hook | Tipo | Uso pelo Pro |
|---|---|---|
| `voxaiau_summary_system_prompt` | Filter | Custom System Prompt |
| `voxaiau_tts_custom_intro_text` | Filter | Custom Audio Intro Template |
| `voxaiau_public_js_data` | Filter | Injeta dados do Sticky Player e Karaoke no JS |
| `voxaiau_audio_generated` | Action | Dispara o job do Whisper (Karaoke) |
| `voxaiau_stats_monthly_ajax_kpis` | Filter | Adiciona avg_seconds e completion_rate |
| `voxaiau_stats_post_ajax_stats` | Filter | Adiciona métricas por post |
| `voxaiau_stats_post_detail_kpis` | Action | Injeta cards de KPIs Pro na tela de stats |
| `voxaiau_summary_model` | Filter | Override de modelo de texto no Bulk |
| `voxaiau_tts_model` | Filter | Override de modelo TTS no Bulk |
| `voxaiau_tts_voice` | Filter | Override de voz TTS |
| `voxaiau_auto_generate_statuses` | Filter | Customiza status que disparam auto-geração |
| `voxaiau_show_pro_tab` | Filter | Oculta aba de upgrade (`__return_false`) |

---

## 9. Resumo por Categoria

```
Categoria                   FREE      PRO
────────────────────────────────────────────
Resumo com IA               ████      ████ +Custom Prompt
Áudio TTS                   ████      ████ +Karaoke +Intro Template
Automação/Cron              ░░░░      ████ Auto-publish + Bulk
Bulk Generator              ░░░░      ████ Lote com filtros e custo
Karaoke Mode                ░░░░      ████ Whisper + highlight
Sticky Player               ░░░░      ████ Player fixo
Analytics Básico            ████      ████ Herdado
Analytics Avançado          ░░░░      ████ Tempo + Conclusão + Seeks
Status Columns Admin        ░░░░      ████ Ícones + polling
Editor Monitoring           ░░░░      ████ Gutenberg + Classic
```

---

## 10. Checklist Completo de Features

| Funcionalidade | Free | Pro |
|---|:---:|:---:|
| Geração de Resumo (OpenAI / Claude / Gemini) | ✅ | ✅ |
| TTS Audio (6 vozes, MP3 local) | ✅ | ✅ |
| Estimativa de tempo de leitura | ✅ | ✅ |
| Player & Accordion no frontend | ✅ | ✅ |
| Shortcodes `[voxaiau_summary]` `[voxaiau_tts]` | ✅ | ✅ |
| Dashboard de Estatísticas | ✅ | ✅ |
| Plays mensais + Ouvintes únicos | ✅ | ✅ |
| Metabox Classic Editor | ✅ | ✅ |
| Sidebar Gutenberg | ✅ | ✅ |
| Estimador de custo por post | ✅ | ✅ |
| Integração WP AI Client (WP 7.0) | ✅ | ✅ |
| Abilities API (WP 7.0) | ✅ | ✅ |
| GitHub Updater | ✅ | via Freemius |
| i18n / pt_BR | ✅ | ✅ |
| **Custom System Prompt** | ❌ | ✅ |
| **Custom Audio Intro Template** | ❌ | ✅ |
| **Auto-Generate on Publish/Schedule** | ❌ | ✅ |
| **Bulk Generator** (geração em lote) | ❌ | ✅ |
| **Karaoke Mode** (highlight sincronizado) | ❌ | ✅ |
| **Sticky Player** (player fixo na tela) | ❌ | ✅ |
| **AI Status Column** (lista de posts) | ❌ | ✅ |
| **Status Monitoring** (editor em tempo real) | ❌ | ✅ |
| **Tempo Médio de Escuta** (Analytics) | ❌ | ✅ |
| **Taxa de Conclusão** (Analytics) | ❌ | ✅ |
| **Seek Count** (Analytics) | ❌ | ✅ |
| **REST endpoint `/track-pro`** | ❌ | ✅ |
| **Freemius Billing** (Mensal/Anual/Vitalício) | ❌ | ✅ |

---

*Documento gerado por análise estática do código-fonte dos dois plugins.*  
*Free: `voxai-audio-summary-posts/` — Pro: `voxai-audio-summary-posts-pro/`*
