# VoxAI — AI Audio & Summary for Posts

> **Versão:** 1.0.0 · **Requer:** WordPress 6.0+ · PHP 7.4+ · **Licença:** GPLv2 or later  
> **Autor:** [Caio Ferreira](https://caioferreiradev.com.br) · **Plugin URI:** https://caioferreiradev.com.br/voxai

Transforme seus posts do WordPress em experiências acessíveis com narrações em áudio realistas e resumos inteligentes gerados por Inteligência Artificial.

---

## Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso no Editor](#uso-no-editor)
  - [Gutenberg (Block Editor)](#gutenberg-block-editor)
  - [Classic Editor](#classic-editor)
- [Shortcodes](#shortcodes)
- [API Reference (PHP)](#api-reference-php)
  - [Gerar Áudio — `generate_tts_audio()`](#gerar-áudio--generate_tts_audio)
  - [Gerar Resumo — `generate_summary()`](#gerar-resumo--generate_summary)
  - [Status do Post — `VoxAiAu_Cache`](#status-do-post--voxaiau_cache)
  - [Vozes Disponíveis](#vozes-disponíveis)
- [Filtros & Actions (Hooks)](#filtros--actions-hooks)
- [REST API](#rest-api)
- [Privacidade & Serviços Externos](#privacidade--serviços-externos)
- [FAQ](#faq)
- [Atualizações & Changelog](#atualizações--changelog)

---

## Instalação

### Instalação Automática (Recomendada)

1. Acesse o painel do WordPress → **Plugins → Adicionar novo**.
2. Pesquise por **VoxAI - AI Audio & Summary**.
3. Clique em **Instalar agora** e depois em **Ativar**.
4. Acesse **Configurações → AI Audio & Summary** e insira sua chave de API da OpenAI.

### Instalação Manual

1. Faça o download do arquivo `.zip` do plugin.
2. Acesse o painel do WordPress → **Plugins → Adicionar novo → Carregar plugin**.
3. Selecione o arquivo `.zip` e clique em **Instalar agora**, depois em **Ativar**.
4. Acesse **Configurações → AI Audio & Summary** e insira sua chave de API.

### Obtendo sua chave de API OpenAI

1. Crie uma conta em [platform.openai.com](https://platform.openai.com).
2. Navegue até **API Keys** e clique em **Create new secret key**.
3. Copie a chave e cole em **Configurações → AI Audio & Summary → API Key**.

---

## Configuração

Acesse **WordPress → Configurações → "VoxAI Settings"** para personalizar o comportamento do plugin.

| Campo | Descrição | Padrão |
|---|---|---|
| **API Key** | Chave de API da OpenAI (obrigatória) | — |
| **Modelo de Resumo** | Modelo GPT para geração de resumos | `gpt-4o-mini` |
| **Tamanho do Resumo** | Limite de caracteres do resumo gerado | `350` |
| **Voz Padrão (TTS)** | Voz de narração: Alloy, Echo, Fable, Onyx, Nova, Shimmer | `alloy` |
| **Modelo TTS** | Qualidade do áudio: `tts-1` (rápido) ou `tts-1-hd` (alta qualidade) | `tts-1` |
| **Posição do Widget** | `before_content`, `after_content` ou `disabled` (shortcode manual) | `before_content` |
| **Ler Título** | Inclui o título do post na introdução narrada | Ativado |
| **Ler Autor** | Inclui o autor do post na introdução narrada | Desativado |
| **Ler Data** | Inclui a data de publicação na introdução narrada | Desativado |
| **Post Types** | Tipos de post em que o widget será exibido | `post` |

> **Modo Sandbox:** Para testar a interface sem gastar créditos da OpenAI, use a chave `MOCK_TEST_KEY_123`. O plugin retornará dados simulados de resumo e áudio.

---

## Uso no Editor

### Gutenberg (Block Editor)

1. Abra ou crie um post no WordPress.
2. Na barra lateral (painel direito), localize o painel **"VoxAI"**.
3. Clique em **"Gerar Áudio"** para criar a narração do post.
4. Clique em **"Gerar Resumo"** para criar o resumo TL;DR inteligente.
5. Salve o post — o player e o resumo aparecerão automaticamente no frontend.

### Classic Editor

1. Abra ou crie um post no WordPress.
2. Role a página do editor até encontrar o **metabox VoxAI**.
3. Selecione a voz desejada no seletor de vozes.
4. Clique em **"Gerar Áudio"** ou **"Gerar Resumo"** conforme necessário.
5. Salve o post.

> **Nota:** O resumo e o áudio são preservados mesmo se o post for editado. Ambos só são deletados manualmente pelo botão correspondente no editor.

---

## Shortcodes

Insira o player e o resumo em qualquer lugar do seu tema, sem depender da posição automática.

| Shortcode | Descrição |
|---|---|
| `[voxaiau_tts]` | Renderiza o player de áudio completo |
| `[voxaiau_summary]` | Exibe apenas o resumo inteligente gerado |

**Exemplos de uso:**

```
[voxaiau_tts]

[voxaiau_summary]
```

> **Dica:** Para usar os shortcodes manualmente, defina **Posição do Widget** como `disabled` nas configurações, evitando duplicação.

---

## API Reference (PHP)

Funções PHP disponíveis para integrar o VoxAI a temas, plugins e hooks personalizados.

---

### Gerar Áudio — `generate_tts_audio()`

Envia o conteúdo do post para a API da OpenAI e gera um arquivo MP3, salvando-o no servidor.

```php
$api = VoxAiAu_API::get_instance();
$audio_url = $api->generate_tts_audio( $post_id, $voice, $tts_model );
```

**Parâmetros:**

| Nome | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `$post_id` | `int` | **Sim** | ID do post do WordPress. |
| `$voice` | `string` | Não | Voz TTS: `alloy` \| `echo` \| `fable` \| `onyx` \| `nova` \| `shimmer`. Padrão: `alloy`. |
| `$tts_model` | `string` | Não | Modelo de áudio: `tts-1` ou `tts-1-hd`. Padrão: valor das configurações. |

**Returns (JSON):**

```json
{
  "success": true,
  "audio_url": "https://seusite.com/wp-content/uploads/voxai/2026/04/meu-post-2026-04-27-14-32-00.mp3",
  "has_audio": true
}
```

---

### Gerar Resumo — `generate_summary()`

Envia o conteúdo para o modelo GPT-4o Mini e retorna um resumo TL;DR.

```php
$api = VoxAiAu_API::get_instance();
$summary = $api->generate_summary( $content, $options );
```

**Parâmetros:**

| Nome | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `$content` | `string` | **Sim** | Conteúdo do post do WordPress. |
| `$max_words` | `int` | Não | Número máximo de palavras do resumo. Padrão: `90`. |
| `$title` | `string` | Não | Título do post para contexto adicional do prompt. |

**Returns (JSON):**

```json
{
  "success": true,
  "summary": "O VoxAI transforma posts em áudio...",
  "has_summary": true
}
```

---

### Status do Post — `VoxAiAu_Cache`

Verifica se o post já possui áudio e/ou resumo gerado.

```php
$cache = VoxAiAu_Cache::get_instance();
$has_audio   = $cache->get_audio( $post_id );   // string|false
$has_summary = $cache->get_summary( $post_id ); // string|false
```

**Parâmetros:**

| Nome | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `$post_id` | `int` | **Sim** | ID do post do WordPress. |

**Returns (JSON):**

```json
{
  "has_audio": true,
  "audio_url": "https://seusite.com/wp-content/uploads/voxai/2026/04/my-post.mp3",
  "has_summary": true
}
```

---

### Vozes Disponíveis

Lista todas as vozes TTS disponíveis no plano atual.

```php
$voices = array(
  array( "id" => "alloy",   "label" => "Alloy",   "gender" => "Neu" ),
  array( "id" => "echo",    "label" => "Echo",    "gender" => "M" ),
  array( "id" => "fable",   "label" => "Fable",   "gender" => "F" ),
  array( "id" => "onyx",    "label" => "Onyx",    "gender" => "M" ),
  array( "id" => "nova",    "label" => "Nova",    "gender" => "F" ),
  array( "id" => "shimmer", "label" => "Shimmer", "gender" => "F" ),
);
```

**Returns (JSON):**

```json
{
  "voices": [
    { "id": "alloy",   "label": "Alloy",   "gender": "Neu" },
    { "id": "echo",    "label": "Echo",    "gender": "M"   },
    { "id": "fable",   "label": "Fable",   "gender": "F"   },
    { "id": "onyx",    "label": "Onyx",    "gender": "M"   },
    { "id": "nova",    "label": "Nova",    "gender": "F"   },
    { "id": "shimmer", "label": "Shimmer", "gender": "F"   }
  ]
}
```

---

## Filtros & Actions (Hooks)

O VoxAI expõe filtros e actions para desenvolvedores personalizarem o comportamento sem modificar o core do plugin.

### Filtros

| Filtro | Tipo | Descrição |
|---|---|---|
| `voxaiau_summary_model` | `string` | Sobrescreve o modelo GPT usado para gerar resumos. |
| `voxaiau_summary_system_prompt` | `string` | Sobrescreve o prompt de sistema enviado ao GPT. Recebe `$prompt` e `$content`. |
| `voxaiau_tts_model` | `string` | Sobrescreve o modelo TTS (`tts-1` ou `tts-1-hd`). |
| `voxaiau_tts_voice` | `string` | Sobrescreve a voz padrão do TTS. |
| `voxaiau_tts_custom_intro_text` | `string` | Injeta um texto de introdução fixo antes do conteúdo narrado. Recebe `$text` e `$post`. |

**Exemplo — Trocar o modelo de resumo:**

```php
add_filter( 'voxaiau_summary_model', function( $model ) {
    return 'gpt-4o'; // Usa GPT-4o em vez de GPT-4o Mini
});
```

**Exemplo — Adicionar introdução personalizada ao áudio:**

```php
add_filter( 'voxaiau_tts_custom_intro_text', function( $text, $post ) {
    return 'Bem-vindo ao Meu Site. Você está ouvindo: ' . $post->post_title . '.';
}, 10, 2 );
```

### Actions

| Action | Parâmetros | Descrição |
|---|---|---|
| `voxaiau_audio_generated` | `$post_id`, `$audio_url` | Disparada logo após o MP3 ser salvo no servidor. Ideal para processamento assíncrono (ex: Whisper Karaoke via Pro). |

**Exemplo — Processar o áudio após geração:**

```php
add_action( 'voxaiau_audio_generated', function( $post_id, $audio_url ) {
    // Enfileirar tarefa de transcrição, notificação, etc.
}, 10, 2 );
```

---

## REST API

O plugin registra endpoints REST públicos para integração com o frontend e headless sites.

### `GET /wp-json/voxai/v1/summary/{id}`

Retorna o resumo de um post. Se o resumo ainda não existe, ele é gerado e cacheado automaticamente.

**Autenticação:** Pública para posts com status `publish`. Posts com senha ou privados exigem autenticação.

**Parâmetros de URL:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `id` | `int` | ID do post do WordPress. |

**Resposta de sucesso (200):**

```json
{
  "success": true,
  "summary": "<p>Resumo inteligente gerado pelo VoxAI...</p>",
  "source": "cache"
}
```

> O campo `source` pode ser `"cache"` (resumo já existia) ou `"generated"` (gerado agora).

**Resposta de erro:**

```json
{
  "code": "post_not_found",
  "message": "Post not found.",
  "data": { "status": 404 }
}
```

**Códigos de erro comuns:**

| Código | Status HTTP | Descrição |
|---|---|---|
| `post_not_found` | 404 | Post não encontrado. |
| `rest_forbidden` | 401/403 | Post protegido por senha ou usuário sem permissão. |
| `empty_content` | 404 | Post sem conteúdo para resumir. |
| `missing_api_key` | 500 | API Key da OpenAI não configurada. |
| `api_rate_limit` | 429 | Limite de requisições da OpenAI atingido. |
| `api_unauthorized` | 401 | API Key inválida ou revogada. |

---

## Privacidade & Serviços Externos

O VoxAI envia conteúdo de posts para a **API da OpenAI** apenas quando solicitado explicitamente pelo editor (botão "Gerar Áudio" ou "Gerar Resumo") — **nunca automaticamente**.

- Nenhum dado é armazenado nos servidores do plugin.
- O arquivo MP3 gerado é salvo **localmente** no seu WordPress (`wp-content/uploads/voxai/`).
- A reprodução do áudio nunca aciona a API OpenAI novamente.

**Serviços de terceiros utilizados:**

- [OpenAI API](https://openai.com) — [Termos de Uso](https://openai.com/policies/terms-of-use) · [Política de Privacidade](https://openai.com/policies/privacy-policy)

---

## FAQ

**Preciso de uma conta OpenAI?**  
Sim. O plugin usa a API da OpenAI para gerar resumos e áudio. É necessário uma conta com créditos disponíveis.

**O conteúdo é enviado à OpenAI automaticamente?**  
Não. O conteúdo só é enviado quando você clica explicitamente em "Gerar Resumo" ou "Gerar Áudio" no editor.

**Quanto custa usar?**  
O plugin é gratuito. Você paga diretamente à OpenAI pelo uso da API:
- Resumo típico (GPT-4o Mini, ~1000 palavras): menos de **$0,001 USD**
- Áudio narrado (TTS-1, ~1000 palavras): aproximadamente **$0,02–$0,04 USD**

**O arquivo de áudio fica no meu servidor?**  
Sim. O MP3 é salvo em `wp-content/uploads/voxai/YYYY/MM/` e a reprodução nunca volta a chamar a OpenAI.

**Funciona com Gutenberg e Classic Editor?**  
Sim. O VoxAI tem suporte completo para ambos os editores.

**O resumo é atualizado quando edito o post?**  
Não. O resumo é preservado mesmo após edições no conteúdo — igual ao áudio. Para gerar um novo resumo, delete o existente via botão no editor e clique em **"Gerar Resumo"** novamente.

**Posso usar em tipos de post customizados (CPTs)?**  
Sim. Configure os tipos de post desejados em **Configurações → AI Audio & Summary → Post Types**.

**Funciona com posts muito longos?**  
Sim. Para posts grandes, o plugin usa chunking inteligente: extrai início (40%), meio (20%) e fim (40%) do conteúdo para o resumo. Para o áudio, o texto é segmentado em blocos de 4.000 caracteres e os arquivos MP3 são concatenados automaticamente.

---

## Atualizações & Changelog

Mantenha o plugin sempre atualizado. Novas versões são anunciadas na newsletter e no [repositório GitHub](https://github.com).  
Para atualizar: desative o plugin, instale a nova versão e reative.  
Suas configurações e áudios gerados são preservados entre versões.

### v1.0.0 — Abril 2026

- 🎉 Lançamento público inicial.
- Geração de resumo via OpenAI GPT-4o Mini.
- Player de áudio TTS via OpenAI (6 vozes).
- Estimador de tempo de leitura com suporte a i18n.
- Suporte completo ao painel lateral do Gutenberg.
- Suporte ao metabox do Classic Editor.
- Posição configurável do widget (antes/depois do conteúdo / shortcode).
- Shortcodes: `[voxaiau_tts]`, `[voxaiau_summary]`.
- Geração AJAX com polling de status em tempo real.
- Exibição de custo estimado de API por post.
- Tradução completa para PT-BR.
- Compatibilidade: PHP 7.4+ e WordPress 6.0+.

---

*Built for WordPress · Developed by [caioferreiradev](https://caioferreiradev.com.br)*
