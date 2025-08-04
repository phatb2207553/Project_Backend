const DocGia = require("../models/docgia.model");
const TheoDoi =require("../models/theodoimuonsach.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.register = async (data) => {
  const { maDocGia, password, ...info } = data;
  const existing = await DocGia.findOne({ maDocGia });
  if (existing) throw new Error("Độc giả đã tồn tại");
  const hashed = await bcrypt.hash(password, 10);
  return await DocGia.create({ maDocGia, password: hashed, ...info });
};

exports.login = async ({ maDocGia, password }) => {
  const user = await DocGia.findOne({ maDocGia });
  if (!user) throw new Error("Sai tên tài khoản hoặc mật khẩu");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Sai mật khẩu");

  return jwt.sign({ id: user._id, role: "docgia" }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

exports.getProfile = async (id) => {
  return await DocGia.findById(id).select("-password");
};

exports.updateProfile = async (id, data) => {
  const { password, ...info } = data;
  if (password) {
    info.password = await bcrypt.hash(password, 10);
  }
  return await DocGia.findByIdAndUpdate(id, info, { new: true, runValidators: true }).select("-password");
};

exports.deleteAccount = async (id) => {
  // Kiểm tra xem có đơn mượn nào chưa hoàn tất không
  const donMuonTonTai = await TheoDoi.exists({
    maDocGia: id,
    trangThai: { $in: ["pending", "approved", "borrowed"] },
  });

  if (donMuonTonTai) {
    throw new Error("Bạn không thể xóa tài khoản khi còn đơn mượn chưa hoàn tất.");
  }

  // Nếu không có đơn mượn, cho phép xóa
  return await DocGia.findByIdAndDelete(id);
};

// Cấp quyền cho admin quản lý độc giả
exports.createByAdmin = async (data) => {
  const existing = await DocGia.findOne({ maDocGia: data.maDocGia });
  if (existing) throw new Error("Mã độc giả đã tồn tại");

  const hashedPassword = await bcrypt.hash(data.password || "123456", 10);

  return await DocGia.create({
    ...data,
    password: hashedPassword
  });
};

// ✅ Cập nhật thông tin độc giả (có thể đổi mật khẩu)
exports.updateByAdmin = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return await DocGia.findByIdAndUpdate(id, data, { new: true }).select("-password");
};

exports.getAll = async () => {
  return await DocGia.find().select("-password");
};

exports.getOne = async (id) => {
  return await DocGia.findById(id).select("-password");
};

exports.updateByAdmin = async (id, data) => {
  return await DocGia.findByIdAndUpdate(id, data, { new: true }).select("-password");
};

exports.deleteByAdmin = async (docGiaId) => {
  // Kiểm tra tồn tại đơn mượn chưa hoàn tất
  const tonTaiDonMuon = await TheoDoi.exists({
    maDocGia: docGiaId,
    trangThai: { $in: ["pending", "approved", "borrowed"] }
  });

  if (tonTaiDonMuon) {
    throw new Error("Không thể xóa độc giả vì còn đơn mượn chưa hoàn tất.");
  }

  // Nếu không có đơn mượn, cho phép xóa
  return await DocGia.findByIdAndDelete(docGiaId);
};