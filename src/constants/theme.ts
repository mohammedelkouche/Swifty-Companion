export const colors = {
  background: '#F4F7FB',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF3F8',
  text: '#14213D',
  textMuted: '#64748B',
  primary: '#2563EB',
  primaryPressed: '#1D4ED8',
  primarySoft: '#DBEAFE',
  primaryFaint: '#EFF6FF',
  border: '#DCE3EC',
  success: '#15803D',
  successSoft: '#DCFCE7',
  danger: '#B91C1C',
  dangerSoft: '#FEE2E2',
  neutral: '#475569',
  neutralSoft: '#E2E8F0',
  white: '#FFFFFF',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 20,
  pill: 999,
} as const;

export const typography = {
  title: 32,
  sectionTitle: 20,
  body: 16,
  caption: 13,
} as const;
