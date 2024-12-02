import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Alert, 
  CircularProgress,
  Paper
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { validateFile } from '../utils/fileValidation';
import { uploadImage } from '../services/api';

const UploadSection = ({ onUploadSuccess }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const validation = validateFile(file);

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await uploadImage(file);
      onUploadSuccess(result);
    } catch (uploadError) {
      setError(uploadError.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif']
    },
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  return (
    <Paper 
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 4,
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.700',
        borderRadius: 2,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: 'background.paper'
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon 
        sx={{ 
          fontSize: 80, 
          color: isDragActive ? 'primary.main' : 'grey.500',
          mb: 2,
          transition: 'color 0.3s ease'
        }} 
      />
      <Typography variant="h6" gutterBottom color="textPrimary">
        {isDragActive 
          ? 'Drop your image here' 
          : 'Drag and drop an image or click to select'}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Supports JPEG, PNG, and GIF (Max 5MB)
      </Typography>

      {loading && (
        <Box sx={{ mt: 2 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mt: 2, 
            width: '100%',
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            color: 'error.main'
          }}
        >
          {error}
        </Alert>
      )}
    </Paper>
  );
};

export default UploadSection;