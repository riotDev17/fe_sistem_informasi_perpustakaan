import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useReactToPrint } from 'react-to-print';
import { downloadExcel } from 'react-export-table-to-excel';
import { requestGetRiwayatPengembalian } from './api/requestGetRiwayatPengembalian';
import { requestDeleteRiwayatPengembalian } from './api/requestDeleteRiwayatPengembalian';
import { useCallback, useEffect, useRef, useState } from 'react';
import Table from './Table/Index';
import ButtonIcon from '../../../components/buttons/icon/ButtonIcon';
import SearchBasic from '../../../components/searchs/SearchBasic';
import TippyDefault from '../../../components/tippys/default/TippyDefault';
import BreadcrumbsDefault from '../../../components/breadcrumbs/BreadcrumbsDefault';
import FormatTanggal from '../../../helpers/FormatTanggal';

const Index = () => {
  const dispatch = useDispatch();
  const componentPDF = useRef(null);
  const [riwayat, setRiwayat] = useState([]);
  const [initialRecords, setInitialRecords] = useState(riwayat);

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Riwayat Pengembalian Buku'));

    requestGetRiwayatPengembalian().then((riwayatData) => {
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

  const handleHapusRiwayat = () => {
    requestDeleteRiwayatPengembalian().then(() => {
      setRiwayat([]);
      setInitialRecords([]);
    });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const recordsRiwayat = () => {
    return initialRecords.map((item: any, index: any) => {
      return {
        index: index + 1,
        no_anggota: item?.siswa?.no_anggota,
        nama_siswa: item?.siswa?.nama_siswa,
        judul_buku: item?.buku?.judul_buku,
        tanggal_pinjam: FormatTanggal(item?.tanggal_pinjam),
        tanggal_kembali: FormatTanggal(item?.tanggal_kembali),
      };
    });
  };

  const handleCetakRiwayat = () => {
    downloadExcel({
      fileName: 'Riwayat Pengembalian Buku',
      sheet: 'react-export-table-to-excel',
      tablePayload: {
        header: ['No', 'No Anggota', 'Nama Siswa', 'Judul Buku', 'Tanggal Pinjam', 'Tanggal Kembali'],
        body: recordsRiwayat(),
      },
    });
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

        <div className="flex gap-3">
          <TippyDefault content="Hapus Semua Riwayat Pengembalian">
            <ButtonIcon icon="mdi:trash" backgroundColor="btn-danger" onClick={handleHapusRiwayat} />
          </TippyDefault>
          <TippyDefault content="Cetak Riwayat Pengembalian">
            <ButtonIcon icon="mdi:printer" backgroundColor="btn-success" onClick={handleCetakRiwayat} />
          </TippyDefault>
          <TippyDefault content="Refresh Halaman">
            <ButtonIcon icon="material-symbols:refresh" backgroundColor="btn-info" onClick={handleRefresh} />
          </TippyDefault>
        </div>
      </div>

      <div className="mt-5" ref={componentPDF}>
        <Table riwayat={initialRecords} />
      </div>
    </>
  );
};

export default Index;
