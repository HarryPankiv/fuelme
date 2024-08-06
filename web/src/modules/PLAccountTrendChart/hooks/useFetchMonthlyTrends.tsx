import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../api/config';

export const FETCH_MONTHLY_TRENDS_QUERY_KEY = 'fetchMonthlyTrends';

export const useFetchMonthlyTrends = (masterCategory: string | null) => {
  return useQuery({
    queryKey: [FETCH_MONTHLY_TRENDS_QUERY_KEY],
    queryFn: async () => {
      return axiosInstance
        .get(`/report/monthly-trends`, {
          params: {
            masterCategory,
          },
        })
        .then((res) => res.data);
    },
    enabled: !!masterCategory,
  });
};
