import { Heading } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MAX_FILE_SIZE } from '../../../utils/const';
import { FilePreviewer } from '../../common/file-previewer';

export type FormInputs = {
  asset: FileList;
  title: string;
  description: string;
  thumbnail: FileList;
};

export const Create = () => {
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [mimeType, setMimeType] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onBlur' });

  const onChangeFile = useCallback((e: any) => {
    const file = e.target.files[0];
    setMimeType(file?.type);
    setFile(file);
  }, []);

  const onClearFile = useCallback(() => {
    setFileUrl('');
    setFile(undefined);
  }, []);

  const onClearThumbnail = useCallback(() => {
    setThumbnailUrl('');
    setThumbnail(undefined);
  }, []);

  return (
    <>
      <Heading as="h2">Create</Heading>
      <FilePreviewer
        url={fileUrl}
        onChange={onChangeFile}
        onClear={onClearFile}
        inputId="asset"
        labelText={'Image, Video, Audio, or PDF'}
        opt={{
          ...register('asset', {
            required: 'Asset is required',
            validate: {
              maxFileSize: (f) => f[0].size < MAX_FILE_SIZE || 'uploaded file is too large',
            },
          }),
        }}
      />
    </>
  );
};
