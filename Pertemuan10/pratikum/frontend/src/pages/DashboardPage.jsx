import { Link } from "react-router-dom";
import Button from "../components/atoms/Button";

const stats = [
  { label: "Materi Aktif", value: "CRUD React" },
  { label: "Pertemuan", value: "10" },
  { label: "Fitur", value: "Routing + Atomic" },
];

const highlights = [
  "Kelola data mahasiswa dengan create, read, update, dan delete.",
  "Routing React membuat refresh tetap berada di halaman yang sama.",
  "SweetAlert2 dipakai untuk konfirmasi dan notifikasi aksi data.",
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 p-6 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.25em] text-blue-100">
          Pertemuan 10
        </p>
        <h2 className="mt-2 text-3xl font-bold">Dashboard CRUD Mahasiswa</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-50">
          Praktikum ini berfokus pada React Router, Atomic Design, dan operasi
          CRUD penuh untuk data mahasiswa.
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
