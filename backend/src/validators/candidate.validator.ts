import { EducationLevel } from '@prisma/client';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateCandidate = (data: any): ValidationResult => {
  const errors: string[] = [];

  // Validar campos requeridos
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'educationLevel',
    'institution',
    'degree',
    'graduationYear',
    'currentPosition',
    'currentCompany',
    'totalExperience',
    'startDate',
  ];

  requiredFields.forEach((field) => {
    if (!data[field]) {
      errors.push(`El campo ${field} es requerido`);
    }
  });

  // Validar email
  if (data.email && !isValidEmail(data.email)) {
    errors.push('El email no es válido');
  }

  // Validar teléfono (formato internacional)
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push(
      'El teléfono debe tener formato internacional (ej: +1234567890)',
    );
  }

  // Validar nivel de educación
  if (data.educationLevel) {
    const validLevels = Object.values(EducationLevel);
    if (!validLevels.includes(data.educationLevel)) {
      errors.push('El nivel de educación no es válido');
    }
  }

  // Validar año de graduación
  if (data.graduationYear) {
    const year = parseInt(data.graduationYear);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1950 || year > currentYear + 4) {
      errors.push(
        'El año de graduación debe estar entre 1950 y ' + (currentYear + 4),
      );
    }
  }

  // Validar experiencia total
  if (data.totalExperience) {
    const experience = parseInt(data.totalExperience);
    if (isNaN(experience) || experience < 0 || experience > 50) {
      errors.push('La experiencia total debe estar entre 0 y 50 años');
    }
  }

  // Validar fechas
  if (data.startDate) {
    const startDate = new Date(data.startDate);
    if (isNaN(startDate.getTime()) || startDate > new Date()) {
      errors.push('La fecha de inicio no es válida');
    }
  }

  if (data.endDate) {
    const endDate = new Date(data.endDate);
    const startDate = new Date(data.startDate);
    if (isNaN(endDate.getTime()) || endDate < startDate) {
      errors.push('La fecha de fin debe ser posterior a la fecha de inicio');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Funciones auxiliares de validación
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};
