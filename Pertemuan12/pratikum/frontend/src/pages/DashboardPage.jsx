import { Link } from "react-router-dom";
import Button from "../components/atoms/Button";

const stats = [
  { label: "Materi Aktif", value: "JWT Session" },
  { label: "Pertemuan", value: "12" },
  { label: "Fitur Mandiri", value: "4 Selesai" },
];

const highlights = [
  "Respons 403 menampilkan pesan khusus ketika akun bukan admin.",
  "Profil menampilkan username dan role dari localStorage.",
  "Password dapat diubah dan token JWT dapat dilihat melalui modal.",
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 p-6 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.25em] text-blue-100">
          Pertemuan 12
        </p>
        <h2 className="mt-2 text-3xl font-bold">JWT Session & Profile</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-50">
          Praktikum ini mengembangkan autentikasi JWT dengan profil pengguna,
          ubah password, inspeksi token, dan penanganan akses role.
        </p>
        <div className="mt-5">
          <Link to="/mahasiswa">
            <Button type="button" className="bg-white text-slate-900 hover:bg-blue-50">
              Buka Data Mahasiswa
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Ringkasan Praktikum
        </h3>
        <ul className="mt-4 space-y-3">
          {highlights.map((item) => (
            <li key={item} className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
