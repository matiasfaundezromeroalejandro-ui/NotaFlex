import {
  SET_GRADE_SCALE, SET_ACADEMIC_PERIOD,
  ADD_SUBJECT, UPDATE_SUBJECT, DELETE_SUBJECT,
  ADD_GRADE, UPDATE_GRADE, DELETE_GRADE,
  SET_THEME, SET_PRIMARY_COLOR, SET_SETUP_COMPLETED,
  RESET_ALL, LOAD_STATE,
} from './types';

export const initialState = {
  gradeScale: null,
  academicPeriod: null,
  subjects: [],
  theme: 'light',
  primaryColor: '#1976D2',
  setupCompleted: false,
};

export function appReducer(state, action) {
  switch (action.type) {
    case SET_GRADE_SCALE:
      return { ...state, gradeScale: action.payload };

    case SET_ACADEMIC_PERIOD:
      return { ...state, academicPeriod: action.payload };

    case ADD_SUBJECT:
      return { ...state, subjects: [...state.subjects, action.payload] };

    case UPDATE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };

    case DELETE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.filter((s) => s.id !== action.payload),
      };

    case ADD_GRADE: {
      const { subjectId, grade } = action.payload;
      return {
        ...state,
        subjects: state.subjects.map((s) =>
          s.id === subjectId
            ? { ...s, grades: [...(s.grades || []), grade] }
            : s
        ),
      };
    }

    case UPDATE_GRADE: {
      const { subjectId, grade } = action.payload;
      return {
        ...state,
        subjects: state.subjects.map((s) =>
          s.id === subjectId
            ? {
                ...s,
                grades: (s.grades || []).map((g) =>
                  g.id === grade.id ? grade : g
                ),
              }
            : s
        ),
      };
    }

    case DELETE_GRADE: {
      const { subjectId, gradeId } = action.payload;
      return {
        ...state,
        subjects: state.subjects.map((s) =>
          s.id === subjectId
            ? { ...s, grades: (s.grades || []).filter((g) => g.id !== gradeId) }
            : s
        ),
      };
    }

    case SET_THEME:
      return { ...state, theme: action.payload };

    case SET_PRIMARY_COLOR:
      return { ...state, primaryColor: action.payload };

    case SET_SETUP_COMPLETED:
      return { ...state, setupCompleted: action.payload };

    case RESET_ALL:
      return { ...initialState };

    case LOAD_STATE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
