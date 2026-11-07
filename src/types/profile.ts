export type Skill = {
  name: string;
  level: number;
  percentage: number;
};

export type ProjectResult = {
  id: string;
  name: string;
  finalMark: number | null;
  validated: boolean | null;
};

export type UserProfile = {
  login: string;
  displayName: string;
  email: string;
  phone: string | null;
  imageUrl: string | null;
  location: string | null;
  wallet: number;
  correctionPoints: number;
  poolYear: string | null;
  campus: string | null;
  level: number;
  levelProgress: number;
  skills: Skill[];
  projects: ProjectResult[];
};
