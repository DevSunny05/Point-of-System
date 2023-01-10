import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Button, Table, Form, Input, message, Select } from "antd";

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
          <DeleteOutlined
            style={{ cursor: "pointer", margin: "10px" }}
            onClick={() => {
              handleDelete(record);
            }}
          />
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
  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post("/api/items/add-item", value);
        message.success("Item added Successfully");
        getAllItems();
        setPopModal(false);
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        console.log(error);
        message.error("Something went wrong");
        dispatch({
          type: "HIDE_LOADING",
        });
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.put("/api/items/edit-item", {
          ...value,
          itemId: editItem._id,
        });
        message.success("Item Updated Successfully");
        getAllItems();
        setPopModal(false);
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        console.log(error);
        message.error("Something went wrong");
        dispatch({
          type: "HIDE_LOADING",
        });
      }
    }
  };

  // handle delete
  const handleDelete=async(record)=>{
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("/api/items/delete-item", {itemId:record._id});
      message.success("Item Delete Successfully");
      getAllItems();
      setPopModal(false);
      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
      dispatch({
        type: "HIDE_LOADING",
      });
    }
  }
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
          title={`${editItem !== null ? "Edit Item" : "Add New Items"}`}
          open={popModal}
          onCancel={() => {
            setPopModal(false);
            setEditItem(null);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
            <Form.Item name="name" label="name">
              <Input />
            </Form.Item>

            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>

            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>

            <Form.Item name="category" label="Category">
              <Select>
              <Select.Option value='drinks'>Drinks</Select.Option>
              <Select.Option value='rice'>Rice</Select.Option>
              <Select.Option value='noodles'>Noodles</Select.Option>
              <Select.Option value='pizza'>Pizza</Select.Option>
              <Select.Option value='burger'>Burger</Select.Option>
              </Select>
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
