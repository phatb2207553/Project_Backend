const mongoose = require("mongoose");

const sachSchema = new mongoose.Schema({
  maSach: { type: String, unique: true },      // Mã sách
  tenSach: String,                             // Tên sách
  donGia: Number,                              // Giá tiền
  soQuyen: Number,                             // Số lượng sách còn
  namXuatBan: Number,                          // Năm xuất bản
  maNXB: String,                               // Mã nhà xuất bản 
  tacGia: String                               // Tác giả (hoặc nguồn gốc)
}, { 
  collection: "Sach" , 
  timestamps: true 
});

module.exports = mongoose.model("Sach", sachSchema);
