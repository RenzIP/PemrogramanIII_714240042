const personalData = [
  { label: "Nama", value: "Renz" },
  { label: "NPM", value: "714240042" },
  { label: "Program Studi", value: "D4 Teknik Informatika" },
  { label: "Kelas", value: "2C" },
  { label: "Email", value: "renz@example.com" },
];

export default function DataDiriPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Data Diri</h2>
        <p className="mt-1 text-sm text-slate-500">
          Halaman statis untuk latihan menambah menu dan memahami layout React.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Profil Mahasiswa
          </h3>

          <div className="mt-4 space-y-3">
            {personalData.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm font-medium text-slate-500">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Catatan
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Layout halaman ini memanfaatkan struktur utama yang sama seperti
            Dashboard dan Mahasiswa. Perbedaannya hanya pada konten yang dirender
            berdasarkan state activePage di App.jsx.
          </p>
        </aside>
      </div>
    </div>
  );
}
