const express = require("express");
const router = express.Router();
const SachController = require("../controllers/sach.controller");
const { verifyToken, requireRole } = require("../middlewares/auth.middleware");

router.get("/", SachController.getAll);
router.get("/available", SachController.getAvailable);
router.post("/", verifyToken, requireRole("admin"), SachController.create);
router.put("/:id", verifyToken, requireRole("admin"), SachController.update);
router.delete("/:id", verifyToken, requireRole("admin"), SachController.remove);

module.exports = router;
