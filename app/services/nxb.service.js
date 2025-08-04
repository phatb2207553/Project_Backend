const NXB = require("../models/nxb.model");
const Sach = require("../models/sach.model");

exports.create = async (data) => {
  return await NXB.create(data);
};

exports.getAll = async () => {
  return await NXB.find();
};

exports.update = async (id, data) => {
  return await NXB.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (_id) => {
  const nxb = await NXB.findById(_id);
  if (!nxb) throw new Error("Không tìm thấy nhà xuất bản");

  const isUsed = await Sach.exists({ maNXB: nxb.maNXB });
  if (isUsed) {
    throw new Error("Không thể xóa nhà xuất bản vì đang có sách sử dụng.");
  }

  return await NXB.findByIdAndDelete(_id);
};
