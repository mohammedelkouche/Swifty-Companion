import { useCallback, useEffect, useState } from 'react';

import { AppError, toAppError } from '@/api/errors';
import { getUserByLogin } from '@/api/users';
import type { UserProfile } from '@/types/profile';
import { isValidLogin, normalizeLogin } from '@/utils/validators';

type ProfileLoadError = Pick<AppError, 'code' | 'message' | 'retryable'>;

export type UserProfileState =
  | { status: 'idle' | 'loading'; data: null; error: null }
  | { status: 'success'; data: UserProfile; error: null }
  | { status: 'error'; data: null; error: ProfileLoadError };

export type UseUserProfileResult = UserProfileState & {
  retry: () => void;
};

type SettledProfileState =
  | { requestKey: string; status: 'success'; data: UserProfile; error: null }
  | { requestKey: string; status: 'error'; data: null; error: ProfileLoadError };

export function useUserProfile(login: string): UseUserProfileResult {
  const normalizedLogin = normalizeLogin(login);
  const [requestVersion, setRequestVersion] = useState(0);
  const [settledState, setSettledState] = useState<SettledProfileState | null>(null);
  const requestKey = `${normalizedLogin}:${requestVersion}`;

  const retry = useCallback(() => {
    setRequestVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    if (!normalizedLogin || !isValidLogin(normalizedLogin)) {
      return undefined;
    }

    getUserByLogin(normalizedLogin)
      .then((data) => {
        if (!isCancelled) {
          setSettledState({
            requestKey,
            status: 'success',
            data,
            error: null,
          });
        }
      })
      .catch((error: unknown) => {
        if (!isCancelled) {
          setSettledState({
            requestKey,
            status: 'error',
            data: null,
            error: toAppError(error),
          });
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [normalizedLogin, requestKey]);

  if (!normalizedLogin) {
    return {
      status: 'error',
      data: null,
      error: new AppError('EMPTY_LOGIN'),
      retry,
    };
  }

  if (!isValidLogin(normalizedLogin)) {
    return {
      status: 'error',
      data: null,
      error: new AppError('INVALID_LOGIN'),
      retry,
    };
  }

  if (!settledState || settledState.requestKey !== requestKey) {
    return { status: 'loading', data: null, error: null, retry };
  }

  return { ...settledState, retry };
}
