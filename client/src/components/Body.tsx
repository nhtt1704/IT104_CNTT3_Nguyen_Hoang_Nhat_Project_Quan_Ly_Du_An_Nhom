import { useEffect, useState } from "react";
import { Layout, Row, Col, Typography, Card, Pagination, Spin } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Body.scss";

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

interface Article {
  id: number;
  title: string;
  date: string;
  category?: string;
  content: string;
  image: string;
  status: string;
  userId?: number;
}

interface Category {
  id: number;
  name: string;
}

interface BodyProps {
  searchKeyword: string;
}

const Body = ({ searchKeyword }: BodyProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articleRes, categoryRes] = await Promise.all([
          axios.get("http://localhost:8000/articles"),
          axios.get("http://localhost:8000/entries"),
        ]);

        const publicArticles = articleRes.data.filter(
          (a: Article) => a.status === "Công khai" || a.status === "Public"
        );

        const sortedArticles = publicArticles.sort(
          (a: Article, b: Article) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setArticles(sortedArticles);
        setCategories(categoryRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, selectedCategory]);

  const filteredArticles = articles.filter((p) => {
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    const matchKeyword =
      searchKeyword === "" ||
      p.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      p.content.toLowerCase().includes(searchKeyword.toLowerCase());

    return matchCategory && matchKeyword;
  });

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const recentPosts = filteredArticles.slice(0, 3);

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
                  cover={
                    <img
                      src={recentPosts[0].image}
                      alt={recentPosts[0].title}
                    />
                  }
                  className="main-post"
                >
                  <Text className="date">Date: {recentPosts[0].date}</Text>
                  <Title level={5}>{recentPosts[0].title}</Title>
                  <Paragraph>
                    {recentPosts[0].content.slice(0, 100)}...
                  </Paragraph>
                  <Text className="category">
                    {recentPosts[0].category || "Uncategorized"}
                  </Text>
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
                    <Paragraph>{post.content.slice(0, 80)}...</Paragraph>
                    <Text className="category">
                      {post.category || "Uncategorized"}
                    </Text>
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
          <span
            className={`filter-item ${
              selectedCategory === "All" ? "active" : ""
            }`}
            onClick={() => {
              setSelectedCategory("All");
              setCurrentPage(1);
            }}
          >
            All
          </span>
          {categories.map((cat) => (
            <span
              key={cat.id}
              className={`filter-item ${
                selectedCategory === cat.name ? "active" : ""
              }`}
              onClick={() => {
                setSelectedCategory(cat.name);
                setCurrentPage(1);
              }}
            >
              {cat.name}
            </span>
          ))}
        </div>

        <Row gutter={[24, 24]}>
          {paginatedArticles.map((post) => (
            <Col xs={24} sm={12} md={8} key={post.id}>
              <Link to={`/articleDetails/${post.id}`}>
                <Card
                  hoverable
                  cover={<img src={post.image} alt={post.title} />}
                  className="post-card"
                >
                  <Text className="date">Date: {post.date}</Text>
                  <Title level={5}>{post.title}</Title>
                  <Paragraph>{post.content.slice(0, 100)}...</Paragraph>
                  <Text className="category">
                    {post.category || "Uncategorized"}
                  </Text>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        <div className="pagination">
          <Pagination
            current={currentPage}
            total={filteredArticles.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Body;
