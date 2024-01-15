import { debounce } from 'lodash';
import { requestGet } from '../../siswa/api/requestGetSiswa';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { useCallback, useEffect, useState } from 'react';
import ButtonIcon from '../../../../components/buttons/icon/ButtonIcon';
import SearchBasic from '../../../../components/searchs/SearchBasic';
import TippyDefault from '../../../../components/tippys/default/TippyDefault';
import BreadcrumbsDefault from '../../../../components/breadcrumbs/BreadcrumbsDefault';
import Table from './Table/Index';

const Index = () => {
  const dispatch = useDispatch();
  const [siswa, setSiswa] = useState([]);
  const [initialRecords, setInitialRecords] = useState(siswa);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Peminjaman Buku'));

    requestGet().then((siswaData) => {
      setSiswa(siswaData);
      setInitialRecords(siswaData);
    });
  }, [dispatch]);

  const debounceSearch = useCallback(
    debounce((searchQuery) => {
      const filteredData = initialRecords.filter((item: any) => {
        const noAnggota = String(item?.no_anggota || '').toLowerCase();
        const namaSiswa = String(item?.nama_siswa || '').toLowerCase();
        const searchLower = searchQuery.toLowerCase();

        return noAnggota.includes(searchLower) || namaSiswa.includes(searchLower);
      });
      setInitialRecords(filteredData as never[]);
    }, 500),
    [siswa]
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
        header="Peminjaman Buku"
        menus={[
          {
            label: 'Peminjaman Buku',
            link: '/peminjaman-buku',
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
        <Table siswa={initialRecords} />
      </div>
    </>
  );
};

export default Index;
