const TheoDoi = require("../models/theodoimuonsach.model");
const Sach = require("../models/sach.model");

exports.dangKyMuon = async (docGiaId, maSach) => {
  const sach = await Sach.findById(maSach);
  if (!sach || sach.soQuyen <= 0) {
    throw new Error("Sách không còn sẵn có");
  }

  // Kiểm tra độc giả đã đăng ký quá 5 sách chưa (chỉ tính những sách chưa trả)
  const soLuongDangMuon = await TheoDoi.countDocuments({
    maDocGia: docGiaId,
    trangThai: { $in: ["pending", "approved", "borrowed"] }
  });

  if (soLuongDangMuon >= 5) {
    throw new Error("Bạn chỉ được đăng ký tối đa 5 sách.");
  }

  // Kiểm tra đã mượn cùng loại sách đó chưa (chưa trả hoặc chưa bị mất)
  const daMuonCungLoai = await TheoDoi.findOne({
    maDocGia: docGiaId,
    maSach: maSach,
    trangThai: { $in: ["pending", "borrowed"] }
  });

  if (daMuonCungLoai) {
    throw new Error("Bạn đã đăng ký/mượn sách này rồi.");
  }

  // Tạo bản ghi theo dõi mượn
  return await TheoDoi.create({ maDocGia: docGiaId, maSach });
};


// Nhân viên duyệt => truyền msnv vào
exports.duyetDangKy = async (muonId, msnv) => {
  const record = await TheoDoi.findById(muonId).populate("maSach");
  if (!record || record.trangThai !== "pending") throw new Error("Không hợp lệ");

  const sach = await Sach.findById(record.maSach._id);
  if (sach.soQuyen <= 0) throw new Error("Sách đã hết");

  sach.soQuyen -= 1;
  await sach.save();

  record.trangThai = "approved";
  record.ngayMuon = new Date();
  record.msnv = msnv; // ✅ lưu mã nhân viên duyệt
  await record.save();

  return record;
};

exports.duyetMuon = async (muonId, msnv) => {
  const record = await TheoDoi.findById(muonId).populate("maSach");
  if (!record || record.trangThai !== "approved") throw new Error("Không hợp lệ");

  record.trangThai = "borrowed";
  record.ngayMuon = new Date();
  record.msnv = msnv; // ✅ lưu mã nhân viên duyệt
  await record.save();

  return record;
};

exports.traSach = async (muonId, isLost) => {
  const record = await TheoDoi.findById(muonId).populate("maSach");

  if (!record || record.trangThai !== "borrowed") throw new Error("Không hợp lệ");

  const ngayTra = new Date();
  const ngayMuon = record.ngayMuon;
  const soNgay = Math.floor((ngayTra - ngayMuon) / (1000 * 60 * 60 * 24));

  let phat = 0;
  const sach = await Sach.findById(record.maSach._id);

  // ✅ Nếu mất sách hoặc quá hạn 365 ngày
  if (isLost || soNgay > 365) {
    record.trangThai = "lost";
    phat = (sach.donGia || 0) + 500000;
  } else {
    record.trangThai = "returned";
    if (soNgay > 15) {
      phat = Math.min((soNgay - 15) * 10000, 500000);
    }
  }
  // ✅ Cộng lại số lượng
  sach.soQuyen += 1;
  await sach.save();
  
  record.ngayTra = ngayTra;
  record.tienPhat = phat;
  await record.save();

  return record;
};

exports.xoaDonDaDuyet = async (muonId) => {
  const record = await TheoDoi.findById(muonId);

  if (!record) {
    throw new Error("Không tìm thấy đơn đăng ký");
  }

  if (record.trangThai !== "approved") {
    throw new Error("Chỉ được xóa các đơn đã duyệt. Đơn hiện tại không hợp lệ.");
  }

  // Trả lại sách nếu đơn đã duyệt mà chưa mượn
  const sach = await Sach.findById(record.maSach);
  if (sach) {
    sach.soQuyen += 1;
    await sach.save();
  }

  await TheoDoi.deleteOne({ _id: muonId });

  return { message: "Xóa đơn đã duyệt thành công" };
};

exports.getLichSu = async (docGiaId) => {
  return await TheoDoi.find({ maDocGia: docGiaId }).populate("maSach");
};

exports.layDonMuonSach = async () => {
  return await TheoDoi.find({ trangThai: "pending" })
    .populate("maDocGia", "maDocGia hoLot ten dienThoai")
    .populate("maSach", "tenSach donGia");
};

exports.layDonTraSach = async () => {
  return await TheoDoi.find({ trangThai: "borrowed" })
    .populate("maDocGia", "maDocGia hoLot ten dienThoai")
    .populate("maSach", "tenSach donGia");
};

exports.layTatCaDon = async () => {
  return await TheoDoi.find()
    .populate("maDocGia", "maDocGia hoLot ten dienThoai")
    .populate("maSach", "tenSach donGia")
    .populate("msnv", "hoTenNV msnv")
    .sort({ createdAt: -1 }); // sắp xếp mới nhất trước
};

exports.xoaDonDangKy = async (docGiaId, muonId) => {
  const record = await TheoDoi.findOne({ _id: muonId, maDocGia: docGiaId });

  if (!record) {
    throw new Error("Không tìm thấy đơn mượn này");
  }

  if (record.trangThai !== "pending") {
    throw new Error("Sách này đã được duyệt, vui lòng liên hệ nhân viên để được hỗ trợ");
  }

  await TheoDoi.deleteOne({ _id: muonId });
  return { message: "Xóa đơn mượn thành công" };
};

