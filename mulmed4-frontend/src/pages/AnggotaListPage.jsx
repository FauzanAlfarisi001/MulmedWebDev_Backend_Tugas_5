import { useEffect, useState } from "react";
import { getAllAnggota, deleteAnggota } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AnggotaListPage() {
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pesan, setPesan] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    setLoading(true);
    const res = await getAllAnggota();
    if (res.success) setAnggota(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (nim) => {
    if (!token) return alert("Login dulu untuk menghapus!");
    if (!confirm(`Hapus anggota NIM ${nim}?`)) return;
    const res = await deleteAnggota(nim, token);
    if (res.success) {
      setPesan(`Anggota NIM ${nim} berhasil dihapus`);
      fetchData();
    } else {
      setPesan(res.message || "Gagal menghapus");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Daftar Anggota</h2>
      {pesan && <p style={{ color: pesan.includes("berhasil") ? "green" : "red" }}>{pesan}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : anggota.length === 0 ? (
        <p>Belum ada anggota.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead style={{ background: "#333", color: "#fff" }}>
            <tr>
              <th>NIM</th><th>Nama</th><th>Email</th><th>Umur</th><th>Jurusan</th><th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {anggota.map((a) => (
              <tr key={a.nim}>
                <td>{a.nim}</td>
                <td>{a.nama}</td>
                <td>{a.email}</td>
                <td>{a.umur}</td>
                <td>{a.jurusan}</td>
                <td>
                  <button onClick={() => navigate(`/anggota/${a.nim}`)} style={{ marginRight: "5px" }}>
                    Detail / Edit
                  </button>
                  {token && (
                    <button onClick={() => handleDelete(a.nim)} style={{ background: "red", color: "#fff", border: "none", cursor: "pointer" }}>
                      Hapus
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}