import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, LinearProgress, Paper } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { FileInfo } from '../types/sentiment';
import { analyzeSentiment } from '../services/sentimentService';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface FileUploaderProps {
  onFileAnalyzed: () => void;
}

export default function FileUploader({ onFileAnalyzed }: FileUploaderProps) {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const size = (file.size / (1024 * 1024)).toFixed(1);
    setFileInfo({
      name: file.name,
      size: `${size} MB`,
      progress: 0,
    });

    setIsUploading(true);
    try {
      await analyzeSentiment(file);
      setFileInfo(prev => prev ? { ...prev, progress: 100 } : null);
      onFileAnalyzed();
    } catch (error) {
      console.error('Error analyzing file:', error);
    } finally {
      setIsUploading(false);
    }
  }, [onFileAnalyzed]);

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          disabled={isUploading}
        >
          Upload CSV
          <VisuallyHiddenInput type="file" accept=".csv" onChange={handleFileChange} />
        </Button>

        {fileInfo && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {fileInfo.name} ({fileInfo.size})
            </Typography>
            <LinearProgress
              variant="determinate"
              value={fileInfo.progress}
              sx={{ mt: 1, height: 8, borderRadius: 4 }}
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
} 