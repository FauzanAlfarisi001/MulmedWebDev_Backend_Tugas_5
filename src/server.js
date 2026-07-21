require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/mahasiswa", require("./routes/mahasiswa"));

app.listen(PORT, () => {
    console.log("Server jalan");
});