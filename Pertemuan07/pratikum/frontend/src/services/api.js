import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT ?? 10000);

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

export async function getMahasiswa() {
  try {
    const response = await api.get("/mahasiswa");
    const payload = response.data;
    const mahasiswa = Array.isArray(payload) ? payload : payload?.data;

    if (!Array.isArray(mahasiswa)) {
      throw new Error("Format response tidak valid");
    }

    return mahasiswa;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Gagal mengambil data";
    throw new Error(message);
  }
}
