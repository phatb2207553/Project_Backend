const NXB = require("../models/nxb.model");

exports.create = async (data) => {
  return await NXB.create(data);
};

exports.getAll = async () => {
  return await NXB.find();
};

exports.update = async (id, data) => {
  return await NXB.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
  return await NXB.findByIdAndDelete(id);
};
