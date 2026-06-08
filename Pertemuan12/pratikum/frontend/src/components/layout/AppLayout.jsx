import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clearAuthSession, getAuthUser } from "../../services/auth";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/mahasiswa": "Data Mahasiswa",
  "/profile": "Profil",
};

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getAuthUser();

  const pageTitle = useMemo(() => {
    if (location.pathname.startsWith("/mahasiswa")) return "Data Mahasiswa";
    return PAGE_TITLES[location.pathname] ?? "Praktikum";
  }, [location.pathname]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Sesi login akan dihapus dari browser.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    });

    if (result.isConfirmed) {
      clearAuthSession();
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex min-h-screen flex-col md:pl-72">
        <Header
          pageTitle={pageTitle}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          user={user}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-3 sm:p-4 md:p-6">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
