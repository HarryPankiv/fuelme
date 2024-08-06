import React from 'react';
import './App.css';
import { FileUpload } from './modules/FileUpload';
import Report from './modules/Report/Report';
import TopPLAccountsChart from './modules/TopPLAccountsChart/TopPLAccountsChart';
import PLAccountTrendChart from './modules/PLAccountTrendChart/PLAccountTrendChart';
import { Flex } from 'antd';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Financial Dashboard</h1>
      <Flex vertical gap="20px">
        <FileUpload />
        <Report />
        <PLAccountTrendChart />
        <TopPLAccountsChart />
      </Flex>
    </div>
  );
};

export default App;
