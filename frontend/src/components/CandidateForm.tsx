import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Paper,
  Container,
  useTheme,
} from '@mui/material';
import { Grid } from '@mui/material';
import { EducationLevel, CreateCandidateDto } from '@/types/candidate';
import CVUpload from './CVUpload';
import { useNavigate } from 'react-router-dom';
import { candidateService } from '../services/candidateService';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'Debe tener al menos 3 letras')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras'),
  lastName: yup
    .string()
    .required('El apellido es requerido')
    .min(3, 'Debe tener al menos 3 letras')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras'),
  email: yup
    .string()
    .required('El email es requerido')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email inválido. Debe tener el formato nombre@dominio.tld',
    ),
  phone: yup
    .string()
    .required('El teléfono es requerido')
    .matches(/^[0-9]+$/, 'Solo números')
    .min(6, 'Debe tener al menos 6 números'),
  educationLevel: yup.string().required('El nivel de educación es requerido'),
  institution: yup
    .string()
    .required('La institución es requerida')
    .min(3, 'Debe tener al menos 3 letras')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras'),
  degree: yup
    .string()
    .required('El título es requerido')
    .min(3, 'Debe tener al menos 3 letras')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras'),
  graduationYear: yup
    .number()
    .typeError('El año de graduación es requerido')
    .required('El año de graduación es requerido')
    .min(1950, 'El año debe ser posterior a 1950')
    .max(new Date().getFullYear(), 'El año no puede ser en el futuro')
    .test('is-four-digits', 'El año debe tener 4 dígitos', (value) => {
      if (!value) return true;
      return value.toString().length === 4;
    }),
  currentPosition: yup
    .string()
    .required('El puesto actual es requerido')
    .min(3, 'Debe tener al menos 3 letras')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras'),
  currentCompany: yup
    .string()
    .required('La empresa actual es requerida')
    .min(3, 'Debe tener al menos 3 letras')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras'),
  totalExperience: yup
    .number()
    .typeError('Los años de experiencia son requeridos')
    .required('Los años de experiencia son requeridos')
    .min(1, 'La experiencia debe ser al menos 1 año')
    .max(80, 'La experiencia no puede ser mayor a 80 años'),
  startDate: yup
    .string()
    .required('La fecha de inicio es requerida')
    .test('not-future', 'La fecha no puede ser futura', function (value) {
      if (!value) return true;
      return new Date(value) <= new Date();
    })
    .test('min-date', 'La fecha debe ser posterior a 1950', function (value) {
      if (!value) return true;
      return new Date(value) >= new Date('1950-01-01');
    }),
  isCurrentlyWorking: yup.boolean(),
  endDate: yup
    .string()
    .nullable()
    .test('not-future', 'La fecha no puede ser futura', function (value) {
      if (!value) return true;
      return new Date(value) <= new Date();
    })
    .test('min-date', 'La fecha debe ser posterior a 1950', function (value) {
      if (!value) return true;
      return new Date(value) >= new Date('1950-01-01');
    })
    .test(
      'after-start',
      'La fecha de fin debe ser posterior a la fecha de inicio',
      function (value) {
        const startDate = this.parent.startDate;
        if (!value || !startDate) return true;
        return new Date(value) > new Date(startDate);
      },
    ),
  experienceDescription: yup
    .string()
    .required('La descripción de la experiencia es requerida')
    .min(3, 'Debe tener al menos 3 letras'),
}) as yup.ObjectSchema<CreateCandidateDto>;

interface CandidateFormProps {
  onSubmit: (data: CreateCandidateDto, cvFile: File | null) => void;
  initialData?: Partial<CreateCandidateDto>;
}

const defaultValues: CreateCandidateDto = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  educationLevel: '' as EducationLevel,
  institution: '',
  degree: '',
  graduationYear: 0,
  currentPosition: '',
  currentCompany: '',
  totalExperience: 0,
  startDate: '',
  isCurrentlyWorking: true,
  endDate: null,
  experienceDescription: '',
};

