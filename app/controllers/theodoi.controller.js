const TheoDoiService = require("../services/theodoi.service");

// Đăng ký mượn
exports.dangKyMuon = async (req, res, next) => {
  TheoDoiService.dangKyMuon(req.user.id, req.body.maSach)
    .then(result => res.json(result))
    .catch(next); // chuyển lỗi cho middleware xử lý lỗi chung
};

// Duyệt đăng ký sách (yêu cầu nhân viên đăng nhập, dùng req.user.id)
exports.duyetDangKy = async (req, res, next) => {
  const msnv = req.user.id;
  TheoDoiService.duyetDangKy(req.params.id, msnv)
    .then(result => res.json(result))
    .catch(next);
};

// Duyệt mượn sách
exports.duyetMuon = async (req, res, next) => {
  const msnv = req.user.id;
  TheoDoiService.duyetMuon(req.params.id, msnv)
    .then(result => res.json(result))
    .catch(next);
};

// Trả sách (kèm isLost = true nếu bị mất)
exports.traSach = async (req, res, next) => {
  TheoDoiService.traSach(req.params.id, req.body.isLost || false)
    .then(result => res.json(result))
    .catch(next);
};

// Xóa đơn approved
exports.xoaDonDaDuyet = (req, res, next) => {
  TheoDoiService.xoaDonDaDuyet(req.params.id)
    .then(result => res.json(result))
    .catch(next);
};

// Lịch sử độc giả
exports.lichSuDocGia = async (req, res, next) => {
  TheoDoiService.getLichSu(req.user.id)
    .then(lichsu => res.json(lichsu))
    .catch(next);
};

// Lấy đơn mượn (pending)
exports.layDonMuonSach = (req, res, next) => {
  TheoDoiService.layDonMuonSach()
    .then(data => res.json(data))
    .catch(next);
};

// Lấy đơn trả (borrowed)
exports.layDonTraSach = (req, res, next) => {
  TheoDoiService.layDonTraSach()
    .then(data => res.json(data))
    .catch(next);
};

// Toàn bộ đơn cho admin
exports.layTatCaDon = (req, res, next) => {
  TheoDoiService.layTatCaDon()
    .then(data => res.json(data))
    .catch(next);
};

// Xóa đơn pending
exports.xoaDonDangKy = (req, res, next) => {
  TheoDoiService.xoaDonDangKy(req.user.id, req.params.id)
    .then(result => res.json(result))
    .catch(next);
};



