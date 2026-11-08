import { getAccessToken, invalidateToken } from '@/api/auth';
import { getApiConfig } from '@/api/config';
import { AppError, toAppError } from '@/api/errors';

const REQUEST_TIMEOUT_MS = 10_000;

function errorFromApiStatus(status: number) {
  if (status === 404) {
    return new AppError('NOT_FOUND');
  }

  if (status === 401 || status === 403) {
    return new AppError('UNAUTHORIZED');
  }

  if (status === 429) {
    return new AppError('RATE_LIMITED');
  }

  if (status >= 500) {
    return new AppError('SERVER_ERROR');
  }

  return new AppError('UNKNOWN');
}

async function request(path: string, accessToken: string) {
  const { apiUrl } = getApiConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(`${apiUrl}${path}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      signal: controller.signal,
    });
  } catch (error) {
    throw toAppError(error);
  } finally {
    clearTimeout(timeout);
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  try {
    let accessToken = await getAccessToken();
    let response = await request(path, accessToken);

    if (response.status === 401) {
      invalidateToken();
      accessToken = await getAccessToken({ forceRefresh: true });
      response = await request(path, accessToken);
    }

    if (!response.ok) {
      throw errorFromApiStatus(response.status);
    }

    try {
      return (await response.json()) as T;
    } catch (error) {
      throw new AppError('SERVER_ERROR', { cause: error });
    }
  } catch (error) {
    throw toAppError(error);
  }
}
