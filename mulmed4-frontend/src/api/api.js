const BASE_URL = "http://localhost:3000/api";

export const register = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getAllAnggota = async () => {
  const res = await fetch(`${BASE_URL}/anggota`);
  return res.json();
};

export const getAnggotaByNim = async (nim) => {
  const res = await fetch(`${BASE_URL}/anggota/${nim}`);
  return res.json();
};

export const updateAnggota = async (nim, data, token) => {
  const res = await fetch(`${BASE_URL}/anggota/${nim}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteAnggota = async (nim, token) => {
  const res = await fetch(`${BASE_URL}/anggota/${nim}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};