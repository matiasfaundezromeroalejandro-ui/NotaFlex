import { createTheme } from '@mui/material/styles';

export const THEME_OPTIONS = [
  { id: 'light', label: 'Claro', mode: 'light', primary: '#1976D2', secondary: '#f5f5f5' },
  { id: 'dark', label: 'Oscuro', mode: 'dark', primary: '#90CAF9', secondary: '#121212' },
  { id: 'ocean', label: 'Océano', mode: 'light', primary: '#00897B', secondary: '#E0F2F1' },
  { id: 'forest', label: 'Bosque', mode: 'light', primary: '#43A047', secondary: '#E8F5E9' },
  { id: 'sunset', label: 'Atardecer', mode: 'light', primary: '#F57C00', secondary: '#FFF3E0' },
  { id: 'midnight', label: 'Medianoche', mode: 'dark', primary: '#7E57C2', secondary: '#1A1A2E' },
  { id: 'minimal', label: 'Minimalista', mode: 'light', primary: '#607D8B', secondary: '#ECEFF1' },
  { id: 'custom', label: 'Personalizado', mode: 'light', primary: '#1976D2', secondary: '#f5f5f5' },
];

export function getMuiTheme(themeId, customPrimary) {
  const themeConfig = THEME_OPTIONS.find((t) => t.id === themeId) || THEME_OPTIONS[0];
  const primaryColor = themeId === 'custom' && customPrimary ? customPrimary : themeConfig.primary;

  return createTheme({
    palette: {
      mode: themeConfig.mode,
      primary: { main: primaryColor },
      secondary: { main: themeConfig.secondary },
    },
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
    },
  });
}
