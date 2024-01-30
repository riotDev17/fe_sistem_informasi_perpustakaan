import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { requestGetRakBuku } from './api/requestGetRakBuku';
import { requestDeleteRakBuku } from './api/requestDeleteRakBuku';
import { useCallback, useEffect, useState } from 'react';
import Table from './Table/Index';
import ButtonIcon from '../../../components/buttons/icon/ButtonIcon';
import SearchBasic from '../../../components/searchs/SearchBasic';
import TippyDefault from '../../../components/tippys/default/TippyDefault';
import BreadcrumbsDefault from '../../../components/breadcrumbs/BreadcrumbsDefault';

const Index = () => {
  const dispatch = useDispatch();
  const [rakBuku, setRakBuku] = useState([]);
  const [initialRecords, setInitialRecords] = useState(rakBuku);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Rak Buku'));

    requestGetRakBuku().then((rakBukuData) => {
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
    const isDeleted = await requestDeleteRakBuku(id_rak_buku);
    if (isDeleted) {
      requestGetRakBuku().then((rakBukuData) => {
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
      <BreadcrumbsDefault
        header="Rak Buku"
        menus={[
          {
            label: 'Rak Buku',
            link: '/rak-buku',
            icon: 'mdi:bookshelf',
          },
        ]}
      />

      <div className="flex justify-between items-center mt-10">
        <SearchBasic value={search} placeholder="Cari Rak Buku" onChange={handleSearch} width="w-1/2" />
        <div className="flex gap-3">
          <Link to={'/rak-buku/tambah-rak-buku'}>
            <TippyDefault content="Tambah Rak Buku">
              <ButtonIcon icon="ic:baseline-plus" backgroundColor="btn-primary" />
            </TippyDefault>
          </Link>

          <TippyDefault content="Refresh Halaman">
            <ButtonIcon icon="material-symbols:refresh" backgroundColor="btn-info" onClick={handleRefresh} />
          </TippyDefault>
        </div>
      </div>

      <div className="mt-5">
        <Table rakBuku={initialRecords} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default Index;
