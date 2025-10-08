import { useState } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import axios from "axios";
import "./Register.scss";

function Register() {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values: any) => {
    const { firstName, lastName, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      message.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);

    try {
      const checkUser = await axios.get(
        `http://localhost:8000/users?email=${email}`
      );
      if (checkUser.data.length > 0) {
        message.error("Email này đã được đăng ký!");
        setLoading(false);
        return;
      }

      const name = `${firstName.trim()} ${lastName.trim()}`;

      const username = `@${lastName.trim().toLowerCase().replace(/\s+/g, "")}`;

      const status = "hoạt động";

      await axios.post("http://localhost:8000/users", {
        name,
        username,
        email,
        password,
        status,
      });

      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
      message.error("Đăng ký thất bại, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    window.location.href = "/login";
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-left">
          <h1>Welcome to the website</h1>
          <p>RIKKEI EDUCATION</p>
        </div>

        <div className="register-form-box">
          <Form layout="vertical" onFinish={onFinish} validateTrigger="onSubmit">
            <div className="name-fields">
              <Form.Item
                name="firstName"
                label="Họ"
                rules={[{  message: "Họ không được để trống" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Tên"
                rules={[{  message: "Tên không được để trống" }]}
              >
                <Input />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {  message: "Email không được để trống" },
                { type: "email", message: "Email phải đúng định dạng" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                {  message: "Mật khẩu không được để trống" },
                { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              rules={[
                {
                  
                  message: "Mật khẩu xác nhận không được để trống",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu phải trùng khớp"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Đăng ký
              </Button>
            </Form.Item>

            <div className="login-text">
              <span>Đã có tài khoản? </span>
              <a href="/login">Đăng nhập</a>
            </div>
          </Form>
        </div>
      </div>

      <Modal
        open={isModalVisible}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: "none" } }}
        okText="Đăng nhập ngay"
        centered
      >
        <h2 style={{ textAlign: "center", color: "#52c41a" }}>
           Đăng ký thành công
        </h2>
        <p style={{ textAlign: "center" }}>
          Bạn sẽ được chuyển đến trang đăng nhập ngay bây giờ
        </p>
      </Modal>
    </div>
  );
}

export default Register;
