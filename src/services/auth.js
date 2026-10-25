const USERS_KEY = "users";
const SESSION_KEY = "currentUser";

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function startSession(user) {
  const sessionUser = { name: user.name, email: user.email };
  writeJSON(SESSION_KEY, sessionUser);
  return sessionUser;
}

export function getCurrentUser() {
  return readJSON(SESSION_KEY, null);
}

export function registerUser({ name, email, password }) {
  const users = readJSON(USERS_KEY, []);
  const normalizedEmail = normalizeEmail(email);

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("Email ini sudah terdaftar.");
  }

  const newUser = { name: name.trim(), email: normalizedEmail, password };
  writeJSON(USERS_KEY, [...users, newUser]);
  return startSession(newUser);
}

export function loginUser({ email, password }) {
  const users = readJSON(USERS_KEY, []);
  const normalizedEmail = normalizeEmail(email);
  const user = users.find((user) => user.email === normalizedEmail && user.password === password);

  if (!user) {
    throw new Error("Email atau kata sandi salah.");
  }

  return startSession(user);
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}
