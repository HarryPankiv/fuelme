import React, { FC } from 'react';
import { Flex, Typography } from 'antd';

interface Props {
  title: string;
}

export const CardTitle: FC<Props> = ({ title }) => (
  <Flex align="center" gap="8px" style={{ marginBottom: '20px' }}>
    <div
      style={{
        backgroundColor: '#659f83',
        width: '10px',
        height: '40px',
        borderRadius: '10px',
      }}
    ></div>
    <Typography.Title
      level={4}
      style={{
        textAlign: 'start',
        margin: 0,
      }}
    >
      {title}
    </Typography.Title>
  </Flex>
);