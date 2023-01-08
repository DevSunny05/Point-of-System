import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Col, Row } from 'antd';
import SingleItem from '../components/SingleItem';

const Home = () => {
  const [itemData,setItemData]=useState([])

  useEffect(()=>{
    const getAllItems=async()=>{
      try {
        const {data}=await axios.get('/api/items/get-item')
        setItemData(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllItems()
  },[])
  return (
    <DefaultLayout>
      <Row>
        {
          itemData.map((item)=>(
           <Col xs={24} sm={18} md={12} lg={6}> 
             <SingleItem item={item}/>
           </Col>
          ))
        }
      </Row>

    </DefaultLayout>
  )
}

export default Home