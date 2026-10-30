import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:3000";

export default function App() {
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [loiDangNhap, setLoiDangNhap] = useState("");
  const [daDangNhap, setDaDangNhap] = useState(!!localStorage.getItem("token"));

  // 3 state bắt buộc cho trang danh sách
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Khi component mount (và sau khi đăng nhập), lấy danh sách sản phẩm
  useEffect(() => {
    if (!daDangNhap) return;
    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);
    axios
      .get(`${API}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .catch(() => setError("Không tải được dữ liệu (chưa đăng nhập hoặc token sai)"))
      .finally(() => setLoading(false));
  }, [daDangNhap]);

  async function dangNhap(e) {
    e.preventDefault();
    setLoiDangNhap("");
    try {
      const res = await axios.post(`${API}/login`, { email, matKhau });
      localStorage.setItem("token", res.data.token);
      setDaDangNhap(true);
    } catch {
      setLoiDangNhap("Sai thông tin đăng nhập");
    }
  }

  function dangXuat() {
    localStorage.removeItem("token");
    setData([]);
    setDaDangNhap(false);
  }

  // Hiển thị có điều kiện: chưa đăng nhập -> form đăng nhập
  if (!daDangNhap) {
    return (
      <div className="box">
        <h1>Đăng nhập</h1>
        <p className="hint">Tài khoản mẫu: admin@gmail.com / 123456</p>
        <form onSubmit={dangNhap}>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Mật khẩu" value={matKhau} onChange={(e) => setMatKhau(e.target.value)} />
          <button type="submit">Đăng nhập</button>
        </form>
        {loiDangNhap && <p className="loi">{loiDangNhap}</p>}
      </div>
    );
  }

  // Đã đăng nhập -> danh sách sản phẩm, xử lý loading / error
  if (loading) return <div className="box"><p>Đang tải...</p></div>;
  if (error) return <div className="box"><p className="loi">Lỗi: {error}</p><button onClick={dangXuat}>Đăng xuất</button></div>;

  return (
    <div className="box">
      <h1>Danh sách sản phẩm</h1>
      <ul>{data.map((p) => <li key={p.id}>{p.ten} - {p.gia.toLocaleString("vi-VN")} đ</li>)}</ul>
      <button onClick={dangXuat}>Đăng xuất</button>
    </div>
  );
}
