import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/atoms/Button";
import SelectInput from "../components/atoms/SelectInput";
import TextInput from "../components/atoms/TextInput";
import PageTitle from "../components/molecules/PageTitle";
import MahasiswaTable from "../components/organisms/MahasiswaTable";
import { deleteMahasiswa, getMahasiswa } from "../services/api";

export default function MahasiswaListPage() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [prodiFilter, setProdiFilter] = useState("");

  const prodiOptions = useMemo(() => {
    return [...new Set(mahasiswa.map((item) => item.prodi).filter(Boolean))].sort();
  }, [mahasiswa]);

  const filteredMahasiswa = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return mahasiswa.filter((mhs) => {
      const matchesKeyword = !keyword
        ? true
        : Object.values(mhs).some((value) =>
            String(value ?? "").toLowerCase().includes(keyword),
          );

      const matchesProdi = !prodiFilter ? true : mhs.prodi === prodiFilter;

      return matchesKeyword && matchesProdi;
    });
  }, [mahasiswa, search, prodiFilter]);

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      try {
        const data = await getMahasiswa();

        if (isMounted) {
          setMahasiswa(data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError("");
      const data = await getMahasiswa();
      setMahasiswa(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  const handleResetFilter = () => {
    setSearch("");
    setProdiFilter("");
  };

  const handleDelete = async (npm) => {
    const result = await Swal.fire({
      title: "Hapus data mahasiswa?",
      text: "Data yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setError("");
      await deleteMahasiswa(npm);
      setMahasiswa((prev) => prev.filter((item) => item.npm !== npm));
      await Swal.fire({
        title: "Berhasil",
        text: "Data mahasiswa berhasil dihapus.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      setError(err.message);
      await Swal.fire({
        title: "Gagal",
        text: err.message || "Gagal menghapus data.",
        icon: "error",
        confirmButtonText: "Tutup",
      });
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="space-y-4">
      <PageTitle
        title="Daftar Mahasiswa"
        description="Kelola data mahasiswa, tambahkan, edit, dan lihat detail."
        actions={
          <>
            <Link to="/dashboard">
              <Button type="button" variant="ghost">
                Kembali ke Dashboard
              </Button>
            </Link>
            <Link to="/mahasiswa/add">
              <Button type="button">Tambah Mahasiswa</Button>
            </Link>
          </>
        }
      />

      <p className="text-sm text-gray-600">
        Total Mahasiswa:{" "}
        <span className="rounded-md bg-blue-100 px-2 py-1 font-semibold text-blue-700">
          {mahasiswa.length}
        </span>
      </p>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px_auto_auto] lg:items-center">
        <TextInput
          type="text"
          placeholder="Cari semua data mahasiswa..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <SelectInput
          value={prodiFilter}
          onChange={(event) => setProdiFilter(event.target.value)}
        >
          <option value="">Semua Prodi</option>
          {prodiOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectInput>

        <Button
          type="button"
          variant="secondary"
          onClick={handleResetFilter}
        >
          Reset
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      <p className="text-sm text-slate-600">
        Hasil tampil:{" "}
        <span className="font-semibold text-slate-900">
          {filteredMahasiswa.length}
        </span>
      </p>

      {error ? <p className="text-sm text-red-500">Error: {error}</p> : null}

      <MahasiswaTable data={filteredMahasiswa} onDelete={handleDelete} />
    </div>
  );
}
