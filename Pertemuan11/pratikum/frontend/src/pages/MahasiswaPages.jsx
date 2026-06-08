import { useEffect, useState } from "react";
import { getMahasiswa } from "../services/api";

function MahasiswaPage() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadMahasiswa = async ({ isRefresh = false } = {}) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const data = await getMahasiswa();
      setMahasiswa(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data mahasiswa.");
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let active = true;

    getMahasiswa()
      .then((data) => {
        if (active) setMahasiswa(data);
      })
      .catch((err) => {
        if (active) setError(err.message || "Gagal mengambil data mahasiswa.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredMahasiswa = mahasiswa.filter((item) =>
    Object.values(item).some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()),
    ),
  );

  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Loading data mahasiswa...</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-linear-to-br from-sky-600 to-cyan-500 p-6 text-white shadow-lg">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-100">
          Pertemuan 11
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
          Data Mahasiswa
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-cyan-50">
          Halaman ini mengambil data dari backend dan mendukung pencarian
          berdasarkan nama, prodi, email, alamat, dan NPM.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Mahasiswa</p>
            <h3 className="text-3xl font-bold text-slate-900">
              {filteredMahasiswa.length}
            </h3>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari nama, prodi, email, alamat, atau NPM"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 sm:w-80"
            />
            <button
              type="button"
              onClick={() => loadMahasiswa({ isRefresh: true })}
              disabled={refreshing}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </button>
          </div>
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-6 py-4">NPM</th>
                  <th className="px-6 py-4">Nama / Prodi</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Alamat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredMahasiswa.length > 0 ? (
                  filteredMahasiswa.map((item) => (
                    <tr key={item.id} className="align-top">
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {item.npm || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">
                          {item.nama}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {item.prodi || "-"}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {item.email || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {item.alamat || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-sm text-slate-500"
                    >
                      Data tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MahasiswaPage;
