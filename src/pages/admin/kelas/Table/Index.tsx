import { useEffect, useState } from 'react';
import TableSkinBordered from '../../../../components/tables/skin/TableSkinBordered';
import Columns from './_columns';

interface TableProps {
  kelas: any[];
  handleDelete: (id_agama: string) => void;
}

const Table: React.FC<TableProps> = ({ kelas, handleDelete }) => {
  const PAGE_SIZES = [10, 25, 50, 100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(kelas);
  const [recordsData, setRecordsData] = useState(initialRecords);

  useEffect(() => {
    setInitialRecords(kelas);
    setRecordsData(kelas.slice(0, pageSize));
  }, [kelas, pageSize]);

  // Pagination
  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  return (
    <>
      <TableSkinBordered
        page={page}
        records={recordsData}
        columns={Columns({ handleDelete })}
        recordsPerPage={pageSize}
        totalRecords={kelas.length}
        onPageChange={(page: number) => setPage(page)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
      />
    </>
  );
};

export default Table;
