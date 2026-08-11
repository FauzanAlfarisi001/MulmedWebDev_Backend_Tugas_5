module.exports = (err, req, res, next) => {
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Ada kesalahan/error server";

    if (err.code === "23505") {
        statusCode = 409;
        message = "Data sudah ada";
    }

    if (err.code === "23503") {
        statusCode = 400;
        message = "Relasi data tidak valid";
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};