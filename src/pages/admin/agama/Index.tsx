import { DELETE } from './api/DELETE';
import { debounce } from 'lodash';
import { GET } from './api/GET';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useCallback, useEffect, useState } from 'react';
import Table from './table/Index';
import SearchBasic from '../../../components/searchs/SearchBasic';
import ButtonIconTextLeft from '../../../components/buttons/icon/ButtonIconTextLeft';
import BreadcrumbsDefault from '../../../components/breadcrumbs/BreadcrumbsDefault';

const Index = () => {
  const dispatch = useDispatch();
  const [agama, setAgama] = useState([]);
  const [initialRecords, setInitialRecords] = useState(agama);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Agama'));

    // Panggil fungsi GET API AGAMA dan set state setelah mendapatkan data
    GET().then((agamaData) => {
      setAgama(agamaData);
      setInitialRecords(agamaData);
    });
  }, [dispatch]);

  // Search Debounce
  const debounceSearch = useCallback(
    debounce((searchQuery) => {
      const filteredData = (initialRecords as any[]).filter((item) => item.nama_agama.toLowerCase().includes(searchQuery.toLowerCase()));
      setInitialRecords(filteredData as never[]);
    }, 500),
    [agama]
  );

  // Handle Search
  const handleSearchChange = (e: any) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    debounceSearch(searchQuery);
  };

  const handleDelete = async (id_agama: string) => {
    const isDeleted = await DELETE(id_agama);
    if (isDeleted) {
      GET().then((agamaData) => {
        setAgama(agamaData);
        setInitialRecords(agamaData);
      });
    }
  };

  return (
    <>
      <BreadcrumbsDefault
        menus={[
          {
            label: 'Agama',
            link: '/agama',
            icon: 'mdi:religion-christian',
          },
        ]}
      />
      <div className="flex justify-end gap-3">
        <ButtonIconTextLeft icon="ic:baseline-plus" text="Tambah Agama" backgroundColor="btn-primary" />
        <SearchBasic value={search} placeholder="Cari agama" onChange={handleSearchChange} />
      </div>

      <div className="mt-5">
        <Table agama={initialRecords} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default Index;
