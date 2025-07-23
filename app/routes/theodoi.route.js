const express = require("express");
const router = express.Router();
const TheoDoiController = require("../controllers/theodoi.controller");
const { verifyToken, requireRole } = require("../middlewares/auth.middleware");

// Người dùng
router.post("/", verifyToken, requireRole("docgia"), TheoDoiController.dangKyMuon);
router.get("/lichsu", verifyToken, requireRole("docgia"), TheoDoiController.lichSuDocGia);

// Quản lý
router.put("/duyet/:id", verifyToken, requireRole("admin"), TheoDoiController.duyetMuon);
router.put("/tra/:id", verifyToken, requireRole("admin"), TheoDoiController.traSach);

module.exports = router;
