import { AppError } from '@/api/errors';

export type ApiConfig = {
  apiUrl: string;
  clientId: string;
  clientSecret: string;
};

export function getApiConfig(): ApiConfig {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/$/, '');
  const clientId = process.env.EXPO_PUBLIC_CLIENT_ID?.trim();
  const clientSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET?.trim();

  if (!apiUrl || !clientId || !clientSecret) {
    throw new AppError('CONFIG_MISSING');
  }

  return { apiUrl, clientId, clientSecret };
}
