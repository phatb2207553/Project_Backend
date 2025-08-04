const express = require("express");
const router = express.Router();
const NhanVienController = require("../controllers/nhanvien.controller");
const { verifyToken, requireRole } = require("../middlewares/auth.middleware");

// Đăng nhập nhân viên
router.post("/login", NhanVienController.login);

// (tùy chọn) tạo nhân viên
router.post("/create", verifyToken, requireRole("admin"), NhanVienController.createNhanVien);

// (tùy chọn) xem hoặc sửa thông tin quản lý
router.get("/profile", verifyToken, requireRole("admin"), NhanVienController.getProfile);
router.put("/profile", verifyToken, requireRole("admin"), NhanVienController.updateProfile);

module.exports = router;
