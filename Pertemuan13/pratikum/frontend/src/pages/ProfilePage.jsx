import { useState } from "react";
import Swal from "sweetalert2";
import Button from "../components/atoms/Button";
import FormField from "../components/molecules/FormField";
import TextInput from "../components/atoms/TextInput";
import { changePassword } from "../services/api";
import { getAuthToken, getAuthUser } from "../services/auth";

export default function ProfilePage() {
  const user = getAuthUser();
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const showToken = () => {
    Swal.fire({
      title: "Token JWT",
      input: "textarea",
      inputValue: getAuthToken() ?? "Token tidak tersedia",
      inputAttributes: { readonly: "readonly" },
      confirmButtonText: "Tutup",
      width: 700,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.new_password !== form.confirm_password) {
      await Swal.fire("Gagal", "Konfirmasi password baru tidak sama.", "error");
      return;
    }

    try {
      setLoading(true);
      const result = await changePassword({
        current_password: form.current_password,
        new_password: form.new_password,
      });
      setForm({ current_password: "", new_password: "", confirm_password: "" });
      await Swal.fire("Berhasil", result.message, "success");
    } catch (error) {
      await Swal.fire("Gagal", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-800 p-6 text-white shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
          Profil LocalStorage
        </p>
        <div className="mt-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-3xl font-bold">
          {(user?.username ?? "U").slice(0, 2).toUpperCase()}
        </div>
        <h2 className="mt-5 text-3xl font-bold">{user?.username ?? "User"}</h2>
        <p className="mt-2 inline-flex rounded-full bg-cyan-300/20 px-3 py-1 text-sm font-semibold uppercase text-cyan-100">
          {user?.role ?? "-"}
        </p>
        <p className="mt-6 text-sm leading-6 text-slate-200">
          Data profil ini dibaca langsung dari sesi autentikasi pada localStorage.
        </p>
        <Button type="button" onClick={showToken} className="mt-6 bg-white text-slate-900 hover:bg-cyan-50">
          Lihat Token
        </Button>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">
          Keamanan Akun
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">Ubah Password</h2>
        <p className="mt-2 text-sm text-slate-500">
          Password lama diverifikasi sebelum password baru disimpan sebagai hash bcrypt.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <FormField label="Password Lama" htmlFor="current_password">
            <TextInput id="current_password" name="current_password" type="password" value={form.current_password} onChange={handleChange} required />
          </FormField>
          <FormField label="Password Baru" htmlFor="new_password">
            <TextInput id="new_password" name="new_password" type="password" value={form.new_password} onChange={handleChange} minLength={6} required />
          </FormField>
          <FormField label="Konfirmasi Password Baru" htmlFor="confirm_password">
            <TextInput id="confirm_password" name="confirm_password" type="password" value={form.confirm_password} onChange={handleChange} minLength={6} required />
          </FormField>
          <Button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Ubah Password"}
          </Button>
        </form>
      </section>
    </div>
  );
}
