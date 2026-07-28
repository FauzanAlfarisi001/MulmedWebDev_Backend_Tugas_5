const db = require("../config/db");
const { users } = require("../models/schema");
const { eq } = require("drizzle-orm");

exports.getAll = async (req, res) => {
    try {
        const data = await db.select().from(users);
        res.json({ data });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });

    }
};

exports.getNim = async (req, res) => {
    try {
        const data = await db.select().from(users).where(eq(users.nim, req.params.nim));

        if (data.length === 0) {
            return res.status(404).json({
                message: "Mahasiswa tidak ada"
            });
        }

        res.json({
            data: data[0]
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.update = async (req, res) => {
    try {

        const data = await db.update(users).set(req.body).where(eq(users.nim, req.params.nim)).returning();

        if (data.length === 0) {
            return res.status(404).json({
                message: "Mahasiswa tidak ada"
            });
        }

        res.json({
            message: "Data mahasiswa berhasil diperbarui",
            data: data[0]
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await db.delete(users).where(eq(users.nim, req.params.nim)).returning();

        if (data.length === 0) {

            return res.status(404).json({
                message: "Mahasiswa tidak ada"
            });
        }

        res.json({
            message: "Berhasil menghapus data"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};