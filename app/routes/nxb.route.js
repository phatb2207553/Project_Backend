const express = require("express");
const router = express.Router();
const NXBController = require("../controllers/nxb.controller");
const { verifyToken, requireRole } = require("../middlewares/auth.middleware");

// Chỉ admin mới được thao tác
router.post("/", verifyToken, requireRole("admin"), NXBController.create);
router.get("/", verifyToken, NXBController.getAll);
router.put("/:id", verifyToken, requireRole("admin"), NXBController.update);
router.delete("/:id", verifyToken, requireRole("admin"), NXBController.remove);

module.exports = router;
