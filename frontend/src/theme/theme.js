import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',     // Deep indigo
      light: '#6573c3',
      dark: '#2c387e'
    },
    secondary: {
      main: '#f50057',     // Vibrant pink
      light: '#ff4081',
      dark: '#ab003c'
    },
    background: {
      default: '#121212',  // Very dark background
      paper: '#1e1e1e'     // Slightly lighter for cards and papers
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#a0a0a0'
    },
    error: {
      main: '#ff1744'
    }
  },
  typography: {
    fontFamily: [
      'Inter', 
      '-apple-system', 
      'BlinkMacSystemFont', 
      'Segoe UI', 
      'Roboto', 
      'Oxygen', 
      'Ubuntu', 
      'Cantarell', 
      'Fira Sans', 
      'Droid Sans', 
      'Helvetica Neue', 
      'sans-serif'
    ].join(','),
    h4: {
      fontWeight: 600,
      color: '#ffffff'
    },
    body1: {
      lineHeight: 1.6
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#2b2b2b',
            width: 8
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#6b6b6b',
            minHeight: 24
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#959595'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
          backgroundColor: '#1e1e1e'
        }
      }
    }
  }
});

export default darkTheme;