import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import SelectInput from "../components/atoms/SelectInput";
import TextInput from "../components/atoms/TextInput";
import AuthLayout from "../components/layout/AuthLayout";
import FormField from "../components/molecules/FormField";
import { register } from "../services/api";
import { getAuthToken } from "../services/auth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", role: "admin" });
  const [message, setMessage] = useState({ error: "", success: "" });
  const [loading, setLoading] = useState(false);

  if (getAuthToken()) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setMessage({ error: "", success: "" });
      await register(form);
      setMessage({ error: "", success: "Register berhasil. Silakan login." });
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      setMessage({ error: err.message, success: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Register"
      title="Buat akun baru"
      description="Daftarkan akun admin atau user untuk menguji perbedaan akses 401 dan 403."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Username" htmlFor="username">
          <TextInput
            id="username"
            autoComplete="username"
            value={form.username}
            onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
            placeholder="Masukkan username"
            required
          />
        </FormField>
        <FormField label="Password" htmlFor="password">
          <TextInput
            id="password"
            type="password"
            minLength="6"
            autoComplete="new-password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            placeholder="Minimal 6 karakter"
            required
          />
        </FormField>
        <FormField label="Role" htmlFor="role">
          <SelectInput
            id="role"
            value={form.role}
            onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </SelectInput>
        </FormField>
        {message.error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{message.error}</p> : null}
        {message.success ? <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message.success}</p> : null}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Memproses..." : "Register"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        Sudah memiliki akun?{" "}
        <Link to="/login" className="font-semibold text-blue-600">Login</Link>
      </p>
    </AuthLayout>
  );
}
