import { apiGet } from '@/api/client';
import type { UserRaw } from '@/types/api';
import type { UserProfile } from '@/types/profile';
import { mapUserRawToProfile } from '@/utils/mappers';
import { normalizeLogin } from '@/utils/validators';

export function getUserByLoginPath(login: string) {
  return `/v2/users/${encodeURIComponent(normalizeLogin(login))}`;
}

export function mapUserResponse(raw: UserRaw): UserProfile {
  return mapUserRawToProfile(raw);
}

export async function getUserByLogin(login: string): Promise<UserProfile> {
  const raw = await apiGet<UserRaw>(getUserByLoginPath(login));
  return mapUserResponse(raw);
}
