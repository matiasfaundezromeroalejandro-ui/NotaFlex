export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function getStoredUser() {
  try {
    const data = localStorage.getItem('noteflex_user');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function storeUser(username, passwordHash) {
  localStorage.setItem('noteflex_user', JSON.stringify({ username, passwordHash }));
}

export function clearSession() {
  localStorage.removeItem('noteflex_session');
}

export function setSession(username) {
  localStorage.setItem('noteflex_session', JSON.stringify({ username, timestamp: Date.now() }));
}

export function getSession() {
  try {
    const data = localStorage.getItem('noteflex_session');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}
