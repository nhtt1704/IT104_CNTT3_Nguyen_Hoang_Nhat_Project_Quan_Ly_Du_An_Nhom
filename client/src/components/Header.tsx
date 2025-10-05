import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./Header.scss";

const { Search } = Input;

function Header() {
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
        <Button type="default" href="/register">Sign Up</Button>
        <Button type="primary" href="/login">Sign In</Button>
      </div>
    </div>
  );
}

export default Header;
