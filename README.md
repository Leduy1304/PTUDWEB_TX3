# Chương 4: Kết hợp React và Node.js

Học phần: Phát triển ứng dụng web — Giao tiếp client–server, xử lý đăng nhập, JWT và phân quyền truy cập.

Mini-project: **Quản lý danh sách sản phẩm bảo mật** gồm Client React và Server Node.js/Express.

## Công nghệ sử dụng

- Client: React, Vite, axios
- Server: Node.js, Express, cors, jsonwebtoken
- Xác thực: JWT (JSON Web Token)

## Cấu trúc thư mục
TX3/
├── client/
│ ├── index.html
│ ├── vite.config.js
│ ├── package.json
│ └── src/
│ ├── main.jsx
│ ├── App.jsx
│ └── App.css
├── server/
│ ├── server.js
│ ├── middleware.js
│ └── package.json
└── .gitignore




## Cách chạy

### 1. Chạy Server (port 3000)

Mở 1 cửa sổ Terminal, giữ chạy suốt:

```bash
cd server
npm install
node server.js
Server chạy tại: http://localhost:3000

2. Chạy Client (port 5173)
Mở thêm 1 cửa sổ Terminal khác:

bash


cd client
npm install
npm run dev
Mở trình duyệt: http://localhost:5173

Tài khoản mẫu
Email: admin@gmail.com
Mật khẩu: 123456
Tài khoản này được hardcode ở Server theo yêu cầu đơn giản hóa của bài tập (không nối cơ sở dữ liệu ở bước này).

API
POST /login
Nhận email và matKhau từ Client.

Đúng tài khoản: trả về JWT token.
Sai tài khoản: trả về lỗi 401.
GET /api/products
Route cần bảo vệ, gắn middleware xacThuc.

Không có token: trả về lỗi 401.
Token sai hoặc hết hạn: trả về lỗi 403.
Token đúng: trả về danh sách 5 sản phẩm: Bút, Vở, Thước, Bút chì, Tẩy.
Khi gọi API này, Client gửi kèm token trong header:



Authorization: Bearer <token>
Luồng hoạt động
Người dùng nhập email và mật khẩu ở trang Đăng nhập.
Client gửi POST /login lên Server.
Server kiểm tra tài khoản, tạo JWT bằng jwt.sign() và trả về cho Client.
Client lưu token vào localStorage.
Khi vào trang danh sách, Client dùng useEffect gọi GET /api/products kèm token.
Middleware xacThuc kiểm tra token bằng jwt.verify():
Hợp lệ: gọi next() để vào route.
Không hợp lệ: trả về 401 hoặc 403.
Client hiển thị tương ứng: "Đang tải...", thông báo lỗi, hoặc danh sách sản phẩm.
Kết quả kiểm thử
Thử nghiệm	Kết quả
Đăng nhập sai	401, hiện "Sai thông tin đăng nhập"
Đăng nhập đúng	200, nhận JWT, hiện danh sách sản phẩm
Gọi /api/products không có token	401
Gọi /api/products với token sai	403
Gọi /api/products với token đúng	200, trả về 5 sản phẩm
Lưu ý
Bài này làm đúng yêu cầu đơn giản hóa: hardcode tài khoản, chưa nối MongoDB, secret key đặt trong code.
Làm thật thì mật khẩu phải được băm (hash), không lưu trực tiếp, và secret key phải để trong biến môi trường (.env).




---

Dán xong và push xong thì repo sẽ hiện README này ngay ở trang chủ. Duy l