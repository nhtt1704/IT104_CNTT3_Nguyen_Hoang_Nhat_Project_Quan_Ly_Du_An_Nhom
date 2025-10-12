import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import {
  FacebookFilled,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./Login.scss";
import a from "./a6f14c1fa6846f29f11dc2e85f40b29fbcc92d57.png";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState("");

  const handleLogin = async (values: any) => {
    const { email, password } = values;
    setError("");

    if (!email) {
      setError("Email không được để trống");
      return;
    }
    if (!password) {
      setError("Mật khẩu không được để trống");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/users");
      const users = res.data;

      const user = users.find((u: any) => u.email === email);

      if (!user) {
        setError("Email không tồn tại");
      } else if (user.password !== password) {
        setError("Mật khẩu không đúng");
      } else {
        message.success("Đăng nhập thành công!");
        localStorage.setItem("userId", user.id);
        localStorage.setItem("user", JSON.stringify(user));

        window.location.href = "/home";
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi kết nối đến server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <img src={a} alt="login" />
        </div>

        <div className="login-right">
          <div className="social-login">
            <span className="social-text">Sign in with</span>
            <div className="social-icons">
              <Button shape="circle" icon={<FacebookFilled />} />
              <Button shape="circle" icon={<TwitterOutlined />} />
              <Button shape="circle" icon={<LinkedinOutlined />} />
            </div>
          </div>

          <div className="or-text">Or</div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleLogin}
            className="login-form"
          >
            <Form.Item name="email" label="Email address">
              <Input placeholder="Enter a valid email address" />
            </Form.Item>

            <Form.Item name="password" label="Password">
              <Input.Password placeholder="Enter password" />
            </Form.Item>

            {error && (
              <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>

          <div className="register-text">
            <span>Don’t have an account? </span>
            <a href="/register">Register</a>
          </div>
        </div>
      </div>

      <footer className="login-footer">
        <p>Copyright © 2025. All rights reserved.</p>
        <div className="footer-icons">
          <a href="#">
            <FacebookFilled />
          </a>
          <a href="#">
            <TwitterOutlined />
          </a>
          <a href="#">
            <i className="fab fa-google">G</i>
          </a>
          <a href="#">
            <LinkedinOutlined />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
