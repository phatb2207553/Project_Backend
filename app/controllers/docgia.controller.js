const DocGiaService = require("../services/docgia.service");

exports.register = async (req, res) => {
  try {
    const user = await DocGiaService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await DocGiaService.login(req.body);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await DocGiaService.getProfile(req.user.id);
    res.json(profile);
  } catch (err) {
    res.status(404).json({ message: "Không tìm thấy độc giả" });
  }
};

exports.updateProfile = async (req, res) => {
  const result = await DocGiaService.updateProfile(req.user.id, req.body);
  res.json({
    message: "Cập nhật thành công",
    data: result
  });
};

exports.deleteAccount = async (req, res) => {
  await DocGiaService.deleteAccount(req.user.id);
  res.json({ message: "Tài khoản đã được xóa" });
};

// Cấp quyền admin quản lý độc giả
// ✅ Thêm mới độc giả
exports.createDocGiaByAdmin = async (req, res, next) => {
  try {
    const created = await DocGiaService.createByAdmin(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

// ✅ Lấy tất cả độc giả
exports.getAllDocGia = async (req, res, next) => {
  try {
    const users = await DocGiaService.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// ✅ Lấy 1 độc giả theo ID
exports.getOneDocGia = async (req, res, next) => {
  try {
    const user = await DocGiaService.getOne(req.params.id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy độc giả" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// ✅ Cập nhật thông tin độc giả
exports.updateDocGiaByAdmin = async (req, res, next) => {
  try {
    const updated = await DocGiaService.updateByAdmin(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// ✅ Xóa độc giả
exports.deleteDocGiaByAdmin = async (req, res, next) => {
  try {
    await DocGiaService.deleteByAdmin(req.params.id);
    res.json({ message: "Xóa độc giả thành công" });
  } catch (err) {
    next(err);
  }
};
