const Sach = require("../models/sach.model");
const NhaXuatBan = require("../models/nxb.model");
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
  return await Sach.findByIdAndDelete(id);
};

exports.getAvailable = async () => {
  return await Sach.find({ soQuyen: { $gt: 0 } });
};
