import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import SingleFileUpload from '../../../components/forms/file/SingleFileUpload';

const Index = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState('');

  const handleUploadImage = async (e: any) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    dispatch(setPageTitle('Admin | Dashboard'));
  });

  return (
    <>
      <SingleFileUpload
        label={''}
        images={imagePreview}
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
        onChange={handleUploadImage}
      />
    </>
  );
};

export default Index;
