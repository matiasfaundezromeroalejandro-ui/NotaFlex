import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Paper } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { hashPassword, getStoredUser, storeUser } from '../../utils/auth';

export default function AccountSettings() {
  const { user, logout } = useAuth();
  const { resetAll } = useApp();
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChangePassword = async () => {
    setMessage({ type: '', text: '' });
    if (passwords.newPass !== passwords.confirm) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
      return;
    }
    if (passwords.newPass.length < 4) {
      setMessage({ type: 'error', text: 'La contraseña debe tener al menos 4 caracteres' });
      return;
    }
    const stored = getStoredUser();
    const currentHash = await hashPassword(passwords.current);
    if (currentHash !== stored.passwordHash) {
      setMessage({ type: 'error', text: 'Contraseña actual incorrecta' });
      return;
    }
    const newHash = await hashPassword(passwords.newPass);
    storeUser(stored.username, newHash);
    setMessage({ type: 'success', text: 'Contraseña actualizada correctamente' });
    setPasswords({ current: '', newPass: '', confirm: '' });
  };

  const handleDeleteAll = () => {
    if (window.confirm('¿Estás seguro? Se eliminarán TODOS tus datos (asignaturas, notas, configuración). Esta acción no se puede deshacer.')) {
      resetAll();
      setMessage({ type: 'success', text: 'Todos los datos han sido eliminados.' });
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Cuenta</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Usuario: <strong>{user?.username}</strong>
      </Typography>

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>
      )}

      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Cambiar contraseña</Typography>
        <TextField
          fullWidth label="Contraseña actual" type="password" size="small" sx={{ mb: 1 }}
          value={passwords.current}
          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
        />
        <TextField
          fullWidth label="Nueva contraseña" type="password" size="small" sx={{ mb: 1 }}
          value={passwords.newPass}
          onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
        />
        <TextField
          fullWidth label="Confirmar nueva contraseña" type="password" size="small" sx={{ mb: 1 }}
          value={passwords.confirm}
          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
        />
        <Button variant="outlined" onClick={handleChangePassword}>Actualizar contraseña</Button>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom color="error">Zona de peligro</Typography>
        <Button variant="outlined" color="error" onClick={handleDeleteAll} sx={{ mr: 1 }}>
          Eliminar todos los datos
        </Button>
        <Button variant="outlined" color="warning" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Paper>
    </Box>
  );
}