export const CandidateForm = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [apiErrors, setApiErrors] = useState<{ [key: string]: string }>({});
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<CreateCandidateDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const isCurrentlyWorking = watch('isCurrentlyWorking');
  const [cvFile, setCvFile] = useState<File | null>(null);

  const onSubmit = async (data: CreateCandidateDto) => {
    clearErrors();
    setApiErrors({});
    try {
      // 1. Crear candidato
      const response = await candidateService.createCandidate(data);
      const candidateId = response.id || response.data?.id;
      // 2. Si hay archivo CV, subirlo
      if (cvFile && candidateId) {
        await candidateService.uploadCV(candidateId, cvFile);
      }
      navigate('/');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorsFromApi = error.response.data.error;
        const fieldErrors: { [key: string]: string } = {};
        errorsFromApi.forEach((err: any) => {
          if (err.path && err.path[0]) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setApiErrors(fieldErrors);
      }
    }
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, '');
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 4 }}>
          Formulario de Candidato
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Formulario de candidato"
        >
          {/* Información Personal */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Información Personal
            </Typography>
            <Grid container spacing={2} direction="column">
              <Grid>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nombre"
                      fullWidth
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      aria-label="Nombre"
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                      onInput={handleTextInput}
                    />
                  )}
                />
              </Grid>
              <Grid>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Apellido"
                      fullWidth
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      aria-label="Apellido"
                      aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                      onInput={handleTextInput}
                    />
                  )}
                />
              </Grid>
              <Grid>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      fullWidth
                      error={!!errors.email || !!apiErrors.email}
                      helperText={errors.email?.message || apiErrors.email}
                      aria-label="Email"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  )}
                />
              </Grid>
              <Grid>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Teléfono"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      aria-label="Teléfono"
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      onInput={handleNumberInput}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          {/* Educación */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Educación
            </Typography>
            <Grid container spacing={2} direction="column">
              <Grid>
                <Controller
                  name="educationLevel"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nivel de educación"
                      select
                      fullWidth
                      error={!!errors.educationLevel}
                      helperText={errors.educationLevel?.message}
                      aria-label="Nivel de educación"
                      aria-describedby={errors.educationLevel ? 'educationLevel-error' : undefined}
                      InputLabelProps={{ shrink: true }}
                    >
                      <MenuItem value="" disabled>
                        Seleccionar
                      </MenuItem>
                      <MenuItem value="Primaria">Primaria</MenuItem>
                      <MenuItem value="Secundaria">Secundaria</MenuItem>
                      <MenuItem value="Terciaria">Terciaria</MenuItem>
                      <MenuItem value="Universitaria">Universitaria</MenuItem>
                      <MenuItem value="Posgrado">Posgrado</MenuItem>
                      <MenuItem value="Doctorado">Doctorado</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid>
                <Controller
                  name="institution"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Institución"
                      fullWidth
                      error={!!errors.institution}
                      helperText={errors.institution?.message}
                      aria-label="Institución educativa"
                      aria-describedby={errors.institution ? 'institution-error' : undefined}
                      onInput={handleTextInput}
                    />
                  )}
                />
              </Grid>
              <Grid>
                <Controller
                  name="degree"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Título"
                      fullWidth
                      error={!!errors.degree}
                      helperText={errors.degree?.message}
                      aria-label="Título obtenido"
                      aria-describedby={errors.degree ? 'degree-error' : undefined}
                      onInput={handleTextInput}
                    />
                  )}
                />
              </Grid>
              <Grid>
                <Controller
                  name="graduationYear"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Año de graduación"
                      type="number"
                      fullWidth
                      error={!!errors.graduationYear}
                      helperText={errors.graduationYear?.message}
                      aria-label="Año de graduación"
                      aria-describedby={errors.graduationYear ? 'graduationYear-error' : undefined}
                      onInput={handleNumberInput}
                      inputProps={{ min: 1950, max: new Date().getFullYear(), maxLength: 4 }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          {/* Experiencia Laboral */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Experiencia Laboral
            </Typography>
            <Grid container spacing={2} direction="column">
              <Grid>
                <Controller
                  name="currentPosition"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Puesto actual"
                      fullWidth
                      error={!!errors.currentPosition}
                      helperText={errors.currentPosition?.message}
                      aria-label="Puesto actual"
                      aria-describedby={
                        errors.currentPosition ? 'currentPosition-error' : undefined
                      }
                      onInput={handleTextInput}
                    />
                  )}
                />
              </Grid>
              <Grid>
                <Controller
                  name="currentCompany"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Empresa actual"
                      fullWidth
                      error={!!errors.currentCompany}
                      helperText={errors.currentCompany?.message}
                      aria-label="Empresa actual"
                      aria-describedby={errors.currentCompany ? 'currentCompany-error' : undefined}
                      onInput={handleTextInput}
                    />
                  )}
                />
              </Grid>
              <Grid>
                <Controller
                  name="totalExperience"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Años de experiencia"
                      type="number"
                      fullWidth
                      error={!!errors.totalExperience}
                      helperText={errors.totalExperience?.message}
                      aria-label="Años de experiencia"
                      aria-describedby={
                        errors.totalExperience ? 'totalExperience-error' : undefined
                      }
                      onInput={handleNumberInput}
                    />
                  )}
                />
              </Grid>
              <Grid>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Fecha de inicio"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.startDate}
                      helperText={errors.startDate?.message}
                      aria-label="Fecha de inicio"
                      aria-describedby={errors.startDate ? 'startDate-error' : undefined}
                      value={field.value || ''}
                      inputProps={{
                        min: '1950-01-01',
                        max: new Date().toISOString().split('T')[0],
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid>
                {!isCurrentlyWorking ? (
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Fecha de fin"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.endDate}
                        helperText={errors.endDate?.message}
                        aria-label="Fecha de fin"
                        aria-describedby={errors.endDate ? 'endDate-error' : undefined}
                        value={field.value || ''}
                        inputProps={{
                          min: '1950-01-01',
                          max: new Date().toISOString().split('T')[0],
                        }}
                      />
                    )}
                  />
                ) : null}
              </Grid>
              <Grid>
                <Controller
                  name="isCurrentlyWorking"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Actualmente Trabajando"
                    />
                  )}
                />
              </Grid>
              <Grid>
                <Controller
                  name="experienceDescription"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Descripción de la Experiencia"
                      multiline
                      error={!!errors.experienceDescription}
                      helperText={errors.experienceDescription?.message}
                      aria-label="Descripción de la Experiencia"
                      aria-describedby={
                        errors.experienceDescription ? 'experienceDescription-error' : undefined
                      }
                      sx={{ width: '452.86px', height: '226.11px' }}
                      inputProps={{
                        style: {
                          height: 226.11,
                          minHeight: 226.11,
                          maxHeight: 226.11,
                          resize: 'none',
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          {/* CV */}
          <Box sx={{ mb: 4, mt: 8 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Curriculum Vitae
            </Typography>
            <CVUpload onFileSelect={setCvFile} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ minWidth: 200, py: 1.5, fontSize: '1.1rem' }}
              aria-label="Enviar formulario"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
