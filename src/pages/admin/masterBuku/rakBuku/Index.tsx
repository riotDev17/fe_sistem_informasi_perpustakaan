import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { requestGet } from './api/requestGet';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { requestDelete } from './api/requestDelete';
import { useCallback, useEffect, useState } from 'react';
import Table from './Table/Index';
import SearchBasic from '../../../../components/searchs/SearchBasic';
import BreadcrumbsDefault from '../../../../components/breadcrumbs/BreadcrumbsDefault';
import ButtonIconTextLeft from '../../../../components/buttons/icon/ButtonIconTextLeft';

const Index = () => {
  const dispatch = useDispatch();
  const [rakBuku, setRakBuku] = useState([]);
  const [initialRecords, setInitialRecords] = useState(rakBuku);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Rak Buku'));

    requestGet().then((rakBukuData) => {
      setRakBuku(rakBukuData);
      setInitialRecords(rakBukuData);
    });
  }, [dispatch]);

  const debounceSearch = useCallback(
    debounce((searchQuery) => {
      const filteredData = (initialRecords as any[]).filter((item) => item.nama_rak_buku.toLowerCase().includes(searchQuery.toLowerCase()));
      setInitialRecords(filteredData as never[]);
    }, 500),
    [rakBuku]
  );

  const handleSearch = (e: any) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    debounceSearch(searchQuery);
  };

  const handleDelete = async (id_rak_buku: string) => {
    const isDeleted = await requestDelete(id_rak_buku);
    if (isDeleted) {
      requestGet().then((rakBukuData) => {
        setRakBuku(rakBukuData);
        setInitialRecords(rakBukuData);
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
              label: 'Rak Buku',
              link: '/rak-buku',
              icon: 'bxs:book',
            },
          ]}
        />
      </div>

      <div className="flex justify-between gap-3 mt-10">
        <SearchBasic value={search} placeholder="Cari Rak Buku" onChange={handleSearch} width="w-1/2" />
        <div className="flex gap-3">
          <Link to={'/rak-buku/tambah-rak-buku'}>
            <ButtonIconTextLeft icon="ic:baseline-plus" text="Tambah Rak Buku" backgroundColor="btn-primary" />
          </Link>

          <ButtonIconTextLeft icon="material-symbols:refresh" text="Refresh Halaman" backgroundColor="btn-info" onClick={handleRefresh} />
        </div>
      </div>

      <div className="mt-5">
        <Table rakBuku={initialRecords} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default Index;
