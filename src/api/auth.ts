import { AppError, toAppError } from '@/api/errors';

type Token = {
  value: string;
  expiresAt: number;
};

type TokenResponse = {
  access_token?: unknown;
  expires_in?: unknown;
};

const EXPIRY_MARGIN_MS = 60_000;
const REQUEST_TIMEOUT_MS = 10_000;

let token: Token | null = null;
let inflight: Promise<string> | null = null;

function getAuthConfig() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/$/, '');
  const clientId = process.env.EXPO_PUBLIC_CLIENT_ID?.trim();
  const clientSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET?.trim();

  if (!apiUrl || !clientId || !clientSecret) {
    throw new AppError('CONFIG_MISSING');
  }

  return { apiUrl, clientId, clientSecret };
}

function errorFromTokenStatus(status: number) {
  if (status === 400 || status === 401 || status === 403) {
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

async function requestToken(): Promise<string> {
  const { apiUrl, clientId, clientSecret } = getAuthConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${apiUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }).toString(),
      signal: controller.signal,
    });

    if (!response.ok) {
      token = null;
      throw errorFromTokenStatus(response.status);
    }

    let payload: TokenResponse;
    try {
      payload = (await response.json()) as TokenResponse;
    } catch (error) {
      throw new AppError('SERVER_ERROR', { cause: error });
    }
    if (
      typeof payload.access_token !== 'string' ||
      payload.access_token.length === 0 ||
      typeof payload.expires_in !== 'number' ||
      !Number.isFinite(payload.expires_in) ||
      payload.expires_in <= 0
    ) {
      token = null;
      throw new AppError('SERVER_ERROR');
    }

    token = {
      value: payload.access_token,
      expiresAt: Date.now() + payload.expires_in * 1000,
    };

    return token.value;
  } catch (error) {
    token = null;
    throw toAppError(error);
  } finally {
    clearTimeout(timeout);
  }
}

export async function getAccessToken(
  { forceRefresh = false }: { forceRefresh?: boolean } = {},
): Promise<string> {
  if (
    !forceRefresh &&
    token &&
    Date.now() < token.expiresAt - EXPIRY_MARGIN_MS
  ) {
    return token.value;
  }

  if (inflight) {
    return inflight;
  }

  inflight = requestToken().finally(() => {
    inflight = null;
  });

  return inflight;
}

export function invalidateToken() {
  token = null;
}

export const expireTokenNow = __DEV__
  ? () => {
      if (token) {
        token.expiresAt = Date.now() - 1;
      }
    }
  : undefined;

export const corruptToken = __DEV__
  ? () => {
      if (token) {
        token.value = 'invalid';
      }
    }
  : undefined;
