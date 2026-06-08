import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import TextInput from "../components/atoms/TextInput";
import AuthLayout from "../components/layout/AuthLayout";
import FormField from "../components/molecules/FormField";
import { login } from "../services/api";
import { getAuthToken, saveAuthSession } from "../services/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (getAuthToken()) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const session = await login(form);
      saveAuthSession(session);
      navigate(location.state?.from?.pathname ?? "/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Login"
      title="Masuk ke aplikasi"
      description="Gunakan akun admin untuk mengakses dan mengelola data mahasiswa."
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
            autoComplete="current-password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            placeholder="Masukkan password"
            required
          />
        </FormField>
        {error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p> : null}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Memproses..." : "Login"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        Belum memiliki akun?{" "}
        <Link to="/register" className="font-semibold text-blue-600">Register</Link>
      </p>
    </AuthLayout>
  );
}
