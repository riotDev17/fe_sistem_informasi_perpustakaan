import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { requestGetDenda } from './api/requestGetDenda';
import { requestDeleteDenda } from './api/requestDeleteDenda';
import { useCallback, useEffect, useState } from 'react';
import Table from './Table/Index';
import ButtonIcon from '../../../components/buttons/icon/ButtonIcon';
import SearchBasic from '../../../components/searchs/SearchBasic';
import TippyDefault from '../../../components/tippys/default/TippyDefault';
import BreadcrumbsDefault from '../../../components/breadcrumbs/BreadcrumbsDefault';

const Index = () => {
  const dispatch = useDispatch();
  const [denda, setDenda] = useState([]);
  const [initialRecords, setInitialRecords] = useState(denda);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Denda'));

    requestGetDenda().then((dendaData) => {
      setDenda(dendaData);
      setInitialRecords(dendaData);
    });
  }, [dispatch]);

  const debounceSearch = useCallback(
    debounce((searchQuery) => {
      const filteredData = initialRecords.filter((item: any) => String(item.nominal).includes(searchQuery));
      setInitialRecords(filteredData as never[]);
    }, 500),
    [denda]
  );

  const handleSearch = (e: any) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    debounceSearch(searchQuery);
  };

  const handleDelete = async (id_denda: string) => {
    const isDeleted = await requestDeleteDenda(id_denda);
    if (isDeleted) {
      requestGetDenda().then((dendaData) => {
        setDenda(dendaData);
        setInitialRecords(dendaData);
      });
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Denda"
        menus={[
          {
            label: 'Denda',
            link: '/denda',
            icon: 'mdi:dollar',
          },
        ]}
      />

      <div className="flex justify-between items-center mt-10">
        <SearchBasic value={search} placeholder="Cari Nominal Denda" onChange={handleSearch} width="w-1/2" />
        <div className="flex gap-3">
          <Link to={'/denda/tambah-denda'}>
            <TippyDefault content="Tambah Denda">
              <ButtonIcon icon="ic:baseline-plus" backgroundColor="btn-primary" />
            </TippyDefault>
          </Link>

          <TippyDefault content="Refresh Halaman">
            <ButtonIcon icon="material-symbols:refresh" backgroundColor="btn-info" onClick={handleRefresh} />
          </TippyDefault>
        </div>
      </div>

      <div className="mt-5">
        <Table denda={initialRecords} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default Index;
