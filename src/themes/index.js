import { createTheme } from '@mui/material/styles';
import { viVN } from '@mui/material/locale';
export const theme = createTheme(
  {
    typography: {
      fontFamily: [
        // 'Helvetica',
        // 'sans-serif',
        // 'Montserrat',
        // '-apple-system',
        // 'BlinkMacSystemFont',
        // '"Segoe UI"',
        // 'Roboto',
        // 'Arial',
        // '"Apple Color Emoji"',
        // '"Segoe UI Emoji"',
        // '"Segoe UI Symbol"'
        'IBM Plex Sans',
        'sans-serif'
      ].join(',')
    },
    palette: {
      primary: { main: '#1FBDF8', contrastText: '#fff' },
      error: { main: '#FF647C', contrastText: '#fff' },
      secondary: { main: '#55C763', contrastText: '#fff' },
      cancel: { main: '#818181', contrastText: '#fff' },
      grey: { main: '#E9E9E9', contrastText: '#565771' },
      yellow: { main: '#FFD93D' },
      blue: { main: '#457EFF', contrastText: '#fff' }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: () => ({
            boxShadow: 'none',
            fontWeight: 500,
            fontSize: '14px',
            textTransform: 'none'
          })
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: 'white'
          },
          input: () => ({
            padding: '8.5px 14px !important'
          })
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow:
              '0px 3px 3px -3px rgb(0 0 0 / 0%), 0px 3px 0px 1px rgb(0 0 0 / 0%), 0px 3px 6px 2px rgb(0 0 0 / 3%)',
            borderRadius: '7px'
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: '#db3131'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: () => ({
            boxShadow: 'none'
          })
        }
      },
      MuiTablePagination: {
        styleOverrides: {
          input: () => ({
            padding: '0 6px 0 0 !important'
          })
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: () => ({
            '&:last-child': {
              paddingBottom: '0'
            }
          })
        }
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: () => ({
            '.MuiOutlinedInput-root': {
              padding: '0'
            }
          })
        }
      }
    }
  },
  viVN
);
