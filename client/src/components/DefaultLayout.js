import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import '../style/DefaultLayout.css'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined, 
  UserOutlined,
  HomeOutlined ,
  BookOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined
  
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Spinner from './Spinner';

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({children}) => {
 const navigate=useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {cartItems,loading}=useSelector(state=>state.rootReducer)
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(()=>{
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
  },[cartItems])

  return (
    <Layout>
      {loading && <Spinner/>}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div >
          <h2 className="logo" >POS</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          
        >

          <Menu.Item key='/' icon={<HomeOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>

          <Menu.Item key='/bills' icon={<BookOutlined />}>
            <Link to='/bills'>Bills</Link>
          </Menu.Item>

          <Menu.Item key='/items' icon={<UnorderedListOutlined />}>
            <Link to='/items'>Items</Link>
          </Menu.Item>

          <Menu.Item key='/customers' icon={<UserOutlined/>}>
            <Link to='/customers'>Customers</Link>
          </Menu.Item>

          <Menu.Item key='/logout' icon={<LogoutOutlined />} onClick={()=>{
            localStorage.removeItem('auth')
            navigate('/login')
          }}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}

          <div className="cart-item" style={{display:'flex',alignItem:'center',margin:'10px',justifyContent:'center',position:'relative'}} onClick={()=>navigate('/cart')}>
            {console.log(cartItems)}
            <ShoppingCartOutlined style={{display:'flex',alignItems:'center',background:'lightBlue',width:'30px',height:'30px',borderRadius:'100%'}} />
            <p style={{fontWeight:'bold',position:'absolute',left:'-4px'}}>{cartItems.length}</p>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;