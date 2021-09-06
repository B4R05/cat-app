import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { Prompt, useHistory } from 'react-router-dom';
import { thumbsContainer, thumb, thumbInner, img } from './styles';
import { FileType } from './types';
import { uploadAPI } from '../../api';

// in bytes
const MAX_IMAGE_SIZE: number = 1000000;
// all image types
const ACCEPTED_FILES: string = 'image/*';

const Uploader = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [isUploading, setUploading] = useState<boolean>(false);

  const history = useHistory();

  const { getRootProps, getInputProps } = useDropzone({
    accept: ACCEPTED_FILES,
    multiple: false,
    maxFiles: 1,
    maxSize: MAX_IMAGE_SIZE,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  useEffect(() => () => {
    // revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
  
  const renderThumbnail = () => files.map(file => (
    <div style={thumb as React.CSSProperties} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt="cat preview"
        />
      </div>
    </div>
  ));

  const handleUpload = async (): Promise<void> => {
    setUploading(true);
    let imgdata: FormData = new FormData();
    imgdata.append('file', files[0]);

    try { 
      await uploadAPI('/images/upload', { data: imgdata });
      toast.success('Image successfully uploaded! Now redirecting you to the home page.');
      setTimeout(() => history.push('/'), 3000);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'An error occured.');
    } finally {
      setUploading(false);
      setFiles([]);
    }
  };

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Button primary disabled={isUploading}>Add Image</Button>
      </div>
      <aside style={thumbsContainer as React.CSSProperties}>
        {renderThumbnail()}
      </aside>
      <Button 
        onClick={() => handleUpload()} 
        loading={isUploading}
        disabled={files.length ? false : true}
      >
        Upload
      </Button>
      <Prompt
        when={isUploading}
        message='Your image is being uploaded. Are you sure you want to exit this page?'
      />
    </section>
  );
};


export default Uploader;
