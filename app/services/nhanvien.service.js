const NhanVien = require("../models/nhanvien.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.login = async ({ msnv, password }) => {
  const admin = await NhanVien.findOne({ msnv });
  if (!admin) throw new Error("Sai mã nhân viên");

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) throw new Error("Sai mật khẩu");

  return jwt.sign({ id: admin._id, role: "admin" }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

exports.create = async (data) => {
  const existing = await NhanVien.findOne({ msnv: data.msnv });
  if (existing) throw new Error("MSNV đã tồn tại");

  data.password = await bcrypt.hash(data.password, 10);
  return await NhanVien.create(data);
};


exports.getProfile = async (id) => {
  return await NhanVien.findById(id).select("-password");
};

exports.updateProfile = async (id, data) => {
  const { password, ...info } = data;
  if (password) {
    info.password = await bcrypt.hash(password, 10);
  }
  return await NhanVien.findByIdAndUpdate(id, info, { new: true, runValidators: true }).select("-password");
};