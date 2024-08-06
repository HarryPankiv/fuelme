import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Report from './components/Report';
import TopPLAccountsChart from './components/TopPLAccountsChart';
import PLAccountTrendChart from './components/PLAccountTrendChart';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Financial Dashboard</h1>
      <FileUpload />
      <Report />
      <TopPLAccountsChart />
      <PLAccountTrendChart />
    </div>
  );
};

export default App;
