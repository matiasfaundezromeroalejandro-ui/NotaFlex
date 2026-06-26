import React, { useState } from 'react';
import { Box, Typography, Button, Alert, Paper } from '@mui/material';
import { CloudDownload, CloudUpload } from '@mui/icons-material';
import { useApp } from '../../context/AppContext';

export default function ExportImport() {
  const { state } = useApp();
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleExport = () => {
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `noteflex-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage({ type: 'success', text: 'Datos exportados correctamente' });
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (!data.gradeScale || !data.subjects) {
            setMessage({ type: 'error', text: 'El archivo no contiene datos válidos de NoteFlex' });
            return;
          }
          localStorage.setItem('noteflex_state', JSON.stringify(data));
          setMessage({ type: 'success', text: 'Datos importados. Recarga la página para ver los cambios.' });
          window.location.reload();
        } catch {
          setMessage({ type: 'error', text: 'Error al leer el archivo JSON' });
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Exportar / Importar Datos</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Respaldar tus datos o restaurar una copia de seguridad.
      </Typography>

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>
      )}

      <Paper variant="outlined" sx={{ p: 2, display: 'flex', gap: 2 }}>
        <Button variant="outlined" startIcon={<CloudDownload />} onClick={handleExport}>
          Exportar Backup
        </Button>
        <Button variant="outlined" startIcon={<CloudUpload />} onClick={handleImport}>
          Importar Backup
        </Button>
      </Paper>
    </Box>
  );
}
