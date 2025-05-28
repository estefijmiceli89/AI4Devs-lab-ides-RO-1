import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useAutocomplete } from '../hooks/useAutocomplete';

interface AutocompleteFieldProps {
  field: any;
  label: string;
  fieldName:
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'institution'
    | 'degree'
    | 'currentPosition'
    | 'currentCompany'
    | 'experienceDescription';
  error?: boolean;
  helperText?: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: boolean;
  fullWidth?: boolean;
  trigger?: (name?: any) => Promise<boolean>;
  [key: string]: any;
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  field,
  label,
  fieldName,
  error,
  helperText,
  onInput,
  multiline = false,
  fullWidth = true,
  trigger,
  ...props
}) => {
  const { getFieldSuggestions, loading, error: hookError, candidatesCount } = useAutocomplete();
  const [inputValue, setInputValue] = useState(field.value || '');
  const [options, setOptions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  console.log(
    `🎯 AutocompleteField para ${fieldName} - Candidatos disponibles: ${candidatesCount}`,
  );

  // Actualizar opciones cuando cambia el input o cuando se abre el dropdown
  useEffect(() => {
    if (open || inputValue) {
      console.log(`🔄 Actualizando opciones para ${fieldName} con input: "${inputValue}"`);
      const suggestions = getFieldSuggestions(fieldName, inputValue);
      console.log(`📋 Sugerencias obtenidas para ${fieldName}:`, suggestions);
      setOptions(suggestions);
    }
  }, [inputValue, fieldName, getFieldSuggestions, open]);

  // Cargar opciones iniciales al hacer focus/abrir
  const handleOpen = () => {
    console.log(`👆 Abriendo autocomplete para ${fieldName}`);
    setOpen(true);
    const initialSuggestions = getFieldSuggestions(fieldName, '');
    console.log(`📋 Sugerencias iniciales para ${fieldName}:`, initialSuggestions);
    setOptions(initialSuggestions);
  };

  const handleClose = () => {
    console.log(`👇 Cerrando autocomplete para ${fieldName}`);
    setOpen(false);
  };

  const handleInputChange = (event: any, newInputValue: string) => {
    console.log(`✏️ Input cambiado en ${fieldName}: "${newInputValue}"`);
    setInputValue(newInputValue);
    // Actualizar el valor del campo para disparar validación
    field.onChange(newInputValue);
    // Disparar validación manual si está disponible
    if (trigger) {
      trigger(fieldName);
    }
  };

  const handleChange = (event: any, newValue: string | null) => {
    console.log(`🔄 Valor seleccionado en ${fieldName}: "${newValue}"`);
    const finalValue = newValue || '';
    field.onChange(finalValue);
    setInputValue(finalValue);
    // Disparar validación inmediata
    if (field.onBlur) {
      field.onBlur();
    }
    // Disparar validación manual si está disponible
    if (trigger) {
      trigger(fieldName);
    }
  };

  if (hookError) {
    console.error(`❌ Error en hook para ${fieldName}:`, hookError);
  }

  return (
    <Autocomplete
      freeSolo
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      options={options}
      value={field.value || ''}
      inputValue={inputValue}
      loading={loading}
      onInputChange={handleInputChange}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth={fullWidth}
          multiline={multiline}
          error={error}
          helperText={helperText || (hookError ? `Error: ${hookError}` : '')}
          onInput={onInput}
          onBlur={field.onBlur}
          name={field.name}
          {...props}
        />
      )}
      noOptionsText={loading ? 'Cargando...' : 'No hay sugerencias'}
      loadingText="Cargando sugerencias..."
    />
  );
};

export default AutocompleteField;
