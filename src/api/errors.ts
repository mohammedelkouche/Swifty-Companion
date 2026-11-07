export type AppErrorCode =
  | 'EMPTY_LOGIN'
  | 'INVALID_LOGIN'
  | 'NOT_FOUND'
  | 'NETWORK'
  | 'TIMEOUT'
  | 'RATE_LIMITED'
  | 'UNAUTHORIZED'
  | 'SERVER_ERROR'
  | 'CONFIG_MISSING'
  | 'UNKNOWN';

type ErrorDefinition = {
  message: string;
  retryable: boolean;
};

const ERROR_DEFINITIONS: Record<AppErrorCode, ErrorDefinition> = {
  EMPTY_LOGIN: {
    message: 'Please enter a login.',
    retryable: false,
  },
  INVALID_LOGIN: {
    message: "This doesn't look like a valid login.",
    retryable: false,
  },
  NOT_FOUND: {
    message: 'Login not found.',
    retryable: false,
  },
  NETWORK: {
    message: 'No internet connection. Check your network and try again.',
    retryable: true,
  },
  TIMEOUT: {
    message: 'The request took too long. Try again.',
    retryable: true,
  },
  RATE_LIMITED: {
    message: 'Too many requests. Wait a moment and try again.',
    retryable: true,
  },
  UNAUTHORIZED: {
    message: 'Authentication with 42 failed.',
    retryable: true,
  },
  SERVER_ERROR: {
    message: 'The 42 API is having issues. Try again later.',
    retryable: true,
  },
  CONFIG_MISSING: {
    message: 'App is not configured (missing .env values).',
    retryable: false,
  },
  UNKNOWN: {
    message: 'Something went wrong.',
    retryable: true,
  },
};

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly retryable: boolean;

  constructor(code: AppErrorCode, options?: { cause?: unknown }) {
    const definition = ERROR_DEFINITIONS[code];
    super(definition.message, options);
    this.name = 'AppError';
    this.code = code;
    this.retryable = definition.retryable;
  }
}

export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error && error.name === 'AbortError') {
    return new AppError('TIMEOUT', { cause: error });
  }

  if (error instanceof TypeError) {
    return new AppError('NETWORK', { cause: error });
  }

  return new AppError('UNKNOWN', { cause: error });
}
