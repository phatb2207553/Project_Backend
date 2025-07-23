// scripts/create-admin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const NhanVien = require("../models/nhanvien.model");

(async () => {
  await mongoose.connect("mongodb://localhost:27017/QuanLyMuonSach");

  const exists = await NhanVien.findOne({ msnv: "admin" });
  if (!exists) {
    const hashed = await bcrypt.hash("admin123", 10);
    await NhanVien.create({
      msnv: "admin",
      hoTenNV: "Quản trị hệ thống",
      password: hashed,
      chucVu: "admin",
      diaChi: "Unknown",
      soDienThoai: "0900000000"
    });
    console.log("✅ Admin đã tạo.");
  } else {
    console.log("⚠️ Admin đã tồn tại.");
  }

  mongoose.disconnect();
})();
