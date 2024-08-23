import React, { useMemo } from 'react';
import { Card, Flex, Upload } from 'antd';
import type { UploadProps } from 'antd/lib/upload';
import { InboxOutlined } from '@ant-design/icons';
import { useUploadFileMutation } from './hooks/useUploadFile';
import Loader from '../../components/Loader/Loader';

const { Dragger } = Upload;

export const FileUpload: React.FC = () => {
  const { mutate: uploadFile, isPending } = useUploadFileMutation();

  const uploadProps: UploadProps<File> = useMemo(
    () => ({
      onChange: ({ file }) => {
        uploadFile(file as any);
      },
      onDrop() { },
      beforeUpload: () => {
        return false;
      },
    }),
    []
  );

  return (
    <Card>
      <Dragger {...uploadProps}>
        <Flex vertical align='center'>
          {!isPending ? <p className="ant-upload-drag-icon">
            <InboxOutlined color="#659f83" />
          </p> :
            <Flex align='center' style={{ height: "78px" }}>
              <Loader />
            </Flex>
          }
        </Flex>
        <p className="ant-upload-text">
          {!isPending ? 'Click or drag file to this area to upload' : 'Uploading...'}
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </Card>
  );
};
