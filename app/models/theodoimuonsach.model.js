const mongoose = require("mongoose");

const theoDoiSchema = new mongoose.Schema({
  maDocGia: { type: mongoose.Schema.Types.ObjectId, ref: "DocGia" }, // Ai mượn
  msnv: { type: mongoose.Schema.Types.ObjectId, ref: "NhanVien" }, // Ai cho mượn 
  maSach: { type: mongoose.Schema.Types.ObjectId, ref: "Sach" },     // Mượn sách nào
  ngayMuon: { type: Date, default: Date.now },
  ngayTra: Date,

  // Trạng thái: chờ duyệt, đã duyệt, đang mượn, đã trả, mất
  trangThai: {
    type: String,
    enum: ["pending", "approved", "borrowed", "returned", "lost"],
    default: "pending"
  },

  tienPhat: { type: Number, default: 0 }  // Tiền phạt nếu có
}, { 
  collection: "TheoDoiMuonSach",
  timestamps: true 
});

module.exports = mongoose.model("TheoDoiMuonSach", theoDoiSchema);
