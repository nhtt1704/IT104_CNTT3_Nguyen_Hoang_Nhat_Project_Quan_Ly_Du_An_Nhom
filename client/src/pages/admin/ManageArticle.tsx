import { useState, useEffect } from "react";
import {
  Button,
  Image,
  Layout,
  Table,
  Tag,
  Select,
  Pagination,
  Modal,
  message,
} from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  FileAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ManageArticle.scss";

const { Sider, Content } = Layout;
const { Option } = Select;

interface Article {
  id: number;
  image: string;
  title: string;
  content: string;
  mood: string;
  status: string;
}

export default function ManageArticle() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    message.success("Đăng xuất thành công!");
    navigate("/login");
  };

  const fetchArticles = async () => {
    const res = await axios.get("http://localhost:8000/articles");
    setArticles(res.data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async () => {
    if (selectedId) {
      await axios.delete(`http://localhost:8000/articles/${selectedId}`);
      setArticles((prev) => prev.filter((article) => article.id !== selectedId));
      message.success("Xóa bài viết thành công");
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  const handleStatusChange = async (value: string, id: number) => {
    await axios.patch(`http://localhost:8000/articles/${id}`, {
      status: value,
    });
    fetchArticles();
  };

  const getPaginatedArticles = () => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return articles.slice(start, end);
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (src: string) => (
        <Image
          src={src}
          alt="img"
          width={70}
          height={50}
          style={{ borderRadius: 6 }}
          preview={false}
        />
      ),
    },
    { title: "Tiêu đề", dataIndex: "title" },
    { title: "Nội dung", dataIndex: "content" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={status === "Công khai" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Chỉnh sửa trạng thái",
      render: (_: string, record: Article) => (
        <Select
          defaultValue={record.status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(value, record.id)}
        >
          <Option value="Công khai">Công khai</Option>
          <Option value="Riêng tư">Riêng tư</Option>
        </Select>
      ),
    },
    {
      title: "Hành động",
      render: (_: string, record: Article) => (
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <Button
            type="primary"
            size="small"
            className="btn-edit"
            onClick={() => navigate(`/editArticle/${record.id}`)}
          >
            Sửa
          </Button>
          <Button
            danger
            size="small"
            className="btn-delete"
            onClick={() => {
              setSelectedId(record.id);
              setIsModalOpen(true);
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout className="manage-article">
      <Sider width={220} className="manage-article__sider">
        <div className="sidebar-menu">
          <Link to="/admin/users" className="menu-item">
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
          <Link to="/admin/article" className="menu-item active">
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
        <Content className="main-content">
          <div className="header">
            <Button className="add-btn" onClick={() => navigate("/addArticle")}>
              Thêm mới bài viết
            </Button>
            <h1 className="title">Quản lý bài viết</h1>
          </div>
          <div className="table-wrapper">
            <Table
              columns={columns}
              dataSource={getPaginatedArticles()}
              pagination={false}
              rowKey="id"
            />
          </div>
          <div className="pagination">
            <Pagination
              current={currentPage}
              total={articles.length}
              pageSize={pageSize}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </Content>
      </Layout>

      <Modal
        title="Xác nhận xóa"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa bài viết này không?</p>
      </Modal>
    </Layout>
  );
}
