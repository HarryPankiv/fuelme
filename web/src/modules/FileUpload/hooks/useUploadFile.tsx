import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(
    'http://localhost:3000/report/upload',
    formData
  );

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
      queryClient.invalidateQueries(['report']);
      alert('File uploaded and processed successfully');
    },
    onError: (error: any) => {
      console.error('Error uploading file:', error);
      // alert('Error uploading file');
    },
  });
};
