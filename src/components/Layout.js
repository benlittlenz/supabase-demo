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
            Clients
            </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Timesheets
            </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Staff
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
