import React from "react";
import { Form, Input, Button } from "antd";
import "./Register.scss"

function RegisterForm() {
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-left">
          <h1>Welcome to the website</h1>
          <p>RIKKEI EDUCATION</p>
        </div>

        <div className="register-form-box">
          <Form layout="vertical">
            <div className="name-fields">
              <Form.Item
                name="firstName"
                label="First name"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last name"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label="Email address"
              rules={[{ required: true, type: "email", message: "Invalid email" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[{ required: true, message: "Please confirm password" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Sign up
              </Button>
            </Form.Item>

            <div className="login-text">
              <span>Already have an account? </span>
              <a href="/login">login</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
