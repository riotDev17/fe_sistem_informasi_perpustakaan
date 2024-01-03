import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Admin | Kelas'));
  });

  return (
    <>
      <h1>Kelas</h1>
    </>
  );
};

export default Index;
