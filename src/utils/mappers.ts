import type {
  CursusUserRaw,
  ProjectUserRaw,
  SkillRaw,
  UserRaw,
} from '@/types/api';
import type { ProjectResult, Skill, UserProfile } from '@/types/profile';

const MAIN_CURSUS_SLUG = '42cursus';
const MAX_SKILL_LEVEL = 20;

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const finiteNumber = (value: number | null | undefined, fallback = 0) =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;

const nonEmptyString = (value: string | null | undefined) => {
  const normalized = value?.trim();
  return normalized ? normalized : null;
};

export function selectMainCursus(
  cursusUsers: CursusUserRaw[] | null | undefined,
): CursusUserRaw | null {
  if (!Array.isArray(cursusUsers) || cursusUsers.length === 0) {
    return null;
  }

  const mainCursus = cursusUsers.find(
    (entry) => entry.cursus?.slug === MAIN_CURSUS_SLUG,
  );

  if (mainCursus) {
    return mainCursus;
  }

  return cursusUsers.reduce((highest, entry) =>
    finiteNumber(entry.level) > finiteNumber(highest.level) ? entry : highest,
  );
}

export function mapSkills(skills: SkillRaw[] | null | undefined): Skill[] {
  if (!Array.isArray(skills)) {
    return [];
  }

  return skills
    .flatMap((skill) => {
      const name = nonEmptyString(skill.name);
      if (!name) {
        return [];
      }

      const level = Math.max(finiteNumber(skill.level), 0);
      const percentage = Math.round(
        clamp((level / MAX_SKILL_LEVEL) * 100, 0, 100) * 10,
      ) / 10;

      return [{ name, level, percentage }];
    })
    .sort((left, right) => right.level - left.level);
}

export function mapProjects(
  projectUsers: ProjectUserRaw[] | null | undefined,
): ProjectResult[] {
  if (!Array.isArray(projectUsers)) {
    return [];
  }

  return projectUsers
    .filter((projectUser) => projectUser.status === 'finished')
    .map((projectUser, index) => ({
      id: String(
        projectUser.id ??
          projectUser.project?.id ??
          projectUser.project?.slug ??
          `finished-project-${index}`,
      ),
      name:
        nonEmptyString(projectUser.project?.name) ??
        nonEmptyString(projectUser.project?.slug) ??
        'Unknown project',
      finalMark:
        typeof projectUser.final_mark === 'number' &&
        Number.isFinite(projectUser.final_mark)
          ? projectUser.final_mark
          : null,
      validated:
        typeof projectUser['validated?'] === 'boolean'
          ? projectUser['validated?']
          : null,
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

function getDisplayName(raw: UserRaw, login: string) {
  const directName = nonEmptyString(raw.displayname);
  if (directName) {
    return directName;
  }

  const fullName = [nonEmptyString(raw.first_name), nonEmptyString(raw.last_name)]
    .filter(Boolean)
    .join(' ');

  return fullName || login;
}

function getPhone(phone: string | null | undefined) {
  const value = nonEmptyString(phone);
  return value?.toLowerCase() === 'hidden' ? 'Hidden' : value;
}

export function mapUserRawToProfile(raw: UserRaw): UserProfile {
  const login = nonEmptyString(raw.login) ?? 'unknown';
  const mainCursus = selectMainCursus(raw.cursus_users);
  const rawLevel = Math.max(finiteNumber(mainCursus?.level), 0);
  const campus = raw.campus
    ?.map((entry) => nonEmptyString(entry.name))
    .find((name): name is string => Boolean(name));

  return {
    login,
    displayName: getDisplayName(raw, login),
    email: nonEmptyString(raw.email) ?? 'Unavailable',
    phone: getPhone(raw.phone),
    imageUrl:
      nonEmptyString(raw.image?.versions?.medium) ??
      nonEmptyString(raw.image?.link),
    location: nonEmptyString(raw.location),
    wallet: finiteNumber(raw.wallet),
    correctionPoints: finiteNumber(raw.correction_point),
    poolYear: nonEmptyString(raw.pool_year),
    campus: campus ?? null,
    level: Math.floor(rawLevel),
    levelProgress: Math.round((rawLevel % 1) * 100),
    skills: mapSkills(mainCursus?.skills),
    projects: mapProjects(raw.projects_users),
  };
}
