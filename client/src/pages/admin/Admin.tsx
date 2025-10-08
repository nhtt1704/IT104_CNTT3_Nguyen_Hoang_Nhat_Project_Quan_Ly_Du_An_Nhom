import React from "react";
import { Button, message } from "antd";
import AdminHeader from "./AdminHeader";

const Admin: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    message.info("Bạn đã đăng xuất!");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "30px" }}>
      <AdminHeader></AdminHeader>
      <h1>Xin chào, {user?.firstName || "Admin"}!</h1>
      <p>Chào mừng bạn đến trang quản trị.</p>

      <Button type="primary" danger onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  );
};

export default Admin;
