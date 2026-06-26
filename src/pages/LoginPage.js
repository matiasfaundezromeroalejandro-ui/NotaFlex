import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box, TextField, Button, Typography, Alert, Paper, Link, InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form.username, form.password);
      const stored = localStorage.getItem('noteflex_state');
      if (stored) {
        navigate('/dashboard');
      } else {
        navigate('/setup');
      }
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
          Inicia sesión para continuar
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Usuario" name="username" value={form.username}
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
          <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3 }}>
            Iniciar Sesión
          </Button>
        </Box>
        <Typography align="center" sx={{ mt: 2 }}>
          ¿No tienes cuenta?{' '}
          <Link component={RouterLink} to="/register">Regístrate</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
