export default function AuthLayout({ eyebrow, title, description, children }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.32),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.24),_transparent_40%)]" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950 p-10 text-white lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
            Pertemuan 12
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight">
            JWT Session & Profile
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-blue-100">
            Kelola sesi, profil, password, token, dan hak akses pengguna dalam
            satu aplikasi.
          </p>
          <div className="mt-10 grid gap-3 text-sm text-blue-50">
            <p className="rounded-2xl border border-white/10 bg-white/10 p-4">
              Ubah password diamankan menggunakan bcrypt.
            </p>
            <p className="rounded-2xl border border-white/10 bg-white/10 p-4">
              Respons 403 membedakan akun user dan admin.
            </p>
          </div>
        </section>
        <section className="p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          <div className="mt-8">{children}</div>
        </section>
      </div>
    </main>
  );
}
