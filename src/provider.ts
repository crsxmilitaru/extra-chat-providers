import { BaseChatProvider } from './baseProvider';
import { MIMO_MODELS } from './models';
import { BASE_URL, MiMoApiClient } from './api';

export class MiMoChatProvider extends BaseChatProvider {
  protected override readonly baseURL = BASE_URL;
  protected override readonly providerDisplayName = 'Xiaomi';
  protected override readonly models = MIMO_MODELS;

  protected override getApiClient(apiKey: string): MiMoApiClient {
    return new MiMoApiClient(apiKey);
  }

  protected override readonly errorMessages: Record<number, string> = {
    400: 'Invalid request format. Check parameters and message format.',
    401: 'Authentication failed. Use the Manage command to set a new key.',
    403: 'Access denied. The service may not be available in your region, or your API key is restricted.',
    421: 'Request blocked by content filter. Avoid unsafe or sensitive content.',
    429: 'Rate limit reached. Please wait and try again.',
    500: 'MiMo server error. Please try again later.',
    503: 'MiMo server overloaded. Please try again later.',
  };
}
