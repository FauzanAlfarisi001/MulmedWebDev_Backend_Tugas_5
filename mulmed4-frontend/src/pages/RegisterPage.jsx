import { useState } from "react";
import { register } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nama: "", email: "", password: "", nim: "", umur: "", jurusan: "" });
  const [pesan, setPesan] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register({ ...form, umur: Number(form.umur) });
    if (res.success) {
      setPesan("Registrasi berhasil! Silakan login.");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setPesan(res.message || "Registrasi gagal");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", border: "1px solid #ccc" }}>
      <h2>Register Mahasiswa</h2>
      <form onSubmit={handleSubmit}>
        {["nama", "email", "password", "nim", "umur", "jurusan"].map((field) => (
          <div key={field} style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>{field.toUpperCase()}</label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "6px", boxSizing: "border-box" }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: "8px 20px", background: "#333", color: "#fff", border: "none", cursor: "pointer" }}>
          Register
        </button>
      </form>
      {pesan && <p style={{ marginTop: "10px", color: pesan.includes("berhasil") ? "green" : "red" }}>{pesan}</p>}
    </div>
  );
}