import React, { useEffect, useMemo, useState } from 'react';
import { Card, Upload } from 'antd';
import type { UploadProps } from 'antd/lib/upload';
import { InboxOutlined } from '@ant-design/icons';
import { useUploadFileMutation } from './hooks/useUploadFile';

const { Dragger } = Upload;

export const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { mutate: uploadFile } = useUploadFileMutation();

  const uploadProps: UploadProps<File> = useMemo(
    () => ({
      onChange: (info) => {
        uploadFile(info.file);
      },
      onDrop(e) {},
      beforeUpload: (file) => {
        return false;
      },
    }),
    []
  );

  return (
    <Card>
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined color="#659f83" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </Card>
  );
};
