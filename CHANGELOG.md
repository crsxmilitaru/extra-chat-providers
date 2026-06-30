# Changelog

## [1.2.0]

- **Xiaomi Provider**:
  - Discover MiMo chat models dynamically from the configured account's `/models` endpoint.
  - Filter non-chat Xiaomi models from the provider model list.
  - Mark image-capable MiMo models correctly, including `mimo-v2.5`.
  - Updated fallback models and connection testing to avoid stale MiMo model IDs.

- **NVIDIA NIM Provider**:
  - Added **DeepSeek V4 Pro** (`deepseek-ai/deepseek-v4-pro`).

**Contributors:**
- [@tabebill](https://github.com/tabebill) (dynamic Xiaomi MiMo model discovery)
- [@mbrevda](https://github.com/mbrevda) (DeepSeek V4 Pro for NVIDIA NIM)

## [1.1.0] - 2026-06-13

- **New provider**: Added Groq API support with the following models:
  - Llama 3.1 8B Instant
  - Llama 3.3 70B Versatile
  - GPT-OSS 120B
  - GPT-OSS 20B
  - Groq Compound
  - Groq Compound Mini
  - Qwen3 32B
  - Base URL: `https://api.groq.com/openai/v1`
  
- **Xiaomi Provider**: Fixed token plan URL and routed it to the sgp endpoint.

- **NVIDIA NIM Provider**: Added new models:
  - **GLM-5.1** (`z-ai/glm-5.1`)
  - **DeepSeek V4 Flash** (`deepseek-ai/deepseek-v4-flash`)
  - **Kimi K2.6** (`moonshotai/kimi-k2.6`)
  - **MiniMax M2.7** (`minimaxai/minimax-m2.7`)
  - **Nemotron 3 Ultra 550B** (`nvidia/nemotron-3-ultra-550b-a55b`)
  - **Nemotron 3 Super 120B** (`nvidia/nemotron-3-super-120b-a12b`)

- **Performance**: Added API client caching to avoid recreating clients on each request.

- **Refactoring**:
  - Consolidated provider registration using data-driven approach in `extension.ts`.
  - Added `createAuthManager()` factory function in `baseAuth.ts`.
  - Added const assertions to model arrays for better type inference.

**Contributors:**
- [@mojahid2021](https://github.com/mojahid2021) (Groq API, NVIDIA NIM models, client caching, registration refactoring)
- [@tabebill](https://github.com/tabebill) (Xiaomi token plan URL and sgp routing fix)

## [1.0.1] - 2026-06-13

- **Z.ai Provider**:
  - Added **GLM-5.2** model support.
  - Added reasoning/thinking configuration support for GLM models (None/High/Max reasoning effort settings).

## [1.0.0] - 2026-04-05

- Initial release
