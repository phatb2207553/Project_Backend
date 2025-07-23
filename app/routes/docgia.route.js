const express = require("express");
const router = express.Router();
const DocGiaController = require("../controllers/docgia.controller");
const { verifyToken, requireRole } = require("../middlewares/auth.middleware");

// Đăng ký & đăng nhập
router.post("/register", DocGiaController.register);
router.post("/login", DocGiaController.login);

// Lấy thông tin cá nhân (sau khi login)
router.get("/profile", verifyToken, requireRole("docgia"), DocGiaController.getProfile);

module.exports = router;
