import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { requestGet } from './api/requestGet';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { requestDelete } from './api/requestDelete';
import { useCallback, useEffect, useState } from 'react';
import Table from './Table/Index';
import ButtonIcon from '../../../components/buttons/icon/ButtonIcon';
import SearchBasic from '../../../components/searchs/SearchBasic';
import TippyDefault from '../../../components/tippys/default/TippyDefault';
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

  const handleSearch = (e: any) => {
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
      <BreadcrumbsDefault
        header="Kelas"
        menus={[
          {
            label: 'Kelas',
            link: '/kelas',
            icon: 'streamline:class-lesson-solid',
          },
        ]}
      />

      <div className="flex justify-between items-center mt-10">
        <SearchBasic value={search} placeholder="Cari Kelas" onChange={handleSearch} width="w-1/2" />
        <div className="flex gap-3">
          <Link to={'/kelas/tambah-kelas'}>
            <TippyDefault content="Tambah Kelas">
              <ButtonIcon icon="ic:baseline-plus" backgroundColor="btn-primary" />
            </TippyDefault>
          </Link>

          <TippyDefault content="Refresh Halaman">
            <ButtonIcon icon="material-symbols:refresh" backgroundColor="btn-info" onClick={handleRefresh} />
          </TippyDefault>
        </div>
      </div>

      <div className="mt-5">
        <Table kelas={initialRecords} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default Index;
