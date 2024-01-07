import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { requestGet } from './api/requestGet';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { requestDelete } from './api/requestDelete';
import { useCallback, useEffect, useState } from 'react';
import Table from './Table/Index';
import SearchBasic from '../../../components/searchs/SearchBasic';
import ButtonIconTextLeft from '../../../components/buttons/icon/ButtonIconTextLeft';
import BreadcrumbsDefault from '../../../components/breadcrumbs/BreadcrumbsDefault';

const Index = () => {
  const dispatch = useDispatch();
  const [kelas, setKelas] = useState([]);
  const [initialRecords, setInitialRecords] = useState(kelas);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Kelas'));

    requestGet().then((kelasData) => {
      setKelas(kelasData);
      setInitialRecords(kelasData);
    });
  }, [dispatch]);

  const debounceSearch = useCallback(
    debounce((searchQuery) => {
      const filteredData = (initialRecords as any[]).filter((item) => item.nama_kelas.toLowerCase().includes(searchQuery.toLowerCase()));
      setInitialRecords(filteredData as never[]);
    }, 500),
    [kelas]
  );

  const handleSearchChange = (e: any) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    debounceSearch(searchQuery);
  };

  const handleDelete = async (id_kelas: string) => {
    const isDeleted = await requestDelete(id_kelas);
    if (isDeleted) {
      requestGet().then((kelasData) => {
        setKelas(kelasData);
        setInitialRecords(kelasData);
      });
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex justify-end">
        <BreadcrumbsDefault
          menus={[
            {
              label: 'Kelas',
              link: '/kelas',
              icon: 'streamline:class-lesson-solid',
            },
          ]}
        />
      </div>

      <div className="flex justify-between items-center gap-3 mt-10">
        <SearchBasic value={search} placeholder="Cari Kelas" onChange={handleSearchChange} width="w-1/2" />
        <div className="flex gap-3">
          <Link to={'/kelas/tambah-kelas'}>
            <ButtonIconTextLeft icon="ic:baseline-plus" text="Tambah Kelas" backgroundColor="btn-primary" />
          </Link>

          <ButtonIconTextLeft icon="material-symbols:refresh" text="Refresh Halaman" backgroundColor="btn-info" onClick={handleRefresh} />
        </div>
      </div>

      <div className="mt-5">
        <Table kelas={initialRecords} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default Index;
