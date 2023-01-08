import React, { useState } from 'react';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
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

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  // const {cartItems}=useSelector(state=>state.rootReducer)
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
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

          <Menu.Item key='/logout' icon={<LogoutOutlined />}>
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

          <div className="cart-item">
            {/* <p>{cartItems.length}</p> */}
            <ShoppingCartOutlined />
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