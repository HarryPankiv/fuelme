import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Card, Flex } from 'antd';
import { CardTitle } from '../../components/CardTitle';
import { useFetchTopPLAccounts } from './hooks/useFetchTopPLAccounts';

const TopPLAccountsChart: React.FC = () => {
  const { data: topPLAccounts, isLoading, error } = useFetchTopPLAccounts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading report data</div>;

  if (!topPLAccounts) {
    return null;
  }

  return (
    <Card>
      <CardTitle title="Top 5 PL Accounts" />
      <Flex vertical style={{ height: 400, width: '100%' }}>
        <ResponsiveBar
          data={topPLAccounts.map((account: any) => ({
            PLAccount: account.masterCategory,
            TotalAmount: Number(account.totalAmount).toFixed(2),
          }))}
          keys={['TotalAmount']}
          indexBy="PLAccount"
          margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          // colors={{ scheme: 'tableau10' }}
          colors={['#659f83']}
          colorBy="index"
          borderColor={'#FFFFFF'}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'PL Account',
            legendPosition: 'middle',
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Total Amount',
            legendPosition: 'middle',
            legendOffset: -56,
          }}
          labelSkipWidth={20}
          labelSkipHeight={12}
          labelTextColor={'#FFFFFF'}
          animate={true}
        />
      </Flex>
    </Card>
  );
};

export default TopPLAccountsChart;
