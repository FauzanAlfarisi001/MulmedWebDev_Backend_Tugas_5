const bcrypt = require("bcrypt");
const db = require("../config/db");
const {users} = require("../models/schema");
const jwt = require("jsonwebtoken");
const { eq } = require("drizzle-orm");

exports.register = async (req,res) => {

    console.log("Register dipanggil");

    try {
        const {nama, email, password, nim, umur, jurusan} = req.body;

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

        const existingUser = await db.select().from(users).where(eq(users.email, email));

        const sameNim = await db.select().from(users).where(eq(users.nim, nim));

        if (existingUser.length > 0) {
            return res.status(400).json({
                message: "Email sudah terdaftar"
            });
        }

        if (sameNim.lenght > 0) {
            return res.status(400).json({
                message: "Sudah ada anggota dengan NIM itu"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        await db.insert(users).values({ nama, email, password:hash, nim, umur, jurusan});

        res.status(201).json({
            success: true,
            message:"Registrasi berhasil"
        });

    } catch(err){
        next(err);
    }
}

exports.login = async(req,res) => {
    try{
        const {email,password} = req.body;

        const user = (await db.select().from(users).where(eq(users.email, email)))[0];

        if (!user){
            return res.status(401).json({
                message:"Email salah"
            });
        }

        const cocok = await bcrypt.compare(password,user.password);

        if (!cocok){
            return res.status(401).json({
                message:"Password salah"
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn:"1h" }
        );

        res.json({
            success: true,
            message: "Login berhasil",
            token
        });

    } catch(err){
        next(err);
    }
}