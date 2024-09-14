import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, Row, Col, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios"; 
const { TextArea } = Input;

const AddProduct = ({ visible, setVisible }) => {
  const [form] = Form.useForm();  
  const [loading, setLoading] = useState(false);  

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };


  const handleOk = async (values) => {
    setLoading(true);
    try {
      const { image, title, price, qty, category, description } = values;
      const formData = new FormData(); 
      formData.append("image", image[0]?.originFileObj); 
      formData.append("title", title);
      formData.append("price", price);
      formData.append("qty", qty);
      formData.append("category", category);
      formData.append("description", description);

      // Direct API call using axios
      const response = await axios.post("http://localhost:5000/api/product/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",  // Ensure correct content type
        },
      });

      if (response.status === 201) {
        console.log("Product added successfully:", response.data);
        setVisible(false);  // Close the modal
        form.resetFields();  // Reset form fields after submission
      }
    } catch (error) {
      console.error("Error during product addition:", error);
    } finally {
      setLoading(false);  // Stop loading state
    }
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Add Product"
      visible={visible}
      okText="Submit"
      onCancel={handleCancel}
      confirmLoading={loading}
      onOk={() => form.submit()}  
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleOk}  
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter the Title" }]}
            >
              <Input placeholder="Enter Title" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="qty"
              label="Quantity"
              rules={[{ required: true, message: "Please enter the Quantity" }]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Enter Quantity" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please enter the Category" }]}
            >
              <Input placeholder="Enter Category" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please enter the Price" }]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Enter Price" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter the Description" },
              ]}
            >
              <TextArea rows={2} placeholder="Enter Description" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="image"
              label="Product Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "Please upload an image" }]}
            >
              <Upload
                name="image"
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}  
              >
                <Button icon={<UploadOutlined />}>Upload Product Image</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddProduct;
