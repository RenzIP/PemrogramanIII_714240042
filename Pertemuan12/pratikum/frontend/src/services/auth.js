export function getAuthToken() {
  return localStorage.getItem("auth_token");
}

export function getAuthUser() {
  const rawUser = localStorage.getItem("auth_user");
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    localStorage.removeItem("auth_user");
    return null;
  }
}

export function saveAuthSession({ token, user }) {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_user", JSON.stringify(user));
}

export function clearAuthSession() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}
