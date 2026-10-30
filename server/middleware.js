const jwt = require("jsonwebtoken");
const SECRET = "CHUONG4_SECRET";

// Middleware phân quyền: kiểm tra token trước khi vào route
function xacThuc(req, res, next) {
  // Lấy token từ header: "Authorization: Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ loi: "Chưa đăng nhập" });
  }

  try {
    // Giải mã và kiểm tra token; sai / hết hạn sẽ rơi vào catch
    req.user = jwt.verify(token, SECRET);
    next(); // Token hợp lệ -> chuyển tiếp đến route xử lý tiếp theo
  } catch {
    return res.status(403).json({ loi: "Token sai hoặc hết hạn" });
  }
}

module.exports = { xacThuc, SECRET };
