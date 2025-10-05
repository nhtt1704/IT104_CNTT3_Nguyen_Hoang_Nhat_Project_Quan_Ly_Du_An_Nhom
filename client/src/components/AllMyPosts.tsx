import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Typography, Card, Button, Pagination, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllMyPosts.scss";
import Header from "./Header";
import Footer from "./Footer";

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

interface Post {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
}

export const AllMyPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
  
    <Layout className="mypost-layout">
      <Header></Header>
      <Content className="mypost-content">
        <div className="header">
          <Title
            level={3}
            className="add-article"
            onClick={() => navigate("/addArticle")}
          >
            ADD NEW ARTICLE
          </Title>
        </div>

        <Row gutter={[24, 24]}>
          {posts.map((post) => (
            <Col xs={24} sm={12} md={8} key={post.id}>
              <Card
                hoverable
                cover={<img src={post.image} alt={post.title} />}
                className="post-card"
              >
                <Text className="date">Date: {post.date}</Text>
                <Title level={5}>{post.title}</Title>
                <Paragraph>{post.description}</Paragraph>
                <Text className="category">{post.category}</Text>
                <br />
                <Link to={`/edit/${post.id}`} className="edit-link">
                  Edit your post!
                </Link>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="pagination">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </Content>
      <br />
      <Footer></Footer>
    </Layout>
  );
};

export default AllMyPosts;
