const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Sach = require('../models/sach.model.js');
const NhaXuatBan = require('../models/nxb.model.js');
const NhanVien = require('../models/nhanvien.model.js');
const DocGia = require('../models/docgia.model.js');

// Dữ liệu JSON nhúng trực tiếp
const data = {
  Sach: [
    {
      maSach: 'SACH001',
      tenSach: 'Dế Mèn Phiêu Lưu Ký',
      donGia: 50000,
      soQuyen: 100,
      namXuatBan: 2020,
      maNXB: 'NXB001',
      tacGia: 'Tô Hoài',
    },
    {
      maSach: 'SACH002',
      tenSach: 'Nhà Giả Kim',
      donGia: 80000,
      soQuyen: 50,
      namXuatBan: 2019,
      maNXB: 'NXB002',
      tacGia: 'Paulo Coelho',
    },
    {
      maSach: 'SACH003',
      tenSach: 'Sapiens: Lược Sử Loài Người',
      donGia: 120000,
      soQuyen: 30,
      namXuatBan: 2021,
      maNXB: 'NXB001',
      tacGia: 'Yuval Noah Harari',
    },
  ],
  NhaXuatBan: [
    {
      maNXB: 'NXB001',
      tenNXB: 'NXB Kim Đồng',
      diaChi: '55 Quang Trung, Hà Nội',
    },
    {
      maNXB: 'NXB002',
      tenNXB: 'NXB Trẻ',
      diaChi: '161B Lý Chính Thắng, TP.HCM',
    },
  ],
  NhanVien: [
    {
      msnv: 'NV001',
      hoTenNV: 'Nguyễn Văn An',
      password: 'password123',
      chucVu: 'Quản lý',
      diaChi: '123 Đường Láng, Hà Nội',
      soDienThoai: '0987654321',
    },
    {
      msnv: 'NV002',
      hoTenNV: 'Trần Thị Bình',
      password: 'password456',
      chucVu: 'Nhân viên',
      diaChi: '456 Nguyễn Trãi, TP.HCM',
      soDienThoai: '0912345678',
    },
  ],
  DocGia: [
    {
      maDocGia: 'DG001',
      hoLot: 'Lê Thị',
      ten: 'Mai',
      ngaySinh: '1995-05-15',
      phai: 'Nữ',
      diaChi: '789 Trần Hưng Đạo, Hà Nội',
      dienThoai: '0935123456',
      password: 'reader123',
    },
    {
      maDocGia: 'DG002',
      hoLot: 'Phạm Văn',
      ten: 'Hùng',
      ngaySinh: '2000-10-20',
      phai: 'Nam',
      diaChi: '321 Lê Lợi, Đà Nẵng',
      dienThoai: '0908765432',
      password: 'reader456',
    },
  ],
};

// Kết nối tới MongoDB
mongoose.connect('mongodb://localhost:27017/QuanLyMuonSach', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Kết nối MongoDB thành công'))
  .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// Hàm nhập dữ liệu
const importData = async () => {
  try {
    // Xóa dữ liệu cũ (tùy chọn, bỏ comment nếu muốn xóa trước khi nhập)
    // await Sach.deleteMany({});
    // await NhaXuatBan.deleteMany({});
    // await NhanVien.deleteMany({});
    // await DocGia.deleteMany({});

    // Nhập dữ liệu cho Sach
    if (data.Sach && data.Sach.length > 0) {
      await Sach.insertMany(data.Sach);
      console.log('Nhập dữ liệu Sach thành công');
    }

    // Nhập dữ liệu cho NhaXuatBan
    if (data.NhaXuatBan && data.NhaXuatBan.length > 0) {
      await NhaXuatBan.insertMany(data.NhaXuatBan);
      console.log('Nhập dữ liệu NhaXuatBan thành công');
    }

    // Nhập dữ liệu cho NhanVien với mật khẩu băm
    if (data.NhanVien && data.NhanVien.length > 0) {
      const hashedNhanVien = data.NhanVien.map(nv => ({
        ...nv,
        password: bcrypt.hashSync(nv.password, 10),
      }));
      await NhanVien.insertMany(hashedNhanVien);
      console.log('Nhập dữ liệu NhanVien thành công');
    }

    // Nhập dữ liệu cho DocGia với mật khẩu băm
    if (data.DocGia && data.DocGia.length > 0) {
      const hashedDocGia = data.DocGia.map(dg => ({
        ...dg,
        password: bcrypt.hashSync(dg.password, 10),
      }));
      await DocGia.insertMany(hashedDocGia);
      console.log('Nhập dữ liệu DocGia thành công');
    }

    // Đóng kết nối
    mongoose.connection.close();
    console.log('Hoàn tất nhập dữ liệu và đóng kết nối');
  } catch (err) {
    console.error('Lỗi khi nhập dữ liệu:', err);
  }
};

// Chạy hàm nhập dữ liệu
importData();