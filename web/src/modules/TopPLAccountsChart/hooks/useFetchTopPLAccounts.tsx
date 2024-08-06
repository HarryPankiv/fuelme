import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../api/config';

export const FETCH_TOP_PL_ACCOUNTS_QUERY_KEY = 'topPLAccounts';

export const useFetchTopPLAccounts = () => {
  return useQuery({
    queryKey: [FETCH_TOP_PL_ACCOUNTS_QUERY_KEY],
    queryFn: async () => {
      return axiosInstance.get('/report/top5').then((res) => res.data);
    },
  });
};
