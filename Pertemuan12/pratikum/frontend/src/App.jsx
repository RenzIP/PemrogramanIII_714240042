import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import PrivateRoute from "./components/routes/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import MahasiswaDetailPage from "./pages/MahasiswaDetailPage";
import MahasiswaFormPage from "./pages/MahasiswaFormPage";
import MahasiswaListPage from "./pages/MahasiswaListPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mahasiswa" element={<MahasiswaListPage />} />
          <Route path="/mahasiswa/add" element={<MahasiswaFormPage mode="create" />} />
          <Route path="/mahasiswa/:npm" element={<MahasiswaDetailPage />} />
          <Route path="/mahasiswa/:npm/edit" element={<MahasiswaFormPage mode="edit" />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
