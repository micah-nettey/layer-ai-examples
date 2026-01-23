import { Layer } from '@layer-ai/sdk';

if (!process.env.LAYER_API_KEY) {
  throw new Error('LAYER_API_KEY environment variable is required');
}

export const layer = new Layer({
  apiKey: process.env.LAYER_API_KEY,
  baseUrl: process.env.LAYER_API_URL,
});
