import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Container maxWidth="md">
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          py: 4
        }}
      >
        <Typography 
          variant="h3" 
          color="primary" 
          gutterBottom 
          sx={{ mb: 4 }}
        >
          Drug Image Recognition
        </Typography>
        
        {children}
      </Box>
    </Container>
  );
};

export default Layout;