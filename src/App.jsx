import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Layout } from 'antd';
import EnterroomtPage from './Layout/EnterRoom';


const { Content } = Layout;

function App() {
  return (
    <Layout style={{ height: '100vh', width: '100vw' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* <EnterroomtPage /> */}
      <EnterroomtPage  />
      </Content>
    </Layout>
  );
}

export default App;
