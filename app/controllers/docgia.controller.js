const DocGiaService = require("../services/docgia.service");

exports.register = async (req, res) => {
  try {
    const user = await DocGiaService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await DocGiaService.login(req.body);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await DocGiaService.getProfile(req.user.id);
    res.json(profile);
  } catch (err) {
    res.status(404).json({ message: "Không tìm thấy độc giả" });
  }
};
