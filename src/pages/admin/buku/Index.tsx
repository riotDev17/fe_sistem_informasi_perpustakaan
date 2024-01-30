import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { requestGetBuku } from './api/requestGetBuku';
import { requestDeleteBuku } from './api/requestDeleteBuku';
import { useCallback, useEffect, useState } from 'react';
import Table from './Table/Index';
import ButtonIcon from '../../../components/buttons/icon/ButtonIcon';
import SearchBasic from '../../../components/searchs/SearchBasic';
import TippyDefault from '../../../components/tippys/default/TippyDefault';
import BreadcrumbsDefault from '../../../components/breadcrumbs/BreadcrumbsDefault';

const Index = () => {
  const dispatch = useDispatch();
  const [buku, setBuku] = useState([]);
  const [initialRecords, setInitialRecords] = useState(buku);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Buku'));

    requestGetBuku().then((bukuData) => {
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
    const isDeleted = await requestDeleteBuku(id_buku);
    if (isDeleted) {
      requestGetBuku().then((bukuData) => {
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
            <TippyDefault content="Tambah Buku">
              <ButtonIcon icon="ic:baseline-plus" backgroundColor="btn-primary" />
            </TippyDefault>
          </Link>
          <TippyDefault content="Refresh Halaman">
            <ButtonIcon icon="material-symbols:refresh" backgroundColor="btn-info" onClick={handleRefresh} />
          </TippyDefault>
        </div>
      </div>

      <div className="mt-5">
        <Table buku={initialRecords} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default Index;
