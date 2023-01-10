import React from "react";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";


const SingleItem = ({ item }) => {
  const dispatch=useDispatch();
  
  const handleAddToCart=()=>{
    dispatch({
      type:'ADD_TO_CART',
      payload:{...item,quantity:1},
    })
  }
  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{  width: 240, margin:20,boxShadow:' rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
        cover={
          <img
            alt={item.name}
            src={item.image}
            style={{ height: 200, }}
          />
        }
      >
        <Meta title={item.name}  />
        <div className="item-button">
            <Button onClick={()=>handleAddToCart()}>Add to cart</Button>
        </div>
      </Card>
    </div>
  );
};

export default SingleItem;
