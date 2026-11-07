const LOGIN_PATTERN = /^[a-z0-9_-]{2,30}$/;

export function normalizeLogin(value: string) {
  return value.trim().toLowerCase();
}

export function isValidLogin(value: string) {
  return LOGIN_PATTERN.test(value);
}
