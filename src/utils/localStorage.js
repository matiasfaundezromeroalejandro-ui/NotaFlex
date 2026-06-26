const STORAGE_KEY = 'noteflex_state';

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving state:', e);
  }
}

export function loadState() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error loading state:', e);
    return null;
  }
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}
