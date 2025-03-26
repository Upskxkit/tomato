import React, { useState } from 'react'
import { ClockCircleOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import { HashRouter, Route, Routes } from 'react-router'
import TimersPage from './page/Timers.page'
import TimerWidgetPage from './page/TimerWidget.page'
const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const items: MenuItem[] = [getItem('Timer', '1', <ClockCircleOutlined />)]

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout style={{ minHeight: '100vh', width: '100vw' }}>
              <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
              </Sider>
              <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '16px' }}>
                  <div
                    style={{
                      padding: 24,
                      minHeight: 360,
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG
                    }}
                  >
                    <TimersPage />
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Tomato2</Footer>
              </Layout>
            </Layout>
          }
        />
        <Route path="/timer" element={<TimerWidgetPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
