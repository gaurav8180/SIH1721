import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from './theme/theme';
import Layout from './components/Layout';
import UploadSection from './components/UploadSection';
import ResultsSection from './components/ResultsSection';

const App = () => {
  const [results, setResults] = useState(null);

  const handleUploadSuccess = (uploadResults) => {
    setResults(uploadResults);
  };

  const handleReset = () => {
    setResults(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Layout>
        {!results ? (
          <UploadSection onUploadSuccess={handleUploadSuccess} />
        ) : (
          <ResultsSection 
            results={results} 
            onReset={handleReset} 
          />
        )}
      </Layout>
    </ThemeProvider>
  );
};

export default App;