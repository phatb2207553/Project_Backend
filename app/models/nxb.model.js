const mongoose = require("mongoose");

const nxbSchema = new mongoose.Schema({
  maNXB: { type: String, unique: true },
  tenNXB: String,
  diaChi: String
}, { collection: "NhaXuatBan" }); 
//mongoose.model() tạo schema sẽ tự động thêm 
//id và __v *dùng để theo dõi số lần sửa đổi document*

module.exports = mongoose.model("NhaXuatBan", nxbSchema);
