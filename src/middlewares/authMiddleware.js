const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            const error = new Error("Silahkan masukkan token");
            error.statusCode = 401;
            return next(error);
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            const error = new Error("Pastikan format tokennya: Bearer <token>");
            error.statusCode = 401;
            return next(error);
        }

        const token = parts[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (err) {
        err.statusCode = 401;
        err.message = "Token salah atau sudah kadaluarsa";
        next(err);
    }
};