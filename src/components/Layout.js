import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function DefaultLayout({ children }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light">
        <div className="logo" />
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">

          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/jobs">
              Jobs
            </Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link to="/">
              Clients
            </Link>
            </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />}>
          <Link to="/timesheets">
              Jobs
            </Link>
            </Menu.Item>
          <Menu.Item key="4" icon={<DesktopOutlined />}>
          <Link to="/staff">
              Staff
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout theme="light" className="site-layout">
        <Content style={{ margin: '0 16px', paddingTop: '20px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}
