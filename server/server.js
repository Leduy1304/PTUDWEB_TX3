const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { xacThuc, SECRET } = require("./middleware");

const app = express();

// CORS: chỉ cho phép Client React ở port 5173 gọi sang Server port 3000
app.use(cors({ origin: "http://localhost:5173" }));
// Đọc body dạng JSON gửi từ client
app.use(express.json());

// Tài khoản mẫu (đơn giản hóa, không nối DB ở bước này)
const TAI_KHOAN_MAU = { email: "admin@gmail.com", matKhau: "123456" };

// POST /login: đăng nhập, trả JWT nếu đúng
app.post("/login", (req, res) => {
  const { email, matKhau } = req.body;

  if (email === TAI_KHOAN_MAU.email && matKhau === TAI_KHOAN_MAU.matKhau) {
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  return res.status(401).json({ loi: "Sai thông tin đăng nhập" });
});

// GET /api/products: route cần bảo vệ, gắn middleware xacThuc
app.get("/api/products", xacThuc, (req, res) => {
  res.json([
    { id: 1, ten: "Bút", gia: 5000 },
    { id: 2, ten: "Vở", gia: 12000 },
    { id: 3, ten: "Thước", gia: 8000 },
    { id: 4, ten: "Bút chì", gia: 4000 },
    { id: 5, ten: "Tẩy", gia: 3000 }
  ]);
});

app.listen(3000, () => {
  console.log("Server chay tai http://localhost:3000");
});
