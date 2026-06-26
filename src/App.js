import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AppLayout from './components/Layout/AppLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SetupPage from './pages/SetupPage';
import HomePage from './pages/HomePage';
import SubjectsPage from './pages/SubjectsPage';
import GradesPage from './pages/GradesPage';
import CalculatorPage from './pages/CalculatorPage';
import SettingsPage from './pages/SettingsPage';
import { getMuiTheme } from './theme/themes';
import { loadState } from './utils/localStorage';

function ThemedApp() {
  const savedState = loadState();
  const themeId = savedState?.theme || 'light';
  const primaryColor = savedState?.primaryColor || '#1976D2';
  const theme = getMuiTheme(themeId, primaryColor);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/setup" element={
                <ProtectedRoute><SetupPage /></ProtectedRoute>
              } />
              <Route path="/" element={
                <ProtectedRoute><AppLayout /></ProtectedRoute>
              }>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<HomePage />} />
                <Route path="subjects" element={<SubjectsPage />} />
                <Route path="grades" element={<GradesPage />} />
                <Route path="calculator" element={<CalculatorPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default ThemedApp;
