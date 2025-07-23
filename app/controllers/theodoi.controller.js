const TheoDoiService = require("../services/theodoi.service");

// 1. Đăng ký mượn
exports.dangKyMuon = async (req, res, next) => {
  TheoDoiService.dangKyMuon(req.user.id, req.body.maSach)
    .then(result => res.json(result))
    .catch(next); // chuyển lỗi cho middleware xử lý lỗi chung
};

// 2. Duyệt mượn (yêu cầu nhân viên đăng nhập, dùng req.user.id)
exports.duyetMuon = async (req, res, next) => {
  const msnv = req.user.id;
  TheoDoiService.duyetMuon(req.params.id, msnv)
    .then(result => res.json(result))
    .catch(next);
};

// 3. Trả sách (kèm isLost = true nếu bị mất)
exports.traSach = async (req, res, next) => {
  TheoDoiService.traSach(req.params.id, req.body.isLost || false)
    .then(result => res.json(result))
    .catch(next);
};

// 4. Lịch sử độc giả
exports.lichSuDocGia = async (req, res, next) => {
  TheoDoiService.getLichSu(req.user.id)
    .then(lichsu => res.json(lichsu))
    .catch(next);
};

