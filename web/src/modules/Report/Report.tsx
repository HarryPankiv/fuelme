import React, { useMemo } from 'react';
import { Card, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import { groupBy, keys } from 'ramda';
import { Transactions } from './types';
import { CardTitle } from '../../components/CardTitle';
import { useFetchReport } from './hooks/useFetchReport';

const formatMonth = (date: Date): string => dayjs(date).format('YYYY-MM');

const groupByMonth = (transactions: Transactions) => {
  const groupByMonthFn = groupBy((transaction: Transactions[number]) =>
    formatMonth(transaction?.month)
  );
  const grouped = groupByMonthFn(transactions);

  return keys(grouped).map((month) => ({
    month,
    totalTransactionAmount: grouped[month]?.reduce(
      (acc, transaction) => acc + transaction?.totalAmount,
      0
    ),
    totalTransactionCount: grouped[month]?.length,
    transactions: grouped[month],
  }));
};

const Report: React.FC = () => {
  const { data: report, error, isLoading } = useFetchReport();

  const tableData = groupByMonth(report || []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading report data</div>;

  const columns = useMemo(() => [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      render: (date: string) => dayjs(date).format('MMMM YYYY'),
    },
    {
      title: 'Transaction Amount, $',
      dataIndex: 'totalTransactionAmount',
      key: 'totalTransactionAmount',
      render: (amount: string) =>
        Number(amount) > 0 ? (
          <Typography.Text style={{ color: '#2CBC63' }}>
            +{Number(amount).toFixed(2)} USD
          </Typography.Text>
        ) : (
          <Typography.Text>{Number(amount).toFixed(2)} USD</Typography.Text>
        ),
    },
    {
      title: 'Transaction Count',
      dataIndex: 'totalTransactionCount',
      key: 'totalTransactionCount',
    },
  ], []);

  // TODO: Implement opening nested table on row click
  // const nestedColumns = [
  //   {
  //     title: 'Master Category',
  //     dataIndex: 'masterCategory',
  //     key: 'masterCategory',
  //     render: (category: string, row) => (
  //       <Flex gap="8px">
  //         <Typography>{category}</Typography>
  //         <Typography style={{ color: '#959d9d' }}>
  //           {category === 'Uncategorized' ? ` - ${row.plAccount}` : ''}
  //         </Typography>
  //       </Flex>
  //     ),
  //   },
  //   {
  //     title: 'Total Amount, $',
  //     dataIndex: 'totalAmount',
  //     key: 'totalAmount',
  //     render: (amount: string) =>
  //       Number(amount) > 0 ? (
  //         <Typography.Text style={{ color: '#2CBC63' }}>
  //           +{Number(amount).toFixed(2)} USD
  //         </Typography.Text>
  //       ) : (
  //         <Typography.Text>{Number(amount).toFixed(2)} USD</Typography.Text>
  //       ),
  //   },
  //   {
  //     title: 'Transaction Count',
  //     dataIndex: 'count',
  //     key: 'count',
  //   },
  // ];

  return (
    <Card>
      <CardTitle title="Monthly Report" />
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey={(record) => `${record.month}`}
      />
    </Card>
  );
};

export default Report;
