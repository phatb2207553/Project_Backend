const express = require("express");
const cors = require("cors");
const connectDB = require("./app/utils/db");
const config = require("./app/config");
const ApiError = require("./app/api-error"); 

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/docgia", require("./app/routes/docgia.route"));
app.use("/api/nhanvien", require("./app/routes/nhanvien.route"));
app.use("/api/nxb", require("./app/routes/nxb.route"));
app.use("/api/sach", require("./app/routes/sach.route"));
app.use("/api/theodoi", require("./app/routes/theodoi.route"));

connectDB();

app.use((req, res, next) => { 
    return next(new ApiError(404, "Resource not found"));
}); 

app.use((err, req, res, next) => { 
    return res.status(err.statusCode || 500).json({ 
        message: err.message || "Internal Server Error", 
    }); 
}); 

app.get("/", (req, res) => { 
    res.json({ message: "Chào mừng đến với web quản lý thư viện!" }); 
});

const errorHandler = require("./app/middlewares/error.middleware");
app.use(errorHandler);

module.exports = app;
