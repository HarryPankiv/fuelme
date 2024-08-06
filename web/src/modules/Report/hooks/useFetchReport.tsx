import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../api/config';

const fetchReport = async () => {
  const response = await axiosInstance.get('/report');
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
