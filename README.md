<!-- markdownlint-disable MD033 -->

<h1 align="center">🤖 Extra Chat Providers</h1>

<p align="center">
  <strong>Bring more AI power to VS Code with additional chat providers</strong>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=crsx.extra-chat-providers"><img src="https://vsmarketplacebadges.dev/version/crsx.extra-chat-providers.png" alt="VS Marketplace Version"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=crsx.extra-chat-providers"><img src="https://vsmarketplacebadges.dev/downloads/crsx.extra-chat-providers.png" alt="VS Marketplace Downloads"></a>
  <br>
  <a href="https://github.com/crsxmilitaru/extra-chat-providers"><img src="https://img.shields.io/badge/GitHub-Repository-181717?logo=github&logoColor=white" alt="GitHub"></a>
  <a href="https://github.com/crsxmilitaru/extra-chat-providers/stargazers"><img src="https://img.shields.io/github/stars/crsxmilitaru/extra-chat-providers?logo=github" alt="GitHub Stars"></a>
  <a href="https://github.com/crsxmilitaru/extra-chat-providers/blob/main/LICENSE"><img src="https://img.shields.io/github/license/crsxmilitaru/extra-chat-providers?style=flat" alt="License"></a>
  <a href="https://www.paypal.com/donate?hosted_button_id=MZQS5CZ68NGEW"><img src="https://img.shields.io/badge/Donate-PayPal-00457C?logo=paypal&logoColor=white" alt="Donate"></a>
</p>

---

<p align="center">
  <img src="https://raw.githubusercontent.com/crsxmilitaru/extra-chat-providers/main/icon.png" alt="Extra Chat Providers Icon" style="width: 128px; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
</p>

## ✨ Features

- **Xiaomi MiMo**: Integration for Xiaomi's AI models directly in your chat. Automatically supports both Pay-as-you-go (`sk-...`) and Token Plan (`tp-...`) API keys, routes to the correct endpoints, and discovers available chat models from Xiaomi's API.
- **Z.ai (GLM)**: Support for Z.ai GLM-4 and GLM-5 models.
- **NVIDIA NIM**: OpenAI-compatible support for models from the NVIDIA API Catalog.
- **Native Integration**: Works seamlessly with the VS Code `LanguageModelChat` API.
- **Advanced Capabilities**: Supports streaming responses, tool calling, and thinking block rendering.
- **Secure Key Storage**: No leaked keys! We use VS Code's built-in Secret Storage for your API keys.
- **Connectivity Testing**: Built-in commands to verify your setup works correctly.

## 📖 Available Models

### Xiaomi

Xiaomi models are loaded dynamically from the provider's `/models` endpoint for the configured API key. Non-chat models such as ASR and TTS variants are filtered out before models are shown in VS Code.

Bundled fallback models:

| Model | Context Window | Max Output | Image Input | Tool Calling |
|---|---|---|---|---|
| **MiMo-V2.5-Pro** (`mimo-v2.5-pro`) | 1,048,576 | 131,072 | No | Yes |
| **MiMo-V2.5** (`mimo-v2.5`) | 262,144 | 131,072 | No | Yes |

### Z.AI

| Model | Context Window | Max Output | Image Input | Tool Calling |
|---|---|---|---|---|
| **GLM-5.2** | 1,000,000 | 131,072 | No | Yes |
| **GLM-5.1** | 204,800 | 131,072 | No | Yes |
| **GLM-5V-Turbo** | 204,800 | 131,072 | Yes | Yes |
| **GLM-5 Turbo** | 204,800 | 131,072 | No | Yes |
| **GLM-5** | 204,800 | 131,072 | No | Yes |
| **GLM-4.7** | 204,800 | 131,072 | No | Yes |
| **GLM-4.7 Flash** | 204,800 | 131,072 | No | Yes |
| **GLM-4.6** | 204,800 | 131,072 | No | Yes |
| **GLM-4.5** | 131,072 | 98,304 | No | Yes |
| **GLM-4.5 Air** | 131,072 | 98,304 | No | Yes |

### Groq

| Model | Context Window | Max Output | Image Input | Tool Calling |
|---|---|---|---|---|
| **Llama 3.3 70B Versatile** (`llama-3.3-70b-versatile`) | 131,072 | 32,768 | No | Yes |
| **Llama 3.1 8B Instant** (`llama-3.1-8b-instant`) | 131,072 | 131,072 | No | Yes |
| **GPT-OSS 120B** (`openai/gpt-oss-120b`) | 131,072 | 65,536 | No | Yes |
| **GPT-OSS 20B** (`openai/gpt-oss-20b`) | 131,072 | 65,536 | No | Yes |
| **Groq Compound** (`groq/compound`) | 131,072 | 8,192 | No | No |
| **Groq Compound Mini** (`groq/compound-mini`) | 131,072 | 8,192 | No | No |
| **Qwen3 32B** (`qwen/qwen3-32b`) | 131,072 | 40,960 | No | Yes |

