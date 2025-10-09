import React, { useEffect, useState } from "react";
import { Avatar, Button, Spin } from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  ShareAltOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ArticleDetails.scss";

interface Article {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
  image: string;
  status: string;
}

function ArticleDetails() {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const comments = [
    { id: 1, user: "John Doe", text: "very good!", likes: 13, replies: 6 },
    { id: 2, user: "Anna Smith", text: "hello rikkei!", likes: 5, replies: 6 },
  ];

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/articles/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error("Không tìm thấy bài viết:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="post-detail">
        <Button onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
          Quay lại
        </Button>
        <p>Bài viết không tồn tại!</p>
      </div>
    );
  }

  return (
    <div className="post-detail">
      <div className="post-detail__back" onClick={() => navigate(-1)}>
        <ArrowLeftOutlined /> <span>Quay lại</span>
      </div>

      <div className="post-detail__card">
        <div className="post-detail__header">
          <Avatar src="https://i.pravatar.cc/80" size={60} />
          <div className="post-detail__info">
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <span className="date">{article.date}</span>
            <span className="category">{article.category}</span>
          </div>
        </div>

        <div className="post-detail__image">
          <img src={article.image} alt={article.title} />
        </div>

        <div className="post-detail__actions">
          <Button icon={<LikeOutlined />} type="text">
            Like
          </Button>
          <Button icon={<MessageOutlined />} type="text">
            Comment
          </Button>
          <Button icon={<ShareAltOutlined />} type="text">
            Share
          </Button>
        </div>
      </div>

      <div className="post-detail__comments">
        <a href="#">View all 20 comments</a>
        {comments.map((c) => (
          <div key={c.id} className="comment">
            <div className="comment__avatar">
              <Avatar src={`https://i.pravatar.cc/40?img=${c.id + 2}`} size={40} />
              <div className="comment__line"></div>
            </div>
            <div className="comment__content">
              <span className="comment__user">{c.user}</span>
              <p>{c.text}</p>
              <div className="comment__actions">
                <span>{c.likes} Likes</span>
                <span>{c.replies} Replies</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleDetails;
