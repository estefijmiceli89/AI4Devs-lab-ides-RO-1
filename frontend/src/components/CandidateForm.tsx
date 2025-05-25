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
  Grid,
  Divider,
} from '@mui/material';
import { EducationLevel, CreateCandidateDto } from '@/types/candidate';
import CVUpload from './CVUpload';

const schema = yup.object().shape({
  firstName: yup.string()
    .required('El nombre es requerido')
    .min(3, 'Debe tener al menos 3 letras')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras'),
  lastName: yup.string()
    .required('El apellido es requerido')
    .min(3, 'Debe tener al menos 3 letras')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras'),
  email: yup.string().email('Email inválido').required('El email es requerido'),
  phone: yup.string()
    .required('El teléfono es requerido')
    .matches(/^[0-9]+$/, 'Solo números')
    .min(6, 'Debe tener al menos 6 números'),
  educationLevel: yup.string().required('El nivel de educación es requerido'),
  institution: yup.string()
    .required('La institución es requerida')
    .min(3, 'Debe tener al menos 3 letras')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras'),
  degree: yup.string()
    .required('El título es requerido')
    .min(3, 'Debe tener al menos 3 letras')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras'),
  graduationYear: yup.number()
    .required('El año de graduación es requerido')
    .min(1950, 'El año debe ser posterior a 1950')
    .max(new Date().getFullYear(), 'El año no puede ser en el futuro')
    .test('is-four-digits', 'El año debe tener 4 dígitos', value => {
      if (!value) return true;
      return value.toString().length === 4;
    }),
  currentPosition: yup.string()
    .required('El puesto actual es requerido')
    .min(3, 'Debe tener al menos 3 letras')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras'),
  currentCompany: yup.string()
    .required('La empresa actual es requerida')
    .min(3, 'Debe tener al menos 3 letras')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras'),
  totalExperience: yup.number()
    .required('La experiencia total es requerida')
    .min(0, 'La experiencia no puede ser negativa'),
  startDate: yup.string()
    .required('La fecha de inicio es requerida')
    .test('not-future', 'La fecha no puede ser futura', function(value) {
      if (!value) return true;
      return new Date(value) <= new Date();
    })
    .test('min-date', 'La fecha debe ser posterior a 1950', function(value) {
      if (!value) return true;
      return new Date(value) >= new Date('1950-01-01');
    }),
  isCurrentlyWorking: yup.boolean(),
  endDate: yup.string()
    .nullable()
    .test('not-future', 'La fecha no puede ser futura', function(value) {
      if (!value) return true;
      return new Date(value) <= new Date();
    })
    .test('min-date', 'La fecha debe ser posterior a 1950', function(value) {
      if (!value) return true;
      return new Date(value) >= new Date('1950-01-01');
    })
    .test('after-start', 'La fecha de fin debe ser posterior a la fecha de inicio', function(value) {
      const startDate = this.parent.startDate;
      if (!value || !startDate) return true;
      return new Date(value) > new Date(startDate);
    }),
  experienceDescription: yup.string()
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

export const CandidateForm: React.FC<CandidateFormProps> = ({ onSubmit, initialData }) => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const { control, handleSubmit, watch, formState: { errors } } = useForm<CreateCandidateDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues,
      ...initialData,
    },
  });

  const isCurrentlyWorking = watch('isCurrentlyWorking');

  const handleFormSubmit = (data: CreateCandidateDto) => {
    console.log('CV file en submit:', cvFile);
    onSubmit(data, cvFile);
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, '');
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, maxWidth: 1100, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom fontWeight={700} textAlign="center">
        {initialData ? 'Editar Candidato' : 'Añadir Nuevo Candidato'}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        {/* Información Personal */}
        <Typography variant="h6" gutterBottom fontWeight={600} textAlign="center">
          Información Personal
        </Typography>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={3}>
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
                  onInput={handleTextInput}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
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
                  onInput={handleTextInput}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
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
                  onInput={handleNumberInput}
                />
              )}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Educación */}
        <Typography variant="h6" gutterBottom fontWeight={600} textAlign="center">
          Educación
        </Typography>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={3}>
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
                  InputLabelProps={{ shrink: true }}
                  sx={{ minWidth: 200, width: '100%' }}
                >
                  <MenuItem value="" disabled>Seleccionar</MenuItem>
                  {Object.values(EducationLevel).map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
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
                  onInput={handleTextInput}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
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
                  onInput={handleTextInput}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Controller
              name="graduationYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Año de Graduación"
                  type="number"
                  fullWidth
                  error={!!errors.graduationYear}
                  helperText={errors.graduationYear?.message}
                  onInput={handleNumberInput}
                  inputProps={{
                    min: 1950,
                    max: new Date().getFullYear(),
                    maxLength: 4
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Experiencia Laboral */}
        <Typography variant="h6" gutterBottom fontWeight={600} textAlign="center">
          Experiencia Laboral
        </Typography>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <Controller
              name="currentPosition"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Puesto Actual"
                  fullWidth
                  error={!!errors.currentPosition}
                  helperText={errors.currentPosition?.message}
                  onInput={handleTextInput}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              name="currentCompany"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Empresa Actual"
                  fullWidth
                  error={!!errors.currentCompany}
                  helperText={errors.currentCompany?.message}
                  onInput={handleTextInput}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              name="totalExperience"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Años de Experiencia"
                  type="number"
                  fullWidth
                  error={!!errors.totalExperience}
                  helperText={errors.totalExperience?.message}
                  onInput={handleNumberInput}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fecha de Inicio"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                  value={field.value || ""}
                  inputProps={{
                    min: '1950-01-01',
                    max: new Date().toISOString().split('T')[0]
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            {!isCurrentlyWorking ? (
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha de Fin"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.endDate}
                    helperText={errors.endDate?.message}
                    value={field.value || ""}
                    inputProps={{
                      min: '1950-01-01',
                      max: new Date().toISOString().split('T')[0]
                    }}
                  />
                )}
              />
            ) : null}
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
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
          <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Controller
              name="experienceDescription"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descripción de la Experiencia"
                  multiline
                  rows={4}
                  error={!!errors.experienceDescription}
                  helperText={errors.experienceDescription?.message}
                  sx={{ width: { xs: '100%', md: '80%' }, minWidth: 600, maxWidth: 1200 }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* CV Upload Section */}
        <Typography variant="h6" gutterBottom fontWeight={600} textAlign="center">
          Curriculum Vitae
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <CVUpload
              onFileSelect={setCvFile}
              initialFile={cvFile}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ minWidth: 200 }}
          >
            {initialData ? 'Actualizar' : 'Crear'} Candidato
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}; 