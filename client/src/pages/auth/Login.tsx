import React from "react";
import { Form, Input, Button } from "antd";
import {
  FacebookFilled,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./Login.scss";

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <img
            src="https://img.freepik.com/free-vector/business-contract-illustration_23-2148758656.jpg"
            alt="login"
          />
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

          <Form layout="vertical" className="login-form">
            <Form.Item
              name="email"
              label="Email address"
              rules={[{ required: true, type: "email", message: "Enter a valid email" }]}
            >
              <Input placeholder="Enter a valid email address" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
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
          <a href="#"><FacebookFilled /></a>
          <a href="#"><TwitterOutlined /></a>
          <a href="#"><i className="fab fa-google">G</i></a>
          <a href="#"><LinkedinOutlined /></a>
        </div>
      </footer>
    </div>
  );
}

export default Login;
