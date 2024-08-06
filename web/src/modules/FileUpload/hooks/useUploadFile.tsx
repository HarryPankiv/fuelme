import { axiosInstance } from '../../../api/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FETCH_REPORT_QUERY_KEY } from '../../Report/hooks/useFetchReport';

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post('report/upload', formData);

  if (response.status !== 200) {
    throw new Error('Error uploading file');
  }

  return response.data;
};

export const useUploadFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FETCH_REPORT_QUERY_KEY] });
    },
    onError: (error: any) => {
      console.error('Error uploading file:', error);
    },
  });
};
