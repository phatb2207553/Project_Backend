const Sach = require("../models/sach.model");
const NhaXuatBan = require("../models/nxb.model");
const TheoDoi = require("../models/theodoimuonsach.model");

exports.create = async (data) => {
  return await Sach.create(data);
};

exports.getAll = async () => {
  const sachList = await Sach.find().lean();
  const nxbList = await NhaXuatBan.find().lean();

  return sachList.map(sach => {
    const nxb = nxbList.find(n => n.maNXB === sach.maNXB); //biến nxb hiện tại chưa dùng đến
    return {
      ...sach || null
    };
  });
};

exports.update = async (id, data) => {
  return await Sach.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
  // Kiểm tra xem sách có đang được mượn hoặc đăng ký không
  const dangDuocMuon = await TheoDoi.findOne({
    maSach: id,
    trangThai: { $in: ["pending", "approved", "borrowed"] }
  });

  if (dangDuocMuon) {
    throw new Error("Không thể xóa sách đang được mượn hoặc chờ duyệt.");
  }

  return await Sach.findByIdAndDelete(id);
};

exports.getAvailable = async () => {
  const sachList = await Sach.find({ soQuyen: { $gt: 0 } }).lean();
  const nxbList = await NhaXuatBan.find().lean();

  return sachList.map(sach => {
    const nxb = nxbList.find(n => n.maNXB === sach.maNXB);

    return {
      ...sach,
      tenNXB: nxb ? nxb.tenNXB : "Không rõ",
      diaChiNXB: nxb ? nxb.diaChi : ""
    };
  });
};
