import Sider from 'antd/es/layout/Sider'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  UserOutlined,
  FileTextOutlined,
  FileAddOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";

function AdminNavbar() {
  return (
    <div>
            <Sider width={220} className="manager-user__sider">
        <div className="sidebar-menu">
          <Link to="/admin/user" className="menu-item active">
            <div className="icon-box">
              <UserOutlined className="icon" />
            </div>
            <span>Manage Users</span>
          </Link>

          <Link to="/admin/entries" className="menu-item">
            <div className="icon-box">
              <FileTextOutlined className="icon" />
            </div>
            <span>Manage Entries</span>
          </Link>

          <Link to="/admin/article" className="menu-item">
            <div className="icon-box">
              <FileAddOutlined className="icon" />
            </div>
            <span>Manage Article</span>
          </Link>

          <Link to="/login" className="menu-item logout">
            <div className="icon-box">
              <LogoutOutlined className="icon" />
            </div>
            <span>Log out</span>
          </Link>
        </div>
      </Sider>
    </div>
  )
}

export default AdminNavbar