### NVIDIA NIM

| Model | Context Window | Max Output | Image Input | Tool Calling |
|---|---|---|---|---|
| **Gemma 4 31B IT** (`google/gemma-4-31b-it`) | 262,144 | 8,192 | Yes | Yes |
| **Nemotron 3 Ultra 550B** (`nvidia/nemotron-3-ultra-550b-a55b`) | 1,048,576 | 16,384 | No | Yes |
| **Nemotron 3 Super 120B** (`nvidia/nemotron-3-super-120b-a12b`) | 1,048,576 | 16,384 | No | Yes |
| **DeepSeek V4 Flash** (`deepseek-ai/deepseek-v4-flash`) | 1,048,576 | 16,384 | No | Yes |
| **MiniMax M2.7** (`minimaxai/minimax-m2.7`) | 204,800 | 16,384 | No | Yes |
| **MiniMax M2.5** (`minimaxai/minimax-m2.5`) | 204,800 | 16,384 | No | Yes |
| **Step 3.5 Flash** (`stepfun-ai/step-3.5-flash`) | 262,144 | 16,384 | No | Yes |
| **GLM-5.1** (`z-ai/glm-5.1`) | 131,072 | 16,384 | No | Yes |
| **GLM-4.7** (`z-ai/glm-4.7`) | 204,800 | 16,384 | No | Yes |
| **Devstral 2 123B Instruct** (`mistralai/devstral-2-123b-instruct-2512`) | 262,144 | 16,384 | No | Yes |
| **Kimi K2 Instruct 0905** (`moonshotai/kimi-k2-instruct-0905`) | 262,144 | 16,384 | No | Yes |
| **Kimi K2.6** (`moonshotai/kimi-k2.6`) | 262,144 | 16,384 | Yes | Yes |
| **Qwen3 Coder 480B** (`qwen/qwen3-coder-480b-a35b-instruct`) | 262,144 | 16,384 | No | Yes |
| **Kimi K2 Instruct** (`moonshotai/kimi-k2-instruct`) | 131,072 | 16,384 | No | Yes |
| **Magistral Small 2506** (`mistralai/magistral-small-2506`) | 131,072 | 16,384 | No | No |
| **Granite 3.3 8B Instruct** (`ibm/granite-3.3-8b-instruct`) | 131,072 | 8,192 | No | Yes |
| **QwQ 32B** (`qwen/qwq-32b`) | 131,072 | 32,768 | No | No |
| **Falcon 3 7B Instruct** (`tiiuae/falcon3-7b-instruct`) | 32,768 | 8,192 | No | No |

## 🚀 Usage

1. **Install** the extension from the VS Code Marketplace or Open VSX.
2. Open your **Language Models** panel in VS Code.
3. Click **Add Provider** and select **Xiaomi**, **Z.ai**, **Groq**, or **NVIDIA NIM**.
4. Enter your API key when prompted.
5. You can now select models from these providers in GitHub Copilot Chat.

> Note: VS Code currently exposes extension-contributed language model providers to users on individual GitHub Copilot plans.

## ⚙️ Commands

- `extra-chat-providers.xiaomi.manage`: Manage Xiaomi provider (set/clear API key, test connection).
- `extra-chat-providers.glm.manage`: Manage Z.ai (GLM) provider (set/clear API key, test connection).
- `extra-chat-providers.groq.manage`: Manage Groq provider (set/clear API key, test connection).
- `extra-chat-providers.nvidia.manage`: Manage NVIDIA NIM provider (set/clear API key, test connection).

## 🔒 Security & Privacy

- **Local Processing**: The extension acts as a bridge between VS Code and the provider APIs.
- **No Mid-man**: Your requests go directly to the provider endpoints.
- **Encrypted Keys**: API keys are stored in the OS-level keychain via VS Code.

---

<p align="center">
  <strong>💖 Support the Development</strong><br><br>
  If you find this extension useful, consider buying me a coffee!<br><br>
  <a href="https://www.paypal.com/donate?hosted_button_id=MZQS5CZ68NGEW">
    <img src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" alt="Donate with PayPal" />
  </a>
</p>

---

<p align="center">
  <strong>🙏 Thank you for using Extra Chat Providers!</strong>
</p>
