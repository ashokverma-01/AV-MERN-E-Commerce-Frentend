import React, { useContext, useState } from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import AppContext from "../../context/AppContext";
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddProduct from "./AddProduct";

const AllProduct = () => {
  const { filterData,deleteProduct } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const [pageSize, setPageSize] = useState(5); // State to track the page size
  const data = filterData;


  const handleViewClick = (record) => {
    // handle view logic
  };
  const handleEditClick = (record) => {
    // handle view logic
  };


  const columns = [
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={`http://localhost:5000/${image}`}
          alt="Product"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => handleEditClick(record)}
            icon={<EditOutlined />}
          />
          <Button
            type="link"
            onClick={() => handleViewClick(record)}
            icon={<EyeOutlined />}
          />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => deleteProduct(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Handle pagination change
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current); // Update current page
    setPageSize(pagination.pageSize); // Update page size
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <div
        className=""
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Space style={{ marginBottom: "16px", paddingRight: "50px" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
          >
            Add
          </Button>
        </Space>
      </div>
      <div className="" style={{ paddingLeft: "50px", paddingRight: "50px" }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            current: currentPage, // Bind current page
            pageSize: pageSize, // Bind page size
            total: data.length, // Total number of products
            showSizeChanger: true, // Allow page size change
            pageSizeOptions: ['5', '10', '20', '50', '100'], // Page size options
          }}
          onChange={handleTableChange} // Handle pagination change
          rowKey="_id" // Ensure unique row key
        />
      </div>
      <AddProduct visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default AllProduct;
