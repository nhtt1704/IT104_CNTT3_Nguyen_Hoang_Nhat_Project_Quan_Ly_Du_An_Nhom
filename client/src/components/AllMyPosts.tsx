import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Typography, Card, Spin, Pagination } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllMyPosts.scss";
import Footer from "./Footer";

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

interface Article {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
  image: string;
  status: string;
}

interface AllMyPostsProps {
  searchKeyword: string; 
}

const AllMyPosts: React.FC<AllMyPostsProps> = ({ searchKeyword }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredArticles = articles.filter((article) => {
    const keyword = searchKeyword?.toLowerCase() || "";

    const title = article.title?.toLowerCase() || "";

    return (
      title.includes(keyword) 
    );
  });

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout className="mypost-layout">
      <Content className="mypost-content">
        <div className="header">
          <Title
            level={3}
            className="add-article"
            onClick={() => navigate("/addArticleHome")}
          >
            ADD NEW ARTICLE
          </Title>
        </div>

        {filteredArticles.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Title level={4}>No posts found for “{searchKeyword}”</Title>
          </div>
        ) : (
          <>
            <Row gutter={[24, 24]}>
              {paginatedArticles.map((article) => (
                <Col xs={24} sm={12} md={8} key={article.id}>
                  <Card
                    hoverable
                    cover={<img src={article.image} alt={article.title} />}
                    className="post-card"
                  >
                    <Text className="date">Date: {article.date}</Text>
                    <Title level={5}>{article.title}</Title>
                    <Paragraph>
                      {article.content.length > 100
                        ? article.content.slice(0, 100) + "..."
                        : article.content}
                    </Paragraph>
                    <div className="info-line">
                      <Text className="category">{article.category}</Text>
                      <Link
                        to={`/editArticleHome/${article.id}`}
                        className="edit-link"
                      >
                        Edit your post
                      </Link>
                    </div>
                  </Card>
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
          </>
        )}
      </Content>

      <Footer />
    </Layout>
  );
};

export default AllMyPosts;
