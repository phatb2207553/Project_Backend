const mongoose = require("mongoose");

const docGiaSchema = new mongoose.Schema({
  maDocGia: { type: String, unique: true },
  hoLot: String,
  ten: String,
  ngaySinh: Date,
  phai: String,
  diaChi: String,
  dienThoai: String,
  password: { type: String, required: true } 
}, { collection: "DocGia" });

module.exports = mongoose.model("DocGia", docGiaSchema);
