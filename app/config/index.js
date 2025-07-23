require("dotenv").config();

const config = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development"
  },
  db: {
    uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/QuanLyMuonSach"
  },
  jwt: {
    secret: process.env.JWT_SECRET || "library_secret_key",
    expiresIn: "1d"
  }
};

module.exports = config;
