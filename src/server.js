require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/anggota", require("./routes/anggotaRoutes"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server jalan di port ${PORT}`);
});