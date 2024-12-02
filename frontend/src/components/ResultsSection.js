import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText,
  Button,
  Chip
} from '@mui/material';

const ResultsSection = ({ results, onReset }) => {
  const { text, found_substances = [] } = results;

  return (
    <Card 
      sx={{ 
        maxWidth: 600, 
        mx: 'auto', 
        p: 2,
        backgroundColor: 'background.paper',
        borderRadius: 3
      }}
      elevation={6}
    >
      <CardContent>
        <Typography 
          variant="h4" 
          color="primary" 
          align="center" 
          gutterBottom 
          sx={{ mb: 3 }}
        >
          Analysis Results
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="textPrimary">Extracted Text:</Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              p: 2, 
              bgcolor: 'background.default', 
              borderRadius: 2,
              color: 'text.secondary',
              maxHeight: 200,
              overflowY: 'auto'
            }}
          >
            {text || 'No text extracted'}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="textPrimary">Detected Substances:</Typography>
          {found_substances.length > 0 ? (
            <Box 
              sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 1,
                mt: 2
              }}
            >
              {found_substances.map((substance, index) => (
                <Chip
                  key={index}
                  label={substance}
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </Box>
          ) : (
            <Typography 
              variant="body2" 
              color="textSecondary" 
              sx={{ mt: 2 }}
            >
              No banned substances detected
            </Typography>
          )}
        </Box>

        <Box textAlign="center" sx={{ mt: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={onReset}
            sx={{ 
              px: 4,
              py: 1.5,
              fontSize: '1rem'
            }}
          >
            Upload Another Image
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResultsSection;