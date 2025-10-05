import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Typography, Card, Pagination, Spin } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Body.scss";

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

export const Body = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    axios
      .get("http://localhost:8000/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const recentPosts = posts.slice(0, 3);
  const categories = [
    "All",
    "Daily Journal",
    "Work & Career",
    "Personal Thoughts",
    "Emotions & Feelings",
  ];

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout className="blog-layout">
      <Content className="blog-content">
        <Title level={4} className="section-title">
          Recent blog posts
        </Title>

        <Row gutter={[24, 24]} className="recent-posts">
          <Col xs={24} md={12}>
            {recentPosts[0] && (
              <Link to={`/articleDetails/${recentPosts[0].id}`}>
                <Card
                  hoverable
                  cover={<img src={recentPosts[0].image} alt={recentPosts[0].title} />}
                  className="main-post"
                >
                  <Text className="date">Date: {recentPosts[0].date}</Text>
                  <Title level={5}>{recentPosts[0].title}</Title>
                  <Paragraph>{recentPosts[0].description}</Paragraph>
                  <Text className="category">{recentPosts[0].category}</Text>
                </Card>
              </Link>
            )}
          </Col>

          <Col xs={24} md={12}>
            <div className="side-posts">
              {recentPosts.slice(1, 3).map((post) => (
                <Link key={post.id} to={`/articleDetails/${post.id}`}>
                  <Card
                    hoverable
                    cover={<img src={post.image} alt={post.title} />}
                    className="side-post"
                  >
                    <Text className="date">Date: {post.date}</Text>
                    <Title level={5}>{post.title}</Title>
                    <Paragraph>{post.description}</Paragraph>
                    <Text className="category">{post.category}</Text>
                  </Card>
                </Link>
              ))}
            </div>
          </Col>
        </Row>

        <div className="all-posts-header">
          <div className="links">
            <Link to="/home" className="link-active">
              All blog posts
            </Link>
            <Link to="/allMyPosts" className="link">
              All my posts
            </Link>
          </div>
        </div>

        <div className="category-filters">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`filter-item ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </span>
          ))}
        </div>

        <Row gutter={[24, 24]}>
          {filteredPosts.map((post) => (
            <Col xs={24} sm={12} md={8} key={post.id}>
              <Link to={`/articleDetails/${post.id}`}>
                <Card
                  hoverable
                  cover={<img src={post.image} alt={post.title} />}
                  className="post-card"
                >
                  <Text className="date">Date: {post.date}</Text>
                  <Title level={5}>{post.title}</Title>
                  <Paragraph>{post.description}</Paragraph>
                  <Text className="category">{post.category}</Text>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        <div className="pagination">
          <Pagination defaultCurrent={1} total={filteredPosts.length} />
        </div>
      </Content>
    </Layout>
  );
};

export default Body;
