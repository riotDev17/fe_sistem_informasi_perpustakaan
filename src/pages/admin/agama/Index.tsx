import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useCallback, useEffect, useMemo, useState } from 'react';
import API from '../../../configs/api';
import SearchBasic from '../../../components/searchs/SearchBasic';
import TableSkinBordered from '../../../components/tables/skin/TableSkinBordered';
import ButtonIconTextLeft from '../../../components/buttons/icon/ButtonIconTextLeft';
import BreadcrumbsDefault from '../../../components/breadcrumbs/BreadcrumbsDefault';
import ButtonOutlineDanger from '../../../components/buttons/outline/ButtonOutlineDanger';
import ButtonOutlineSuccess from '../../../components/buttons/outline/ButtonOutlineSuccess';

const Index = () => {
  const dispatch = useDispatch();
  const PAGE_SIZES = [10, 25, 50, 100];
  const [agama, setAgama] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(agama);
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [search, setSearch] = useState('');

  const columns = [
    {
      key: 'id_agama',
      title: 'No',
      width: 100,
      accessor: 'id_agama',
      render: (item: any) => <span className="dark:text-white">{item.index + 1}</span>,
    },
    {
      key: 'nama_agama',
      title: 'Nama Agama',
      width: 1000,
      accessor: 'nama_agama',
      render: (item: any) => <span className="dark:text-white">{item.nama_agama}</span>,
    },
    {
      title: 'Aksi',
      accessor: 'aksi',
      render: () => (
        <>
          <div className="flex gap-4">
            <ButtonOutlineSuccess text="Edit" />
            <ButtonOutlineDanger text="Hapus" />
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(setPageTitle('Admin | Agama'));
  });

  // GET API
  useEffect(() => {
    const getAgama = async () => {
      try {
        const response = await API.get('/api/agama');
        const agama = response.data.data.map((item: any, index: any) => ({ ...item, index }));
        setAgama(agama);
        setInitialRecords(agama);
      } catch (error) {
        console.log(error);
      }
    };

    getAgama();
  }, []);

  // Initial Records
  // useEffect(() => {
  //   setInitialRecords(agama);
  //   setRecordsData(agama.slice(0, pageSize));
  // }, [agama, pageSize]);

  // Pagination
  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  // Search
  const debounceSearch = useCallback(
    debounce((searchQuery) => {
      const filteredData = (agama as any[]).filter((item) => item.nama_agama.toLowerCase().includes(searchQuery.toLowerCase()));
      setInitialRecords(filteredData as never[]);
      setPage(1);
    }, 500),
    [agama]
  );

  // Handle Search
  const handleSearchChange = (e: any) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    debounceSearch(searchQuery);
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
        <TableSkinBordered
          page={page}
          columns={columns}
          records={recordsData}
          recordsPerPage={pageSize}
          totalRecords={agama.length}
          onPageChange={(page: number) => setPage(page)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
        />
      </div>
    </>
  );
};

export default Index;
