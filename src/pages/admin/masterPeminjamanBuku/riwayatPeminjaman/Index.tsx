import { useCallback, useEffect, useState } from 'react';
import BreadcrumbsDefault from '../../../../components/breadcrumbs/BreadcrumbsDefault';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { requestGet } from '../api/requestGet';
import { debounce } from 'lodash';
import SearchBasic from '../../../../components/searchs/SearchBasic';
import TippyDefault from '../../../../components/tippys/default/TippyDefault';
import ButtonIcon from '../../../../components/buttons/icon/ButtonIcon';
import Table from './Table/Index';
import { requestPengembalianBuku } from '../api/requestPengembalianBuku';

const Index = () => {
  const dispatch = useDispatch();
  const [peminjaman, setPeminjaman] = useState([]);
  const [initialRecords, setInitialRecords] = useState(peminjaman);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Riwayat Peminjaman'));

    requestGet().then((peminjamanData) => {
      setPeminjaman(peminjamanData);
      setInitialRecords(peminjamanData);
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
    [peminjaman]
  );

  const handleSearch = (e: any) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    debounceSearch(searchQuery);
  };

  const handlePengembalianBuku = async (id_peminjaman: string) => {
    const isDeleted = await requestPengembalianBuku(id_peminjaman);
    if (isDeleted) {
      requestGet().then((peminjamanData) => {
        setPeminjaman(peminjamanData);
        setInitialRecords(peminjamanData);
      });
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Riwayat Peminjaman Buku"
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
        <Table peminjaman={initialRecords} handlePengembalianBuku={handlePengembalianBuku} />
      </div>
    </>
  );
};

export default Index;
