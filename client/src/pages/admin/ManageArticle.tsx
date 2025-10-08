import { useState, useEffect } from "react";
import {
  Button,
  Image,
  Layout,
  Table,
  Tag,
  Select,
  Pagination,
} from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  FileAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./ManageArticle.scss";

const { Sider, Content } = Layout;
const { Option } = Select;

interface Article {
  key: string;
  image: string;
  title: string;
  category: string;
  content: string;
  status: string;
}

export default function ManageArticle() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles([
      {
        key: "1",
        image:
          "https://cdn.tgdd.vn/Files/2021/09/02/1380848/cach-nau-ca-sot-ca-chua-thom-ngon-khong-bi-tanh-202201141555078832.jpg",
        title: "Học nấu cá sốt cà chua",
        category: "Nấu ăn",
        content: "Tôi đã học được cách nấu ăn...",
        status: "Public",
      },
      {
        key: "2",
        image:
          "https://cdn.pixabay.com/photo/2016/11/29/06/18/laptop-1868736_1280.jpg",
        title: "Bí kíp viết CV ngành IT",
        category: "IT",
        content: "Chia sẻ cách viết CV ấn tượng...",
        status: "Private",
      },
    ]);
  }, []);

  const handleStatusChange = (value: string, key: string) => {
    const updated = articles.map((item) =>
      item.key === key ? { ...item, status: value } : item
    );
    setArticles(updated);
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
    { title: "Chủ đề", dataIndex: "category" },
    { title: "Nội dung", dataIndex: "content" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={status === "Public" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Chỉnh sửa trạng thái",
      render: (_: string, record: Article) => (
        <Select
          defaultValue={record.status}
          style={{ width: 100 }}
          onChange={(value) => handleStatusChange(value, record.key)}
        >
          <Option value="Public">Public</Option>
          <Option value="Private">Private</Option>
        </Select>
      ),
    },
    {
      title: "Hành động",
      render: () => (
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <Button type="primary" size="small" className="btn-edit">
            Sửa
          </Button>
          <Button danger size="small" className="btn-delete">
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

          <Link to="/login" className="menu-item logout">
            <div className="icon-box">
              <LogoutOutlined className="icon" />
            </div>
            <span>Log out</span>
          </Link>
        </div>
      </Sider>

      <Layout style={{ padding: "24px" }}>
        <Content className="main-content">
          <div className="header">
            <Button className="add-btn">Thêm mới bài viết</Button>
            <h1 className="title">Quản lý bài viết</h1>
          </div>

          <div className="table-wrapper">
            <Table columns={columns} dataSource={articles} pagination={false} rowKey="key" />
          </div>

          <div className="pagination">
            <Pagination
              defaultCurrent={1}
              total={10}
              showSizeChanger={false}
              itemRender={(page, type, originalElement) => {
                if (type === "prev") {
                  return <Button>Previous</Button>;
                }
                if (type === "next") {
                  return <Button>Next</Button>;
                }
                return originalElement;
              }}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
