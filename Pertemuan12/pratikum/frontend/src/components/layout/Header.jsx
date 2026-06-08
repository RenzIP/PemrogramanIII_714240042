import Swal from "sweetalert2";
import { getAuthToken } from "../../services/auth";

export default function Header({ pageTitle, onToggleSidebar, user, onLogout }) {
  const showToken = () => {
    const token = getAuthToken();
    Swal.fire({
      title: "Token JWT",
      input: "textarea",
      inputValue: token ?? "Token tidak tersedia",
      inputAttributes: { readonly: "readonly" },
      confirmButtonText: "Tutup",
      width: 700,
    });
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 text-slate-800 backdrop-blur">
      <div className="flex w-full items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="mr-3 rounded-lg border border-slate-300 bg-white px-2 py-1 text-xl leading-none shadow-sm md:hidden"
            aria-label="Buka menu"
          >
            Menu
          </button>
          <div>
            <h1 className="text-lg font-semibold md:text-xl">Praktikum 12</h1>
            <p className="text-xs text-slate-500">{pageTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-semibold text-slate-800">{user?.username ?? "User"}</p>
            <p className="text-[11px] uppercase text-slate-500">{user?.role ?? "-"}</p>
          </div>
          <button
            type="button"
            onClick={showToken}
            className="hidden rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 sm:block"
          >
            Lihat Token
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
