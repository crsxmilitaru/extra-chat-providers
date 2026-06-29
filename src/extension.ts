import * as vscode from 'vscode';
import { AuthManager } from './auth';
import { GlmAuthManager } from './glmAuth';
import { GlmChatProvider } from './glmProvider';
import { GroqAuthManager } from './groqAuth';
import { GroqChatProvider } from './groqProvider';
import { NvidiaAuthManager } from './nvidiaAuth';
import { NvidiaChatProvider } from './nvidiaProvider';
import { fetchXiaomiChatModels, MiMoChatProvider } from './provider';
import { MiMoApiClient } from './api';
import { GlmApiClient } from './glmApi';
import { GroqApiClient } from './groqApi';
import { NvidiaNimApiClient } from './nvidiaApi';
import { GenericApiClient } from './baseApi';
import type { BaseAuthManager } from './baseAuth';

const PROVIDER_VENDORS = {
  xiaomi: 'crsx.xiaomi',
  glm: 'crsx.glm',
  groq: 'crsx.groq',
  nvidia: 'crsx.nvidia',
} as const;

interface ProviderConfig {
  id: keyof typeof PROVIDER_VENDORS;
  displayName: string;
  vendor: string;
  authManager: BaseAuthManager;
  provider: vscode.LanguageModelChatProvider;
  manageActions: Record<string, () => Promise<void>>;
}

type TestModelResolver = string | ((key: string) => Promise<string>);

async function testConnection(
  authManager: BaseAuthManager,
  clientFactory: (key: string) => GenericApiClient,
  modelId: TestModelResolver,
  providerDisplayName: string,
): Promise<void> {
  const key = await authManager.getApiKey();
  if (!key) {
    const shouldSetKey = await vscode.window.showInformationMessage(
      `${providerDisplayName} API key is not set. Would you like to set it now?`,
      'Set API Key',
    );
    if (shouldSetKey === 'Set API Key') {
      await authManager.promptForApiKey();
    }
    return;
  }

  const client = clientFactory(key);
  try {
    const testModelId = typeof modelId === 'function' ? await modelId(key) : modelId;
    await client.chat(testModelId, [{ role: 'user', content: 'Ping' }], {
      maxTokens: 1,
    });
    vscode.window.showInformationMessage(`${providerDisplayName} provider test succeeded.`);
  } catch (error) {
    let message = `${providerDisplayName} test failed: ${String(error)}`;
    if (error && typeof error === 'object' && 'statusCode' in error && error.statusCode === 401) {
      message = 'Invalid API key. Please set a new key.';
    } else if (error instanceof Error) {
      message = `${providerDisplayName} test failed: ${error.message}`;
    }
    vscode.window.showErrorMessage(message);
  }
}

async function getLatestXiaomiChatModel(apiKey: string): Promise<string> {
  const [model] = await fetchXiaomiChatModels(apiKey);
  if (!model) {
    throw new Error('Xiaomi did not return any chat-capable MiMo models');
  }
  return model.id;
}

function registerProviderSafely(
  context: vscode.ExtensionContext,
  providerId: string,
  displayName: string,
  provider: vscode.LanguageModelChatProvider,
): void {
  try {
    context.subscriptions.push(vscode.lm.registerLanguageModelChatProvider(providerId, provider));
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error);
    console.error(`Failed to register ${displayName} provider (${providerId}): ${details}`);
    void vscode.window.showWarningMessage(
      `Extra Chat Providers: ${displayName} is unavailable (${details}).`,
    );
  }
}

export function activate(context: vscode.ExtensionContext): void {
  const xiaomiAuthManager = new AuthManager(context.secrets);
  const glmAuthManager = new GlmAuthManager(context.secrets);
  const groqAuthManager = new GroqAuthManager(context.secrets);
  const nvidiaAuthManager = new NvidiaAuthManager(context.secrets);

  const providers: ProviderConfig[] = [
    {
      id: 'xiaomi',
      displayName: 'Xiaomi',
      vendor: PROVIDER_VENDORS.xiaomi,
      authManager: xiaomiAuthManager,
      provider: new MiMoChatProvider(xiaomiAuthManager),
      manageActions: {
        'Set API Key': () => xiaomiAuthManager.promptForApiKey().then(() => { }),
        'Clear API Key': () => xiaomiAuthManager.deleteApiKey().then(() => { vscode.window.showInformationMessage('Xiaomi API key cleared'); }),
        'Test Connection': () => testConnection(xiaomiAuthManager, (key) => new MiMoApiClient(key), getLatestXiaomiChatModel, 'Xiaomi'),
      },
    },
    {
      id: 'glm',
      displayName: 'Z.ai',
      vendor: PROVIDER_VENDORS.glm,
      authManager: glmAuthManager,
      provider: new GlmChatProvider(glmAuthManager),
      manageActions: {
        'Set API Key': () => glmAuthManager.promptForApiKey().then(() => { }),
        'Clear API Key': () => glmAuthManager.deleteApiKey().then(() => { vscode.window.showInformationMessage('Z.ai API key cleared'); }),
        'Test Connection': () => testConnection(glmAuthManager, (key) => new GlmApiClient(key), 'glm-4.7-flash', 'Z.ai'),
      },
    },
    {
      id: 'groq',
      displayName: 'Groq',
      vendor: PROVIDER_VENDORS.groq,
      authManager: groqAuthManager,
      provider: new GroqChatProvider(groqAuthManager),
      manageActions: {
        'Set API Key': () => groqAuthManager.promptForApiKey().then(() => { }),
        'Clear API Key': () => groqAuthManager.deleteApiKey().then(() => { vscode.window.showInformationMessage('Groq API key cleared'); }),
        'Test Connection': () => testConnection(groqAuthManager, (key) => new GroqApiClient(key), 'llama-3.3-70b-versatile', 'Groq'),
      },
    },
    {
      id: 'nvidia',
      displayName: 'NVIDIA NIM',
      vendor: PROVIDER_VENDORS.nvidia,
      authManager: nvidiaAuthManager,
      provider: new NvidiaChatProvider(nvidiaAuthManager),
      manageActions: {
        'Set API Key': () => nvidiaAuthManager.promptForApiKey().then(() => { }),
        'Clear API Key': () => nvidiaAuthManager.deleteApiKey().then(() => { vscode.window.showInformationMessage('NVIDIA NIM API key cleared'); }),
        'Test Connection': () => testConnection(nvidiaAuthManager, (key) => new NvidiaNimApiClient(key), 'google/gemma-4-31b-it', 'NVIDIA NIM'),
      },
    },
  ];

  const commands: vscode.Disposable[] = [];

  for (const config of providers) {
    registerProviderSafely(context, config.vendor, config.displayName, config.provider);

    commands.push(
      vscode.commands.registerCommand(`extra-chat-providers.${config.id}.manage`, async () => {
        const choice = await vscode.window.showQuickPick(Object.keys(config.manageActions), {
          placeHolder: `Manage ${config.displayName} provider`,
        });
        if (choice) { await config.manageActions[choice](); }
      }),
    );
  }

  context.subscriptions.push(...commands);
}

export function deactivate(): void { }
