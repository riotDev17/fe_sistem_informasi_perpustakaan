import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Admin | Riwayat Peminjaman'));
  });

  return (
    <>
      <h1>Riwayat Peminjaman</h1>
    </>
  );
};

export default Index;
