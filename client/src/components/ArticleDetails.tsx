import React from "react";
import { Avatar, Button } from "antd";
import { LikeOutlined,MessageOutlined,ShareAltOutlined,ArrowLeftOutlined } from "@ant-design/icons";
import "./ArticleDetails.scss";

function ArticleDetails() {
  const comments = [
    {
      id: 1,
      user: "John Doe",
      text: "very good!",
      likes: 13,
      replies: 6,
    },
    {
      id: 2,
      user: "Anna Smith",
      text: "hello rikkei!",
      likes: 5,
      replies: 6,
    },
  ];

  return (
    <div className="post-detail">\
      <div className="post-detail__back">
        <ArrowLeftOutlined /> 
      </div>

      <div className="post-detail__card">
        <div className="post-detail__header">
          <Avatar src="https://i.pravatar.cc/80" size={60} />
          <div className="post-detail__info">
            <h3>A Productive Day at Work</h3>
            <p>
              Today was a really productive day at work. I managed to finish a
              report ahead of schedule and received positive feedback from my
              manager. After work, I went for a walk in the park, enjoying the
              fresh air. Looking forward to another great day tomorrow!
            </p>
          </div>
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
                <span>{c.likes} Like</span>
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
