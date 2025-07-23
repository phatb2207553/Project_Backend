const DocGia = require("../models/docgia.model");
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
  if (!user) throw new Error("Sai mã độc giả hoặc mật khẩu");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Sai mật khẩu");

  return jwt.sign({ id: user._id, role: "docgia" }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

exports.getProfile = async (id) => {
  return await DocGia.findById(id).select("-password");
};
