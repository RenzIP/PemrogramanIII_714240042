import { useEffect, useState } from "react";
import { getMahasiswa } from "../services/api";

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = () => {
    setLoading(true);
    getMahasiswa()
      .then(setMahasiswa)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // pertama kali load
  useEffect(() => {
    fetchData();
  }, []);
  

  if (loading) return <p className="text-center">Loading...</p>;

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-8xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Daftar Mahasiswa</h2>
      <p className="mb-4 text-sm font-medium text-gray-700">
        Total Mahasiswa: {mahasiswa.length}
      </p>

      <div className="overflow-hidden border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-300 border-b text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border">No</th>
              <th className="px-4 py-3 border">NPM</th>
              <th className="px-4 py-3 border">Nama / Prodi</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Alamat</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mahasiswa.map((mhs, index) => (
              <tr key={mhs.npm} className="hover:bg-blue-50">
                <td className="px-4 py-3 border">{index + 1}</td>
                <td className="px-4 py-3 border">{mhs.npm}</td>
                <td className="px-4 py-3 border">
                  <div className="font-medium">{mhs.nama}</div>
                  <div className="text-gray-500 text-xs">{mhs.prodi}</div>
                </td>
                <td className="px-4 py-3 text-gray-600 border">{mhs.email}</td>
                <td className="px-4 py-3 text-gray-500 border">{mhs.alamat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
