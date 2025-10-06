import React, { useEffect, useState } from "react";
import { Avatar, Button, Input, Layout, Menu, Table, Tag } from "antd";
import { UserOutlined,FileTextOutlined,FileAddOutlined,LogoutOutlined,SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import "./ManagerUser.scss";

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
            <Avatar>{record.name.charAt(0)}</Avatar>
          )}
          <div>
            <div>{record.name}</div>
            <span style={{ color: "#888" }}>{record.username}</span>
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
          <Button type="link" danger onClick={() => handleBlock(record.id)}>
            block
          </Button>
          <Button type="link" onClick={() => handleUnblock(record.id)}>
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

  const filteredData = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout className="manager-user">
      <Sider width={200} className="manager-user__sider">
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Manage Users
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            Manage Entries
          </Menu.Item>
          <Menu.Item key="3" icon={<FileAddOutlined />}>
            Manage Article
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            Log out
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ padding: "24px" }}>
        <Content>
          <div className="manager-user__header">
            <h2>
              Team members <span>({users.length} users)</span>
            </h2>
            <Input
              placeholder="Search user"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: 300 }}
            />
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
