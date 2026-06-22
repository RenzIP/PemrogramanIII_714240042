import { Link } from "react-router-dom";

export default function MahasiswaTable({ data, onDelete }) {
  const baseActionClass =
    "inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold transition hover:shadow-sm";

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b bg-gray-300 text-xs uppercase text-gray-700">
          <tr>
            <th className="border px-4 py-3">No</th>
            <th className="border px-4 py-3">NPM</th>
            <th className="border px-4 py-3">Nama / Prodi</th>
            <th className="border px-4 py-3">Email</th>
            <th className="border px-4 py-3">Alamat</th>
            <th className="border px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.length > 0 ? (
            data.map((mhs, index) => (
              <tr key={mhs.npm} className="hover:bg-blue-50">
                <td className="border px-4 py-3">{index + 1}</td>
                <td className="border px-4 py-3">{mhs.npm}</td>
                <td className="border px-4 py-3">
                  <div className="font-medium">{mhs.nama}</div>
                  <div className="text-xs text-gray-500">{mhs.prodi}</div>
                </td>
                <td className="border px-4 py-3 text-gray-600">{mhs.email}</td>
                <td className="border px-4 py-3 text-gray-500">{mhs.alamat}</td>
                <td className="border px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/mahasiswa/${mhs.npm}`}
                      className={`${baseActionClass} border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100`}
                    >
                      Detail
                    </Link>
                    <Link
                      to={`/mahasiswa/${mhs.npm}/edit`}
                      className={`${baseActionClass} border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100`}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete?.(mhs.npm)}
                      className={`${baseActionClass} border-red-200 bg-red-50 text-red-700 hover:bg-red-100`}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-4 text-center text-slate-500">
                Data tidak ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
