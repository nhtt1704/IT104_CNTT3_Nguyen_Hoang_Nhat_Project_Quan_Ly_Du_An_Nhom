import React, { useEffect, useState } from "react";
import {
  Input,
  Select,
  Radio,
  Upload,
  Button,
  Form,
  Typography,
  message,
} from "antd";
import { InboxOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddArticle.scss";

const { TextArea } = Input;
const { Title } = Typography;

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};

function AddArticle() {
  const [form] = Form.useForm();
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/articles").then((res) => setArticles(res.data));
    axios.get("http://localhost:8000/entries").then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (values: any) => {
    const isExist = articles.some(
      (article) =>
        article.title.toLowerCase().trim() === values.title.toLowerCase().trim()
    );
    if (isExist) {
      form.setFields([{ name: "title", errors: ["Tên bài viết đã tồn tại!"] }]);
      return;
    }

    let imageBase64 = "";
    const imageFile = values.upload?.[0]?.originFileObj;
    if (imageFile) {
      imageBase64 = await getBase64(imageFile);
    }

    const newArticle = {
      title: values.title,
      category: values.category,
      mood: values.mood,
      content: values.content,
      status: values.status === "public" ? "Công khai" : "Riêng tư",
      image: imageBase64,
      date: new Date().toISOString().split("T")[0],
    };

    await axios.post("http://localhost:8000/articles", newArticle);
    message.success("Thêm bài viết thành công!");
    navigate("/admin/article");
  };

  return (
    <div className="add-article">
      <div className="add-article__header">
        <Title level={4}>📝 Add New Article</Title>
        <CloseOutlined
          className="add-article__close"
          onClick={() => navigate("/admin/article")}
        />
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Title:"
          name="title"
          rules={[{required:true, message: "Không được để trống tiêu đề!" }]}
        >
          <Input placeholder="Enter article title" />
        </Form.Item>

        <Form.Item
          label="Article Categories:"
          name="category"
          rules={[{required:true, message: "Vui lòng chọn category!" }]}
        >
          <Select placeholder="Select category">
            {categories.map((cat) => (
              <Select.Option key={cat.id} value={cat.name}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Mood:"
          name="mood"
          rules={[{required:true, message: "Vui lòng chọn mood!" }]}
        >
          <Select placeholder="Select mood">
            <Select.Option value="Căng thẳng">😡 Căng thẳng</Select.Option>
            <Select.Option value="Thư giãn">😊 Thư giãn</Select.Option>
            <Select.Option value="Buồn">😢 Buồn</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Content:"
          name="content"
          rules={[{required:true, message: "Không được để trống nội dung!" }]}
        >
          <TextArea rows={4} placeholder="Write your content here..." />
        </Form.Item>

        <Form.Item
          label="Status:"
          name="status"
          rules={[{required:true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload.Dragger name="files" beforeUpload={() => false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Browse and choose the files you want to upload from your computer
            </p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddArticle;
