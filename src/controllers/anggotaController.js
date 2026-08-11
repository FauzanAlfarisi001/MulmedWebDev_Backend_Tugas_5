const bcrypt = require("bcrypt");
const db = require("../config/db");
const { users } = require("../models/schema");
const { eq } = require("drizzle-orm");

exports.getAll = async (req, res, next) => {
    
    try {
        const data = await db
            .select({
                id: users.id,
                nama: users.nama,
                email: users.email,
                nim: users.nim,
                umur: users.umur,
                jurusan: users.jurusan
            })
            .from(users);

        res.json({
            success: true,
            data
        });

    } catch (err) {
        next(err);
    }
};


exports.getNim = async (req, res, next) => {
    try {
        const data = await db
            .select({
                id: users.id,
                nama: users.nama,
                email: users.email,
                nim: users.nim,
                umur: users.umur,
                jurusan: users.jurusan
            })
            .from(users)
            .where(eq(users.nim, req.params.nim));

        if (data.length === 0) {
            const error = new Error("Mahasiswa tidak bisa ditemukan");
            error.statusCode = 404;
            return next(error);
        }

        res.json({
            success: true,
            data: data[0]
        });

    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { nama, email, nim, umur, jurusan } = req.body;

        if (nama !== undefined && nama.trim().length < 3) {
            const error = new Error("Nama minimal 3 karakter");
            error.statusCode = 400;
            return next(error);
        }

        if (nim !== undefined && !/^[0-9]+$/.test(nim)) {
            const error = new Error("NIM harus angka");
            error.statusCode = 400;
            return next(error);
        }

        if (umur !== undefined && (isNaN(umur) || Number(umur) < 15)) {
            const error = new Error("Umur minimal 15 tahun");
            error.statusCode = 400;
            return next(error);
        }

        const data = await db.update(users)
            .set({
                ...(nama !== undefined && { nama }),
                ...(email !== undefined && { email }),
                ...(nim !== undefined && { nim }),
                ...(umur !== undefined && { umur: Number(umur) }),
                ...(jurusan !== undefined && { jurusan })
            })
            .where(eq(users.nim, req.params.nim))
            .returning({
                id: users.id,
                nama: users.nama,
                email: users.email,
                nim: users.nim,
                umur: users.umur,
                jurusan: users.jurusan
            });

        if (data.length === 0) {
            const error = new Error("Mahasiswa tidak bisa ditemukan");
            error.statusCode = 404;
            return next(error);
        }

        res.json({
            success: true,
            message: "Data mahasiswa sudah diperbarui",
            data: data[0]
        });

    } catch (err) {
        next(err);
    }
};


exports.delete = async (req, res, next) => {
    try {
        const data = await db.delete(users).where(eq(users.nim, req.params.nim))
            .returning({
                id: users.id,
                nama: users.nama,
                nim: users.nim
            });

        if (data.length === 0) {
            const error = new Error("Mahasiswa tidak bisa ditemukan");
            error.statusCode = 404;
            return next(error);
        }

        res.json({
            success: true,
            message: "Data mahasiswa sudah dihapus",
            data: data[0]
        });

    } catch (err) {
        next(err);
    }
};