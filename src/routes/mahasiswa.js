const express = require("express");
const router = express.Router();
const db = require("../db");
const { anggota } = require("../schema");
const { eq } = require("drizzle-orm");

router.get("/", async (req, res) => {
    try {
      const data = await db.select().from(anggota);

      res.json({ data });

    } catch (err) {
      console.error(err);

      res.status(500).json({ message: err.message });
    }
});

router.get("/:nim", async (req, res) => {
    try {
      const data = await db.select().from(anggota).where(eq(anggota.nim, req.params.nim));
      
      if (data.length === 0) {
        return res.status(404).json({
          message: "Mahasiswa tidak ada"
        });
      }
      
      res.json({ data: data[0] });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
      
      const { nama, nim, umur, email, jurusan } = req.body;
      
      if (!nama || nama.trim().length < 3) {
        return res.status(400).json({
          message: "Masukkan nama minimal 3 karakter"
        });
      }
      
      if (!nim || !/^[0-9]+$/.test(nim)) {
        return res.status(400).json({
          message: "Pastikan NIM yang dimasukkan berbentuk angka"
        });
      }
      
      if (!umur || isNaN(umur) || Number(umur) < 15) {
        return res.status(400).json({
          message: "Minimal umur 15 tahun"
        });
      }
      
      await db.insert(anggota).values({ nama, nim, umur: Number(umur), email, jurusan });
      
      res.status(201).json({ message: "Mahasiswa berhasil ditambahkan" });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
});

router.put("/:nim", async (req, res) => {
    try {
      await db.update(anggota).set(req.body).where(eq(anggota.nim, req.params.nim));
      
      res.json({ message: "Data mahasiswa berhasil diperbarui" });

    } catch (err) {

      console.error(err);
      res.status(500).json({ message: err.message });
    }
});

router.delete("/:nim", async (req, res) => {
    try {
      await db.delete(anggota).where(eq(anggota.nim, req.params.nim));
      
      res.json({ message: "Berhasil menghapus data" });

    } catch (err) {

      console.error(err);
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;