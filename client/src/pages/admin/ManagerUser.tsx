import React, { useEffect, useState } from "react";
import { Avatar, Button, Input, Layout, Menu, message, Table, Tag } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  FileAddOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import "./ManagerUser.scss";
import { Link, useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  status: string;
  avatar?: string;
}

const ManagerUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    message.success("Đăng xuất thành công!");
    navigate("/login");
  };

  useEffect(() => {
    axios.get("http://localhost:8000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {record.avatar ? (
            <Avatar src={record.avatar} />
          ) : (
            <Avatar>{record.name?.charAt(0) || "?"}</Avatar>
          )}
          <div>
            <div>{record.name || "No name"}</div>
            <span style={{ color: "#888" }}>
              {record.username || "Unknown"}
            </span>
          </div>
        </div>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={status === "hoạt động" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Email address",
      dataIndex: "email",
    },
    {
      title: "Active",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            className="btn-action block"
            onClick={() => handleBlock(record.id)}
          >
            block
          </Button>
          <Button
            className="btn-action unblock"
            onClick={() => handleUnblock(record.id)}
          >
            unblock
          </Button>
        </div>
      ),
    },
  ];

  const handleBlock = (id: number) => {
    axios.patch(`http://localhost:8000/users/${id}`, { status: "bị khóa" });
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "bị khóa" } : u))
    );
  };

  const handleUnblock = (id: number) => {
    axios.patch(`http://localhost:8000/users/${id}`, { status: "hoạt động" });
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "hoạt động" } : u))
    );
  };

  const filteredData = users.filter((user) => {
    const search = searchText?.toLowerCase() || "";
    return (
      user.name?.toLowerCase().includes(search) 
    );
  });

  return (
    <Layout className="manager-user">
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

          <div className="menu-item logout" onClick={handleLogout}>
            <div className="icon-box">
              <LogoutOutlined className="icon" />
            </div>
            <span>Log out</span>
          </div>
        </div>
      </Sider>

      <Layout style={{ padding: "24px" }}>
        <Content>
          <div className="manager-user__header">
            <div className="header-box title-box">
              <h2>
                Team members <span>{users.length} users</span>
              </h2>
            </div>

            <div className="header-box search-box">
              <Input
                placeholder="Search user"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              position: ["bottomCenter"],
              showSizeChanger: false,
              showLessItems: true,
              showQuickJumper: false,
              showTotal: undefined,
              showTitle: false,
              itemRender: (page, type, originalElement) => {
                if (type === "prev") {
                  return <Button>Previous</Button>;
                }
                if (type === "next") {
                  return <Button>Next</Button>;
                }
                return originalElement;
              },
            }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerUser;
