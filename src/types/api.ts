export interface ImageVersionsRaw {
  large?: string | null;
  medium?: string | null;
  micro?: string | null;
  small?: string | null;
}

export interface UserImageRaw {
  link?: string | null;
  versions?: ImageVersionsRaw | null;
}

export interface SkillRaw {
  id?: number | null;
  level?: number | null;
  name?: string | null;
}

export interface CursusRaw {
  id?: number | null;
  name?: string | null;
  slug?: string | null;
}

export interface CursusUserRaw {
  cursus?: CursusRaw | null;
  id?: number | null;
  level?: number | null;
  skills?: SkillRaw[] | null;
}

export interface ProjectRaw {
  id?: number | null;
  name?: string | null;
  slug?: string | null;
}

export interface ProjectUserRaw {
  cursus_ids?: number[] | null;
  final_mark?: number | null;
  id?: number | null;
  project?: ProjectRaw | null;
  status?: string | null;
  'validated?'?: boolean | null;
}

export interface CampusRaw {
  id?: number | null;
  name?: string | null;
}

export interface UserRaw {
  campus?: CampusRaw[] | null;
  correction_point?: number | null;
  cursus_users?: CursusUserRaw[] | null;
  displayname?: string | null;
  email?: string | null;
  first_name?: string | null;
  id?: number | null;
  image?: UserImageRaw | null;
  last_name?: string | null;
  location?: string | null;
  login?: string | null;
  phone?: string | null;
  pool_year?: string | null;
  projects_users?: ProjectUserRaw[] | null;
  wallet?: number | null;
}
