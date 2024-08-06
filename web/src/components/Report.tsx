import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchReport = async () => {
    const response = await axios.get('http://localhost:3000/report');
    if (response.status !== 200) {
        throw new Error('Error fetching report data');
    }
    return response.data;
};

const Report: React.FC = () => {
    const { data: report, error, isLoading } = useQuery(['report'], fetchReport);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading report data</div>;

    return (
        <div>
            <h2>Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Master Category</th>
                        <th>Month</th>
                        <th>Total Amount</th>
                        <th>Transaction Count</th>
                    </tr>
                </thead>
                <tbody>
                    {report.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{item.masterCategory}</td>
                            <td>{item.month}</td>
                            <td>{item.totalAmount}</td>
                            <td>{item.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Report;
