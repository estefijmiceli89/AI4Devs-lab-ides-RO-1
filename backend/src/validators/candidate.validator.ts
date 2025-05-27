import { EducationLevel } from '@prisma/client';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
