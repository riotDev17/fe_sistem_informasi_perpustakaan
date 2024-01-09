import { requestGet } from './api/requestGet';
import { Link } from 'react-router-dom';
import { requestDelete } from './api/requestDelete';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useCallback, useEffect, useState } from 'react';
import Table from './Table/Index';
import SearchBasic from '../../../components/searchs/SearchBasic';
import ButtonIconTextLeft from '../../../components/buttons/icon/ButtonIconTextLeft';
import BreadcrumbsDefault from '../../../components/breadcrumbs/BreadcrumbsDefault';
import TippyDefault from '../../../components/tippys/default/TippyDefault';
import ButtonIcon from '../../../components/buttons/icon/ButtonIcon';

const Index = () => {
  const dispatch = useDispatch();
  const [agama, setAgama] = useState([]);
  const [initialRecords, setInitialRecords] = useState(agama);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Agama'));

    requestGet().then((agamaData) => {
      setAgama(agamaData);
      setInitialRecords(agamaData);
    });
  }, [dispatch]);

  const debounceSearch = useCallback(
    debounce((searchQuery) => {
      const filteredData = (initialRecords as any[]).filter((item) => item.nama_agama.toLowerCase().includes(searchQuery.toLowerCase()));
      setInitialRecords(filteredData as never[]);
    }, 500),
    [agama]
  );

  const handleSearch = (e: any) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    debounceSearch(searchQuery);
  };

  const handleDelete = async (id_agama: string) => {
    const isDeleted = await requestDelete(id_agama);
    if (isDeleted) {
      requestGet().then((agamaData) => {
        setAgama(agamaData);
        setInitialRecords(agamaData);
      });
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Agama"
        menus={[
          {
            label: 'Agama',
            link: '/agama',
            icon: 'mdi:religion-christian',
          },
        ]}
      />

      <div className="flex justify-between items-center mt-10">
        <SearchBasic value={search} placeholder="Cari agama" onChange={handleSearch} width="w-1/2" />
        <div className="flex gap-3">
          <Link to={'/agama/tambah-agama'}>
            <TippyDefault content="Tambah Agama">
              <ButtonIcon icon="ic:baseline-plus" backgroundColor="btn-primary" />
            </TippyDefault>
          </Link>

          <TippyDefault content="Refresh Halaman">
            <ButtonIcon icon="material-symbols:refresh" backgroundColor="btn-info" onClick={handleRefresh} />
          </TippyDefault>
        </div>
      </div>

      <div className="mt-5">
        <Table agama={initialRecords} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default Index;
