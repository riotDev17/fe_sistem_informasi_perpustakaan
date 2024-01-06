import React, { useEffect, useState } from 'react';
import Columns from './_columns';
import TableSkinBordered from '../../../../components/tables/skin/TableSkinBordered';

interface TableProps {
  agama: any[];
  handleDelete: (id_agama: string) => void;
}

const Table: React.FC<TableProps> = ({ agama: initialAgama, handleDelete }) => {
  const PAGE_SIZES = [10, 25, 50, 100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(initialAgama);
  const [recordsData, setRecordsData] = useState(initialRecords);

  useEffect(() => {
    setInitialRecords(initialAgama);
    setRecordsData(initialAgama.slice(0, pageSize));
  }, [initialAgama, pageSize]);

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
        recordsPerPage={pageSize}
        totalRecords={initialAgama.length}
        onPageChange={(page: number) => setPage(page)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
        columns={Columns({ handleDelete })}
      />
    </>
  );
};

export default Table;
