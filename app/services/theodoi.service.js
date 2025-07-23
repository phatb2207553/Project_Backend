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
    trangThai: { $in: ["pending", "borrowed"] }
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


// ✅ Nhân viên duyệt => truyền msnv vào
exports.duyetMuon = async (muonId, msnv) => {
  const record = await TheoDoi.findById(muonId).populate("maSach");
  if (!record || record.trangThai !== "pending") throw new Error("Không hợp lệ");

  const sach = await Sach.findById(record.maSach._id);
  if (sach.soQuyen <= 0) throw new Error("Sách đã hết");

  sach.soQuyen -= 1;
  await sach.save();

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

    // ✅ Trả sách thì cộng lại số lượng
    // Khi mất sách mà đền rồi thì coi như nhân viên chạy đi mua sách luôn
    sach.soQuyen += 1;
    await sach.save();
  }

  record.ngayTra = ngayTra;
  record.tienPhat = phat;
  await record.save();

  return record;
};

exports.getLichSu = async (docGiaId) => {
  return await TheoDoi.find({ maDocGia: docGiaId }).populate("maSach");
};
