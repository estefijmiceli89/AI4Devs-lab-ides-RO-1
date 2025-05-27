import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface CVUploadProps {
  onFileSelect?: (file: File | null) => void;
  initialFile?: File | null;
}

export const CVUpload = ({ onFileSelect, initialFile }: CVUploadProps) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(initialFile || null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validar tipo de archivo
      if (
        ![
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(file.type)
      ) {
        setUploadStatus('error');
        setErrorMessage('Solo se permiten archivos PDF y DOCX');
        onFileSelect?.(null);
        return;
      }

      // Validar tamaño (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadStatus('error');
        setErrorMessage('El archivo no debe superar los 5MB');
        onFileSelect?.(null);
        return;
      }

      setSelectedFile(file);
      setUploadStatus('success');
      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFileSelect?.(file);
  };

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: 3,
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'divider',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <input {...getInputProps()} />
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="cv-upload"
      />
      <label htmlFor="cv-upload">
        <Button component="span" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mb: 2 }}>
          Seleccionar CV
        </Button>
      </label>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {uploadStatus === 'success' ? (
          <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
        ) : uploadStatus === 'error' ? (
          <ErrorIcon color="error" sx={{ fontSize: 40 }} />
        ) : (
          <CloudUploadIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        )}

        <Typography variant="h6" component="div">
          {uploadStatus === 'success'
            ? `Archivo seleccionado: ${selectedFile?.name}`
            : uploadStatus === 'error'
              ? errorMessage
              : isDragActive
                ? 'Suelta el archivo aquí'
                : 'Arrastra y suelta tu CV aquí, o haz clic para seleccionar'}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Formatos aceptados: PDF, DOC, DOCX
        </Typography>
      </Box>
    </Paper>
  );
};

export default CVUpload;
