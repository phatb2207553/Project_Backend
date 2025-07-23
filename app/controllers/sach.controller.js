const SachService = require("../services/sach.service");

exports.create = async (req, res) => {
  const sach = await SachService.create(req.body);
  res.status(201).json(sach);
};

exports.getAll = async (req, res) => {
  const sachs = await SachService.getAll();
  res.json(sachs);
};

exports.update = async (req, res) => {
  const updated = await SachService.update(req.params.id, req.body);
  res.json(updated);
};

exports.remove = async (req, res) => {
  await SachService.remove(req.params.id);
  res.sendStatus(204);
};

exports.getAvailable = async (req, res) => {
  const available = await SachService.getAvailable();
  res.json(available);
};
