import React, { useEffect } from "react";
import { Input, Select, Radio, Upload, Button, Form, Typography, message } from "antd";
import { InboxOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { TextArea } = Input;
const { Title } = Typography;

export default function EditArticle() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/articles/${id}`).then((res) => {
      const article = res.data;
      form.setFieldsValue({
        title: article.title,
        content: article.content,
        mood: article.mood,
        status: article.status === "Công khai" ? "public" : "private",
      });
    });
  }, [id]);

  const handleSubmit = async (values: any) => {
    const imageFile = values.upload?.[0]?.originFileObj;
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : undefined;

    const updatedArticle = {
      title: values.title,
      content: values.content,
      mood: values.mood,
      status: values.status === "public" ? "Công khai" : "Riêng tư",
      ...(imageUrl && { image: imageUrl }),
    };

    await axios.patch(`http://localhost:8000/articles/${id}`, updatedArticle);
    message.success("Cập nhật bài viết thành công!");
    navigate("/allMyPosts");
  };

  return (
    <div className="add-article">
      <div className="add-article__header">
        <Title level={4}>✏️ Edit Article</Title>
        <CloseOutlined className="add-article__close" onClick={() => navigate("/allMyPosts")} />
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Title:"
          name="title"
          rules={[{  message: "Không được để trống tiêu đề!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Mood:" name="mood">
          <Select>
            <Select.Option value="Căng thẳng">Căng thẳng</Select.Option>
            <Select.Option value="Thư giãn">Thư giãn</Select.Option>
            <Select.Option value="Buồn">Buồn</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Content:"
          name="content"
          rules={[{  message: "Không được để trống nội dung!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Status:" name="status">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="upload" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
          <Upload.Dragger name="files" beforeUpload={() => false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Upload new image (optional)</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
