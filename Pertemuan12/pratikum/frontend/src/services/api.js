import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT ?? 10000);
const AUTH_BASE_URL = API_BASE_URL?.replace(/\/api\/?$/, "");

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL belum diatur di file .env");
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    Accept: "application/json",
  },
});

const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  timeout: API_TIMEOUT,
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      if (window.location.pathname !== "/login") window.location.assign("/login");
    }
    return Promise.reject(error);
  },
);

function normalizeError(error, fallback = "Terjadi kesalahan") {
  if (error.response?.status === 403) return "Akun Anda bukan admin";
  return error.response?.data?.message || error.message || fallback;
}

export async function login(payload) {
  try {
    const response = await authApi.post("/login", payload);
    return response.data?.data ?? response.data;
  } catch (error) {
    throw new Error(normalizeError(error, "Login gagal"));
  }
}

export async function register(payload) {
  try {
    const response = await authApi.post("/register", payload);
    return response.data?.data ?? response.data;
  } catch (error) {
    throw new Error(normalizeError(error, "Register gagal"));
  }
}

export async function getMahasiswa() {
  try {
    const response = await api.get("/mahasiswa/");
    const payload = response.data;
    const mahasiswa = Array.isArray(payload) ? payload : payload?.data;

    if (!Array.isArray(mahasiswa)) {
      throw new Error("Format response tidak valid");
    }

    return mahasiswa;
  } catch (error) {
    throw new Error(normalizeError(error, "Gagal mengambil data"));
  }
}

export async function getMahasiswaDetail(npm) {
  try {
    const response = await api.get(`/mahasiswa/${npm}`);
    return response.data?.data ?? response.data;
  } catch (error) {
    throw new Error(normalizeError(error, "Gagal mengambil detail"));
  }
}

export async function createMahasiswa(payload) {
  try {
    const response = await api.post("/mahasiswa/", payload);
    return response.data;
  } catch (error) {
    throw new Error(normalizeError(error, "Gagal menambah data"));
  }
}

export async function updateMahasiswa(npm, payload) {
  try {
    const response = await api.put(`/mahasiswa/${npm}`, payload);
    return response.data;
  } catch (error) {
    throw new Error(normalizeError(error, "Gagal memperbarui data"));
  }
}

export async function deleteMahasiswa(npm) {
  try {
    const response = await api.delete(`/mahasiswa/${npm}`);
    return response.data;
  } catch (error) {
    throw new Error(normalizeError(error, "Gagal menghapus data"));
  }
}

export async function changePassword(payload) {
  try {
    const response = await api.put("/auth/password", payload);
    return response.data;
  } catch (error) {
    throw new Error(normalizeError(error, "Gagal mengubah password"));
  }
}
