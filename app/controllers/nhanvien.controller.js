const NhanVienService = require("../services/nhanvien.service");

exports.login = async (req, res) => {
  try {
    const token = await NhanVienService.login(req.body);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.createNhanVien = async (req, res, next) => {
  try {
    const user = await NhanVienService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await NhanVienService.getProfile(req.user.id);
    res.json(profile);
  } catch (err) {
    res.status(404).json({ message: "Không tìm thấy nhân viên" });
  }
};
