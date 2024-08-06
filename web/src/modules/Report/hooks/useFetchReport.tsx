import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchReport = async () => {
  const response = await axios.get('http://localhost:3000/report');
  if (response.status !== 200) {
    throw new Error('Error fetching report data');
  }
  return response.data;
};

export const FETCH_REPORT_QUERY_KEY = 'fetch_report';

export const useFetchReport = () => {
  return useQuery({
    queryKey: [FETCH_REPORT_QUERY_KEY],
    queryFn: fetchReport,
  });
};
