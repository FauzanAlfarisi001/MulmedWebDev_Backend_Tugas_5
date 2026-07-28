const express = require("express");
const router = express.Router();
const anggotaController = require("../controllers/anggotaController");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/", anggotaController.getAll);
router.get("/:nim", anggotaController.getNim);
router.put("/:nim", verifyToken, anggotaController.update);
router.delete("/:nim", verifyToken, anggotaController.delete);

module.exports = router;