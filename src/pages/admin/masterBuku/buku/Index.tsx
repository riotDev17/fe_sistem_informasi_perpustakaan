import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { requestGet } from './api/requestGet';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { requestDelete } from './api/requestDelete';
import { useCallback, useEffect, useState } from 'react';
import SearchBasic from '../../../../components/searchs/SearchBasic';
import BreadcrumbsDefault from '../../../../components/breadcrumbs/BreadcrumbsDefault';
import ButtonIconTextLeft from '../../../../components/buttons/icon/ButtonIconTextLeft';
import Table from './Table/Index';

const Index = () => {
  const dispatch = useDispatch();
  const [buku, setBuku] = useState([]);
  const [initialRecords, setInitialRecords] = useState(buku);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Buku'));

    requestGet().then((bukuData) => {
      setBuku(bukuData);
      setInitialRecords(bukuData);
    });
  }, [dispatch]);

  const debounceSearch = useCallback(
    debounce((searchQuery) => {
      const filteredData = (initialRecords as any[]).filter((item) => item.judul_buku.toLowerCase().includes(searchQuery.toLowerCase()));
      setInitialRecords(filteredData as never[]);
    }, 500),
    [buku]
  );

  const handleSearch = (e: any) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    debounceSearch(searchQuery);
  };

  const handleDelete = async (id_buku: string) => {
    const isDeleted = await requestDelete(id_buku);
    if (isDeleted) {
      requestGet().then((bukuData) => {
        setBuku(bukuData);
        setInitialRecords(bukuData);
      });
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Buku"
        menus={[
          {
            label: 'Buku',
            link: '/buku',
            icon: 'iconoir:book-solid',
          },
        ]}
      />

      <div className="flex justify-between items-center mt-10">
        <SearchBasic value={search} placeholder="Cari Judul Buku" onChange={handleSearch} width="w-1/2" />
        <div className="flex gap-3">
          <Link to={'/buku/tambah-buku'}>
            <ButtonIconTextLeft icon="ic:baseline-plus" text="Tambah Buku" backgroundColor="btn-primary" />
          </Link>

          <ButtonIconTextLeft icon="material-symbols:refresh" text="Refresh Halaman" backgroundColor="btn-info" onClick={handleRefresh} />
        </div>
      </div>

      <div className="mt-5">
        <Table buku={initialRecords} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default Index;
