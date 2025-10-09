import React, { useEffect, useState } from "react";
import { Input, Button, Dropdown, Avatar, Menu } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const { Search } = Input;

function Header() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="info" disabled>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: 600 }}>{user?.fullname}</span>
          <span style={{ fontSize: 13, color: "#666" }}>{user?.email}</span>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="viewProfile" onClick={() => navigate("/profile")}>
        View profile
      </Menu.Item>
      <Menu.Item
        key="updateAvatar"
        onClick={() => navigate("/profile/update-avatar")}
      >
        Update profile picture
      </Menu.Item>
      <Menu.Item
        key="changePassword"
        onClick={() => navigate("/change-password")}
      >
        Change password
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header">
      <div className="header__logo">
        <span className="header__logo-icon">●</span>
        <span className="header__logo-text">RIKKEI_EDU_BLOG</span>
      </div>

      <div className="header__search">
        <Search
          placeholder="Search for articles"
          allowClear
          enterButton={<SearchOutlined />}
          size="middle"
        />
      </div>

      <div className="header__auth">
        {!user ? (
          <>
            <Button type="default" href="/register">
              Sign Up
            </Button>
            <Button type="primary" href="/login">
              Sign In
            </Button>
          </>
        ) : (
          <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
            <Avatar
              src={user?.avatar || null}
              icon={!user?.avatar && <UserOutlined />}
              style={{ cursor: "pointer" }}
            />
          </Dropdown>
        )}
      </div>
    </div>
  );
}

export default Header;
