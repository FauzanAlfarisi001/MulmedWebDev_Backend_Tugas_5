const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/anggota", require("./routes/anggotaRoutes"));

app.use((req, res, next) => {
    const error = new Error(`Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`);
    error.statusCode = 404;
    next(error);
});

app.use(require("./middlewares/errorMiddleware"));

module.exports = app;