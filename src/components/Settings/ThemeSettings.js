import React, { useState } from 'react';
import {
  Box, Typography, Grid, Card, CardActionArea, CardContent, Button, Dialog, DialogTitle,
  DialogContent, TextField, DialogActions,
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { useApp } from '../../context/AppContext';
import { THEME_OPTIONS } from '../../theme/themes';

export default function ThemeSettings() {
  const { state, setTheme, setPrimaryColor } = useApp();
  const [customDialog, setCustomDialog] = useState(false);
  const [customColor, setCustomColor] = useState(state.primaryColor);

  const handleSelect = (theme) => {
    if (theme.id === 'custom') {
      setCustomColor(state.primaryColor);
      setCustomDialog(true);
    } else {
      setTheme(theme.id);
      setPrimaryColor(theme.primary);
    }
  };

  const handleCustomSave = () => {
    setTheme('custom');
    setPrimaryColor(customColor);
    setCustomDialog(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Tema de la aplicación</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Elige el estilo visual que más te guste.
      </Typography>

      <Grid container spacing={2}>
        {THEME_OPTIONS.map((theme) => (
          <Grid item xs={6} sm={4} md={3} key={theme.id}>
            <Card
              variant="outlined"
              sx={{
                borderColor: state.theme === theme.id ? 'primary.main' : undefined,
                borderWidth: state.theme === theme.id ? 2 : 1,
                position: 'relative',
              }}
            >
              <CardActionArea onClick={() => handleSelect(theme)}>
                <Box sx={{ height: 60, bgcolor: theme.mode === 'dark' ? '#1a1a2e' : theme.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: theme.primary }} />
                </Box>
                <CardContent sx={{ py: 1 }}>
                  <Typography variant="body2" align="center">{theme.label}</Typography>
                  <Typography variant="caption" align="center" display="block" color="text.secondary">
                    {theme.mode === 'dark' ? 'Oscuro' : 'Claro'}
                  </Typography>
                </CardContent>
              </CardActionArea>
              {state.theme === theme.id && (
                <CheckIcon
                  sx={{ position: 'absolute', top: 4, right: 4, fontSize: 18, color: 'primary.main' }}
                />
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={customDialog} onClose={() => setCustomDialog(false)}>
        <DialogTitle>Color Personalizado</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth label="Color primario (hex)" value={customColor}
            onChange={(e) => setCustomColor(e.target.value)} margin="normal"
            InputProps={{
              startAdornment: (
                <Box
                  sx={{
                    width: 24, height: 24, borderRadius: 1, bgcolor: customColor, mr: 1,
                    border: '1px solid #ccc',
                  }}
                />
              ),
            }}
          />
          <TextField
            fullWidth label="O elige" type="color" value={customColor}
            onChange={(e) => setCustomColor(e.target.value)} margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCustomDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleCustomSave}>Aplicar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
