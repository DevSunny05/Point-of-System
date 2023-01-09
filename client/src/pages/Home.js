import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import SingleItem from "../components/SingleItem";
import { useDispatch } from "react-redux";

const Home = () => {
  const [itemData, setItemData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
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
    getAllItems();
  }, [dispatch]);

  return (
    <DefaultLayout>
      <Row>
        {itemData.map((item) => (
          <Col xs={24} sm={18} md={12} lg={6} key={item.name}>
            <SingleItem item={item} />
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
};

export default Home;
