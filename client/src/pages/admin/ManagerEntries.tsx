import React, { useEffect, useState } from "react";
import { Button, Input, Layout, Menu, Table, Modal, Form } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  FileAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "./ManagerEntries.scss";

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
      <Sider width={200} className="manager-entries__sider">
        <Menu mode="inline" defaultSelectedKeys={["2"]}>
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
          <h2 className="entries-title">📂 Manage Categories</h2>

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
              dataSource={entries}
              rowKey="id"
              pagination={false}
            />
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
