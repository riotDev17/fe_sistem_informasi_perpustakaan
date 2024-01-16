import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { requestGetPeminjamanBuku } from '../api/requestGetPeminjamanBuku';
import { requestDeletePeminjamanBuku } from '../api/requestDeletePeminjamanBuku';
import { requestUpdatePeminjamanBuku } from '../api/requestUpdatePeminjamanBuku';
import { useCallback, useEffect, useState } from 'react';
import Table from './Table/Index';
import ButtonIcon from '../../../../components/buttons/icon/ButtonIcon';
import SearchBasic from '../../../../components/searchs/SearchBasic';
import TippyDefault from '../../../../components/tippys/default/TippyDefault';
import BreadcrumbsDefault from '../../../../components/breadcrumbs/BreadcrumbsDefault';

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [peminjaman, setPeminjaman] = useState([]);
  const [initialRecords, setInitialRecords] = useState(peminjaman);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Riwayat Peminjaman'));

    requestGetPeminjamanBuku().then((peminjamanData) => {
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

  const handleDeletePeminjamanBuku = async (id_peminjaman: string) => {
    const isDeleted = await requestDeletePeminjamanBuku(id_peminjaman);
    if (isDeleted) {
      requestGetPeminjamanBuku().then((peminjamanData) => {
        setPeminjaman(peminjamanData);
        setInitialRecords(peminjamanData);
      });

      navigate('/riwayat-pengembalian');
    }
  };

  const handleUpdateRiwayat = async (id_peminjaman: string) => {
    const request = await requestUpdatePeminjamanBuku(id_peminjaman);
    if (request === true) {
      requestGetPeminjamanBuku().then((peminjamanData) => {
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

        <div className="flex gap-3">
          <TippyDefault content="Refresh Halaman">
            <ButtonIcon icon="material-symbols:refresh" backgroundColor="btn-info" onClick={handleRefresh} />
          </TippyDefault>
        </div>
      </div>

      <div className="mt-5">
        <Table peminjaman={initialRecords} handleDeletePeminjamanBuku={handleDeletePeminjamanBuku} handleUpdateRiwayat={handleUpdateRiwayat} />
      </div>
    </>
  );
};

export default Index;
