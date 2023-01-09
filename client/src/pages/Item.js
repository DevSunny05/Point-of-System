import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Button, Table, Form, Input, message } from "antd";

const Item = () => {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const getAllItems = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/items/get-item");
      setItemData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  // table data
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img
          src={image}
          alt={record.name}
          height="100"
          width="100"
          style={{ objectFit: "cover", borderRadius: "10px" }}
        />
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex align-center mx-3">
          <DeleteOutlined style={{ cursor: "pointer", margin: "10px" }} />
          <EditOutlined
            style={{ cursor: "pointer", margin: "10px" }}
            onClick={() => {
              setEditItem(record);
              setPopModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  // handle form submit
  const handleSubmit = async (values) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const res = await axios.post("/api/items/add-item", values);
      message.success("Item added Successfully");
      getAllItems();
      setPopModal(false);
      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List</h1>
        <Button type="primary" onClick={() => setPopModal(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemData} bordered />
      {popModal && (
        <Modal
          title={`${editItem !== null ? 'Edit Item':'Add New Items'}`}
          open={popModal}
          onCancel={() => {
            setPopModal(false)
            setEditItem(null)
          }}
          footer={false}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="name">
              <Input />
            </Form.Item>

            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>

            <Form.Item name="category" label="Category">
              <Input />
            </Form.Item>

            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default Item;
