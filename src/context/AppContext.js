import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { appReducer, initialState } from './appReducer';
import { saveState, loadState } from '../utils/localStorage';
import * as types from './types';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, () => {
    const saved = loadState();
    return saved ? { ...initialState, ...saved } : initialState;
  });

  useEffect(() => {
    if (state.gradeScale && state.academicPeriod) {
      saveState(state);
    }
  }, [state]);

  const setGradeScale = useCallback((scale) => {
    dispatch({ type: types.SET_GRADE_SCALE, payload: scale });
  }, []);

  const setAcademicPeriod = useCallback((period) => {
    dispatch({ type: types.SET_ACADEMIC_PERIOD, payload: period });
  }, []);

  const addSubject = useCallback((subject) => {
    dispatch({ type: types.ADD_SUBJECT, payload: subject });
  }, []);

  const updateSubject = useCallback((subject) => {
    dispatch({ type: types.UPDATE_SUBJECT, payload: subject });
  }, []);

  const deleteSubject = useCallback((id) => {
    dispatch({ type: types.DELETE_SUBJECT, payload: id });
  }, []);

  const addGrade = useCallback((subjectId, grade) => {
    dispatch({ type: types.ADD_GRADE, payload: { subjectId, grade } });
  }, []);

  const updateGrade = useCallback((subjectId, grade) => {
    dispatch({ type: types.UPDATE_GRADE, payload: { subjectId, grade } });
  }, []);

  const deleteGrade = useCallback((subjectId, gradeId) => {
    dispatch({ type: types.DELETE_GRADE, payload: { subjectId, gradeId } });
  }, []);

  const setTheme = useCallback((theme) => {
    dispatch({ type: types.SET_THEME, payload: theme });
  }, []);

  const setPrimaryColor = useCallback((color) => {
    dispatch({ type: types.SET_PRIMARY_COLOR, payload: color });
  }, []);

  const setSetupCompleted = useCallback((completed) => {
    dispatch({ type: types.SET_SETUP_COMPLETED, payload: completed });
  }, []);

  const resetAll = useCallback(() => {
    dispatch({ type: types.RESET_ALL });
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        setGradeScale,
        setAcademicPeriod,
        addSubject,
        updateSubject,
        deleteSubject,
        addGrade,
        updateGrade,
        deleteGrade,
        setTheme,
        setPrimaryColor,
        setSetupCompleted,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
