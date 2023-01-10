import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import SingleItem from "../components/SingleItem";
import { useDispatch } from "react-redux";

const Home = () => {
  const [itemData, setItemData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("drinks");
  const categories = [
    {
      name: "drinks",
      imageUrl:
        "https://th.bing.com/th/id/OIP.e_8rXb_21QUoo25TYpkoGQHaL9?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      name: "rice",
      imageUrl:
        "https://th.bing.com/th/id/OIP._kUx0Yv0isFwelSC7QiMngHaE0?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      name: "noodles",
      imageUrl:
        "https://th.bing.com/th/id/OIP.Eh-GwZEplJY_z7pCBVNXFwHaHa?w=189&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      name: "pizza",
      imageUrl:
        "https://th.bing.com/th/id/OIP.Qn8Q6S6HTMf9W_rSst4vgAHaEx?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      name: "burger",
      imageUrl:
        "https://th.bing.com/th/id/OIP.RngfWk8D_LSNybkrWKUmSgHaE8?w=262&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];
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
        dispatch({
          type: "HIDE_LOADING",
        });
      }
    };
    getAllItems();
  }, [dispatch]);

  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`category ${
              selectedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="40"
              width="40"
              style={{ objectFit: "cover", }}
            />
          </div>
        ))}
      </div>
      <Row>
        {itemData
          .filter((i) => i.category === selectedCategory)
          .map((item) => (
            <Col xs={24} sm={18} md={12} lg={6}>
              <SingleItem key={item.name} item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default Home;
