import React from "react";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import "./AdminHeader.scss";

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <div className="admin-header-right">
        <Badge count={3} size="small">
          <MessageOutlined className="admin-icon" />
        </Badge>

        <Badge dot>
          <BellOutlined className="admin-icon" />
        </Badge>

        <Avatar
          src="https://i.pravatar.cc/40"
          size={40}
          className="admin-avatar"
        />
      </div>
    </header>
  );
};

export default AdminHeader;
