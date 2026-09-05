import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px 20px", background: "#333", color: "#fff", display: "flex", gap: "15px", alignItems: "center" }}>
      <Link to="/anggota" style={{ color: "#fff", textDecoration: "none" }}>Daftar Anggota</Link>
      {!token ? (
        <>
          <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>Login</Link>
          <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>Register</Link>
        </>
      ) : (
        <button onClick={handleLogout} style={{ background: "red", color: "#fff", border: "none", cursor: "pointer", padding: "5px 10px" }}>
          Logout
        </button>
      )}
    </nav>
  );
}