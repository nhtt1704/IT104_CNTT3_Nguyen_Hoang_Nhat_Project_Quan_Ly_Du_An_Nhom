import React from "react";
import { Input, Select, Radio, Upload, Button, Form, Typography } from "antd";
import { InboxOutlined, CloseOutlined } from "@ant-design/icons";
import "./AddArticle.scss";

const { TextArea } = Input;
const { Title } = Typography;

function AddArticle() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Form Values:", values);
  };

  return (
    <div className="add-article">
      <div className="add-article__header">
        <Title level={4}>📝 Add New Article</Title>
        <CloseOutlined className="add-article__close" />
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Title:" name="title">
          <Input placeholder="Enter article title" />
        </Form.Item>

        <Form.Item label="Article Categories:" name="category">
          <Input placeholder="Enter categories" />
        </Form.Item>

        <Form.Item label="Mood:" name="mood">
          <Select placeholder="Select mood">
            <Select.Option value="happy">😊 Happy</Select.Option>
            <Select.Option value="sad">😢 Sad</Select.Option>
            <Select.Option value="angry">😡 Angry</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Content:" name="content">
          <TextArea rows={4} placeholder="Write your content here..." />
        </Form.Item>

        <Form.Item label="Status:" name="status">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="upload" valuePropName="fileList">
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
