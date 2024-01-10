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
  const [siswa, setSiswa] = useState([]);
  const [initialRecords, setInitialRecords] = useState(siswa);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Siswa'));

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

  const handleDelete = async (id_siswa: string) => {
    const isDeleted = await requestDelete(id_siswa);
    if (isDeleted) {
      requestGet().then((siswaData) => {
        setSiswa(siswaData);
        setInitialRecords(siswaData);
      });
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Siswa"
        menus={[
          {
            label: 'Siswa',
            link: '/siswa',
            icon: 'ph:student-fill',
          },
        ]}
      />

      <div className="flex justify-between items-center mt-10">
        <SearchBasic value={search} placeholder="Cari No Anggota Atau Nama Siswa" onChange={handleSearch} width="w-1/2" />
        <div className="flex gap-3">
          <Link to={'/siswa/tambah-siswa'}>
            <TippyDefault content="Tambah Siswa">
              <ButtonIcon icon="ic:baseline-plus" backgroundColor="btn-primary" />
            </TippyDefault>
          </Link>
          <TippyDefault content="Refresh Halaman">
            <ButtonIcon icon="material-symbols:refresh" backgroundColor="btn-info" onClick={handleRefresh} />
          </TippyDefault>
        </div>
      </div>

      <div className="mt-5">
        <Table siswa={initialRecords} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default Index;
