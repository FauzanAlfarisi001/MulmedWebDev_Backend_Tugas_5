import { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [pesan, setPesan] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res.success) {
      localStorage.setItem("token", res.token);
      setPesan("Login berhasil! Mengalihkan...");
      setTimeout(() => navigate("/anggota"), 1000);
    } else {
      setPesan(res.message || "Login gagal");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", border: "1px solid #ccc" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {["email", "password"].map((field) => (
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
          Login
        </button>
      </form>
      {pesan && <p style={{ marginTop: "10px", color: pesan.includes("berhasil") ? "green" : "red" }}>{pesan}</p>}
    </div>
  );
}