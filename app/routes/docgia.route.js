const express = require("express");
const router = express.Router();
const DocGiaController = require("../controllers/docgia.controller");
const { verifyToken, requireRole } = require("../middlewares/auth.middleware");

// Đăng ký & đăng nhập
router.post("/register", DocGiaController.register);
router.post("/login", DocGiaController.login);

// Lấy thông tin cá nhân (sau khi login)
router.get("/profile", verifyToken, requireRole("docgia"), DocGiaController.getProfile);
router.put("/profile", verifyToken, requireRole("docgia"), DocGiaController.updateProfile);
router.delete("/profile", verifyToken, requireRole("docgia"), DocGiaController.deleteAccount);

// Admin quản lý
router.post("/create", verifyToken, requireRole("admin"), DocGiaController.createDocGiaByAdmin);                        // Thêm độc giả mới
router.get("/get_reader", verifyToken, requireRole("admin"), DocGiaController.getAllDocGia);                            // Lấy tất cả độc giả
router.get("/get_reader/:id", verifyToken, requireRole("admin"), DocGiaController.getOneDocGia);                        // Lấy chi tiết một độc giả
router.put("/update_reader/:id", verifyToken, requireRole("admin"), DocGiaController.updateDocGiaByAdmin);              // Cập nhật (có thể đổi mật khẩu)
router.delete("/delete_reader/:id", verifyToken, requireRole("admin"), DocGiaController.deleteDocGiaByAdmin);           // Xóa độc giả

module.exports = router;
