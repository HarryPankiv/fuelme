import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchReport = async () => {
  const response = await axios.get('http://localhost:3000/report');
  if (response.status !== 200) {
    throw new Error('Error fetching report data');
  }
  return response.data;
};

const TopPLAccountsChart: React.FC = () => {
  const { data: report, error, isLoading } = useQuery(['report'], fetchReport);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading report data</div>;

  const processTopPLAccounts = (data: any[]) => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthStr = lastMonth.toISOString().slice(0, 7); // YYYY-MM
    const filteredData = data.filter(item => item.month === lastMonthStr);
    const top5 = filteredData.sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 5);
    return top5.map(item => ({
      PLAccount: item.masterCategory,
      TotalAmount: item.totalAmount,
    }));
  };

  const chartData = processTopPLAccounts(report);

  return (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        data={chartData}
        keys={['TotalAmount']}
        indexBy="PLAccount"
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'PL Account',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Total Amount',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default TopPLAccountsChart;
