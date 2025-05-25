export enum EducationLevel {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TERTIARY = 'TERTIARY',
  UNIVERSITY = 'UNIVERSITY',
  POSTGRADUATE = 'POSTGRADUATE',
  DOCTORATE = 'DOCTORATE',
}

export interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  educationLevel: EducationLevel;
  institution: string;
  degree: string;
  graduationYear: number;
  currentPosition: string;
  currentCompany: string;
  totalExperience: number;
  startDate: string;
  isCurrentlyWorking: boolean;
  endDate?: string | null;
  experienceDescription: string;
  cvPath?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCandidateDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  educationLevel: EducationLevel;
  institution: string;
  degree: string;
  graduationYear: number;
  currentPosition: string;
  currentCompany: string;
  totalExperience: number;
  startDate: string;
  isCurrentlyWorking: boolean;
  endDate?: string | null;
  experienceDescription: string;
}

export type UpdateCandidateDto = Partial<CreateCandidateDto>;
