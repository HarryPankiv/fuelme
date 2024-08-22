import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Card, Flex, Select } from 'antd';
import { ResponsiveLine } from '@nivo/line';
import { CardTitle } from '../../components/CardTitle';
import { useFetchMonthlyTrends } from './hooks/useFetchMonthlyTrends';
import { useFetchUniqueCategories } from './hooks/useFetchUniqueAccounts';

const PLAccountTrendChart: React.FC = () => {
  const { data: masterCategories } = useFetchUniqueCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: monthlyTrends, refetch: fetchMonthlyTrends } =
    useFetchMonthlyTrends(selectedCategory);

  useEffect(() => {
    if (selectedCategory) {
      fetchMonthlyTrends();
    }
  }, [selectedCategory]);

  const data = [
    {
      id: selectedCategory,
      data: (monthlyTrends || []).map((item: any) => ({
        x: dayjs(item.month).format('MMM YYYY'),
        y: Number(item.totalAmount).toFixed(2),
      })),
    },
  ];

  return (
    <Card>
      <CardTitle title="PL Account Trend" />
      <Select
        style={{ width: 200, display: 'block', justifySelf: 'flex-start' }}
        placeholder="Select Master Category"
        onChange={(masterCategory) => setSelectedCategory(masterCategory)}
        options={(masterCategories || []).map((category: any) => ({
          label: category,
          value: category,
        }))}
      />
      {monthlyTrends && (
        <Flex style={{ height: '400px', width: '100%' }}>
          <ResponsiveLine
            // @ts-ignore
            data={data}
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
              legendOffset: 40,
              legendPosition: 'middle',
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Total Amount',
              legendOffset: -56,
              legendPosition: 'middle',
            }}
            // colors={{ scheme: 'tableau10' }}
            colors={['#659f83']}
            colorBy="index"
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
          />
        </Flex>
      )}
    </Card>
  );
};

export default PLAccountTrendChart;
