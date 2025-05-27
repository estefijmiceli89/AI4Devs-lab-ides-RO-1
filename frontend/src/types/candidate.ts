export enum EducationLevel {
  SECUNDARIO = 'Secundario',
  TERCIARIO = 'Terciario',
  UNIVERSITARIO = 'Universitario',
  POSGRADO = 'Posgrado',
  DOCTORADO = 'Doctorado',
}

export interface Candidate {
  id: string;
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
  endDate: string | null;
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
  endDate: string | null;
  experienceDescription: string;
}

export type UpdateCandidateDto = Partial<CreateCandidateDto>;
