import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../api/config';

export const FETCH_UNIQUE_MASTER_CATEGORIES_QUERY_KEY = 'fetchUniquePLAccounts';

export const useFetchUniqueCategories = () => {
  return useQuery({
    queryKey: [FETCH_UNIQUE_MASTER_CATEGORIES_QUERY_KEY],
    queryFn: async () => {
      return axiosInstance
        .get('/report/master-category-list')
        .then((res) => res.data);
    },
  });
};
