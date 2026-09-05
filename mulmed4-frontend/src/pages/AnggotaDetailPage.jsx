import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnggotaByNim, updateAnggota } from "../api/api";

export default function AnggotaDetailPage() {
  const { nim } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [data, setData] = useState(null);
  const [form, setForm] = useState({});
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await getAnggotaByNim(nim);
      if (res.success) {
        setData(res.data);
        setForm({ nama: res.data.nama, email: res.data.email, umur: res.data.umur, jurusan: res.data.jurusan });
      } else {
        setPesan(res.message || "Data tidak ditemukan");
      }
      setLoading(false);
    };
    fetchDetail();
  }, [nim]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!token) return alert("Login dulu untuk mengupdate!");
    const res = await updateAnggota(nim, { ...form, umur: Number(form.umur) }, token);
    if (res.success) {
      setPesan("Data berhasil diupdate!");
      setData(res.data);
    } else {
      setPesan(res.message || "Gagal update");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px", border: "1px solid #ccc" }}>
      <button onClick={() => navigate("/anggota")} style={{ marginBottom: "15px" }}>← Kembali</button>
      <h2>Detail Anggota — NIM: {nim}</h2>
      {pesan && <p style={{ color: pesan.includes("berhasil") ? "green" : "red" }}>{pesan}</p>}
      {data && (
        <>
          <p><strong>Nama:</strong> {data.nama}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Umur:</strong> {data.umur}</p>
          <p><strong>Jurusan:</strong> {data.jurusan}</p>

          {token && (
            <>
              <hr />
              <h3>Update Data</h3>
              <form onSubmit={handleUpdate}>
                {["nama", "email", "umur", "jurusan"].map((field) => (
                  <div key={field} style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "4px" }}>{field.toUpperCase()}</label>
                    <input
                      type="text"
                      name={field}
                      value={form[field] || ""}
                      onChange={handleChange}
                      style={{ width: "100%", padding: "6px", boxSizing: "border-box" }}
                    />
                  </div>
                ))}
                <button type="submit" style={{ padding: "8px 20px", background: "#333", color: "#fff", border: "none", cursor: "pointer" }}>
                  Update
                </button>
              </form>
            </>
          )}
          {!token && <p style={{ color: "gray", marginTop: "10px" }}><em>Login untuk mengupdate data.</em></p>}
        </>
      )}
    </div>
  );
}