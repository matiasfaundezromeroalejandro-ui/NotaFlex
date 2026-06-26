import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box, TextField, Button, Typography, Alert, Paper, Link, InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (form.password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres');
      return;
    }
    try {
      await register(form.username, form.password);
      navigate('/setup');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '90%' }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="primary">
          NoteFlex
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
          Crea tu cuenta para empezar
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Nombre de usuario" name="username" value={form.username}
            onChange={handleChange} margin="normal" required autoFocus
          />
          <TextField
            fullWidth label="Contraseña" name="password" type={showPassword ? 'text' : 'password'}
            value={form.password} onChange={handleChange} margin="normal" required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth label="Confirmar contraseña" name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={form.confirmPassword} onChange={handleChange} margin="normal" required
          />
          <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3 }}>
            Crear Cuenta
          </Button>
        </Box>
        <Typography align="center" sx={{ mt: 2 }}>
          ¿Ya tienes cuenta?{' '}
          <Link component={RouterLink} to="/login">Inicia sesión</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
