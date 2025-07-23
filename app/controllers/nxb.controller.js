const NXBService = require("../services/nxb.service");

exports.create = async (req, res) => {
  const nxb = await NXBService.create(req.body);
  res.status(201).json(nxb);
};

exports.getAll = async (req, res) => {
  const nxbs = await NXBService.getAll();
  res.json(nxbs);
};

exports.update = async (req, res) => {
  const updated = await NXBService.update(req.params.id, req.body);
  res.json(updated);
};

exports.remove = async (req, res) => {
  await NXBService.remove(req.params.id);
  res.sendStatus(204);
};
