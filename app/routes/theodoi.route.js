const express = require("express");
const router = express.Router();
const TheoDoiController = require("../controllers/theodoi.controller");
const { verifyToken, requireRole } = require("../middlewares/auth.middleware");

// Người dùng
router.post("/", verifyToken, requireRole("docgia"), TheoDoiController.dangKyMuon);
router.get("/lichsu", verifyToken, requireRole("docgia"), TheoDoiController.lichSuDocGia);
router.delete("/xoadon/:id", verifyToken, requireRole("docgia"), TheoDoiController.xoaDonDangKy);

// Quản lý
router.put("/duyetdangky/:id", verifyToken, requireRole("admin"), TheoDoiController.duyetDangKy);
router.put("/duyetmuon/:id", verifyToken, requireRole("admin"), TheoDoiController.duyetMuon);
router.put("/tra/:id", verifyToken, requireRole("admin"), TheoDoiController.traSach);
router.get("/donmuon", verifyToken, requireRole("admin"), TheoDoiController.layDonMuonSach);
router.get("/dontra", verifyToken, requireRole("admin"), TheoDoiController.layDonTraSach);
router.get("/danhsach", verifyToken, requireRole("admin"), TheoDoiController.layTatCaDon);
router.delete("/xoadondaduyet/:id", verifyToken, requireRole("admin"), TheoDoiController.xoaDonDaDuyet);

module.exports = router;
