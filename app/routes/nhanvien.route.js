const express = require("express");
const router = express.Router();
const NhanVienController = require("../controllers/nhanvien.controller");
const { verifyToken, requireRole } = require("../middlewares/auth.middleware");

// Đăng nhập nhân viên
router.post("/login", NhanVienController.login);

// (tùy chọn) xem thông tin quản lý
router.get("/profile", verifyToken, requireRole("admin"), NhanVienController.getProfile);

// (tùy chọn) tạo nhân viên
router.post("/create", verifyToken, requireRole("admin"), NhanVienController.createNhanVien);

module.exports = router;
