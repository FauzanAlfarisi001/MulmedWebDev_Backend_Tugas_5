import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AnggotaListPage from "./pages/AnggotaListPage";
import AnggotaDetailPage from "./pages/AnggotaDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/anggota" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/anggota" element={<AnggotaListPage />} />
        <Route path="/anggota/:nim" element={<AnggotaDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}