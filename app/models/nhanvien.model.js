const mongoose = require("mongoose");

const nhanVienSchema = new mongoose.Schema({
  msnv: { type: String, unique: true },
  hoTenNV: String,
  password: String,
  chucVu: String,
  diaChi: String,
  soDienThoai: String
}, { collection: "NhanVien" });

module.exports = mongoose.model("NhanVien", nhanVienSchema);
