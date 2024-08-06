import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchReport = async () => {
  const response = await axios.get('http://localhost:3000/report');
  if (response.status !== 200) {
    throw new Error('Error fetching report data');
  }
  return response.data;
};

const PLAccountTrendChart: React.FC = () => {
  const { data: report, error, isLoading } = useQuery(['report'], fetchReport);
  const [plAccount, setPlAccount] = useState('Subcontractors');
  const [plAccounts, setPlAccounts] = useState<string[]>([]);

  useEffect(() => {
    if (report) {
      const uniqueAccounts = Array.from(new Set(report.map((item: any) => item.masterCategory)));
      setPlAccounts(uniqueAccounts);
    }
  }, [report]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading report data</div>;

  const processPLAccountTrend = (data: any[], account: string) => {
    const filteredData = data.filter(item => item.masterCategory === account);
    const months = filteredData.map(item => item.month);
    const amounts = filteredData.map(item => item.totalAmount);
    return [
      {
        id: account,
        data: months.map((month, index) => ({
          x: month,
          y: amounts[index],
        })),
      },
    ];
  };

  const chartData = processPLAccountTrend(report, plAccount);

  return (
    <div>
      <select onChange={(e) => setPlAccount(e.target.value)} value={plAccount}>
        {plAccounts.map((account, index) => (
          <option key={index} value={account}>
            {account}
          </option>
        ))}
      </select>
      <div style={{ height: 400 }}>
        <ResponsiveLine
          data={chartData}
          margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Month',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Total Amount',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          colors={{ scheme: 'nivo' }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
        />
      </div>
    </div>
  );
};

export default PLAccountTrendChart;
