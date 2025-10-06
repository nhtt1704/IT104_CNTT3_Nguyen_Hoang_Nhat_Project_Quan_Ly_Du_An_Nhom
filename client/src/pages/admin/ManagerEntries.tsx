import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Layout,
  Table,
  Modal,
  Form,
} from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  FileAddOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "./ManagerEntries.scss";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;

interface Entry {
  id: number;
  name: string;
}

const ManagerEntries: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [entryName, setEntryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const res = await axios.get("http://localhost:8000/entries");
    setEntries(res.data);
  };

  const handleAddEntry = async () => {
    if (!entryName.trim()) return;
    const newEntry = { id: Date.now(), name: entryName };
    await axios.post("http://localhost:8000/entries", newEntry);
    setEntryName("");
    fetchEntries();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:8000/entries/${id}`);
    fetchEntries();
  };

  const handleEdit = (record: Entry) => {
    setEditingEntry(record);
    form.setFieldsValue({ name: record.name });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingEntry) {
        await axios.patch(`http://localhost:8000/entries/${editingEntry.id}`, {
          name: values.name,
        });
        fetchEntries();
      }
      setIsModalOpen(false);
      setEditingEntry(null);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredEntries = entries.filter((e) =>
    e.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      width: "10%",
      render: (_: any, __: Entry, index: number) => index + 1,
    },
    {
      title: "Category Name",
      dataIndex: "name",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "25%",
      render: (_: any, record: Entry) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout className="manager-entries">
      <Sider width={220} className="manager-entries__sider">
        <div className="sidebar-menu">
          <Link to="/admin/user" className="menu-item">
            <div className="icon-box">
              <UserOutlined className="icon" />
            </div>
            <span>Manage Users</span>
          </Link>

          <Link to="/admin/entries" className="menu-item active">
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

      <Layout style={{ padding: "24px" }}>
        <Content>
          <div className="entries-header">
            <div className="header-box title-box">
              <h2>Manage Categories</h2>
            </div>

            <div className="header-box search-box">
              <Input
                placeholder="Search Article Categories"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="entries-container">
            <div className="entries-form">
              <label>Category Name:</label>
              <Input
                placeholder="Enter category name"
                value={entryName}
                onChange={(e) => setEntryName(e.target.value)}
              />
              <Button type="primary" block onClick={handleAddEntry}>
                Add Category
              </Button>
            </div>

            <div className="entries-list">
              <h3>📑 Category List</h3>
              <Table
                columns={columns}
                dataSource={filteredEntries}
                rowKey="id"
                pagination={false}
              />
            </div>
          </div>

          <Modal
            title="Edit Category"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={handleSave}
            okText="Save"
            cancelText="Cancel"
          >
            <Form form={form} layout="vertical">
              <Form.Item
                label="Category Name"
                name="name"
                rules={[{ required: true, message: "Please input category name!" }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerEntries;
