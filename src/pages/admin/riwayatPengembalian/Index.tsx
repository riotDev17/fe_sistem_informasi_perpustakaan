import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { request } from 'http';
import { requestGet } from './api/requestGet';
import { debounce } from 'lodash';
import BreadcrumbsDefault from '../../../components/breadcrumbs/BreadcrumbsDefault';
import SearchBasic from '../../../components/searchs/SearchBasic';
import TippyDefault from '../../../components/tippys/default/TippyDefault';
import ButtonIcon from '../../../components/buttons/icon/ButtonIcon';
import Table from './Table/Index';

const Index = () => {
  const dispatch = useDispatch();
  const [riwayat, setRiwayat] = useState([]);
  const [initialRecords, setInitialRecords] = useState(riwayat);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Riwayat Pengembalian Buku'));

    requestGet().then((riwayatData) => {
      setRiwayat(riwayatData);
      setInitialRecords(riwayatData);
    });
  }, [dispatch]);

  const debounceSearch = useCallback(
    debounce((searchQuery) => {
      const filteredData = initialRecords.filter((item: any) => {
        const noAnggota = String(item?.siswa?.no_anggota || '').toLowerCase();
        const namaSiswa = String(item?.siswa?.nama_siswa || '').toLowerCase();
        const searchLower = searchQuery.toLowerCase();

        return noAnggota.includes(searchLower) || namaSiswa.includes(searchLower);
      });
      setInitialRecords(filteredData as never[]);
    }, 500),
    [riwayat]
  );

  const handleSearch = (e: any) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    debounceSearch(searchQuery);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Riwayat Pengembalian Buku"
        menus={[
          {
            label: 'Riwayat Peminjaman Buku',
            link: '/riwayat-peminjaman-buku',
            icon: 'material-symbols:book',
          },
        ]}
      />

      <div className="flex justify-between items-center mt-10">
        <SearchBasic value={search} placeholder="Cari No Anggota Atau Nama Siswa" onChange={handleSearch} width="w-1/2" />

        <TippyDefault content="Refresh Halaman">
          <ButtonIcon icon="material-symbols:refresh" backgroundColor="btn-info" onClick={handleRefresh} />
        </TippyDefault>
      </div>

      <div className="mt-5">
        <Table riwayat={initialRecords} />
      </div>
    </>
  );
};

export default Index;
