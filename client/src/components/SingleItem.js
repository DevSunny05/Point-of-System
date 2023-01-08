import React from "react";
import { Button, Card } from "antd";

const SingleItem = ({ item }) => {
  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        
        style={{  width: 240, margin:20 }}
        cover={
          <img
            alt={item.name}
            src={item.image}
            style={{ height: 240, }}
          />
        }
      >
        <Meta title={item.name}  />
        <div className="item-button">
            <Button>Add to cart</Button>
        </div>
      </Card>
    </div>
  );
};

export default SingleItem;
