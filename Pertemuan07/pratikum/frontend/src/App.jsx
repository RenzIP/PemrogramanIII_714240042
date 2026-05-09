import { useState } from "react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import DashboardPage from "./pages/DashboardPages";
import DataDiriPage from "./pages/DataDiriPages";
import MahasiswaPage from "./pages/MahasiswaPages";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pageTitle =
    activePage === "dashboard"
      ? "Dashboard"
      : activePage === "mahasiswa"
        ? "Daftar Mahasiswa"
        : "Data Diri";

  const renderPage = () => {
    if (activePage === "dashboard") {
      return <DashboardPage />;
    }

    if (activePage === "mahasiswa") {
      return <MahasiswaPage />;
    }

    return <DataDiriPage />;
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Sidebar
        activePage={activePage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectPage={(page) => {
          setActivePage(page);
          setIsSidebarOpen(false);
        }}
      />

      <div className="flex min-h-screen flex-col lg:ml-72">
        <Header
          pageTitle={pageTitle}
          onToggleSidebar={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{renderPage()}</main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
