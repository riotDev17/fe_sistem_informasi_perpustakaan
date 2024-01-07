import React, { useEffect, useState } from 'react';
import Columns from './_columns';
import TableSkinBordered from '../../../../../components/tables/skin/TableSkinBordered';

interface TableProps {
  rakBuku: any[];
  handleDelete: (id_rak_buku: string) => void;
}

const Table: React.FC<TableProps> = ({ rakBuku, handleDelete }) => {
  const PAGE_SIZES = [10, 25, 50, 100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(rakBuku);
  const [recordsData, setRecordsData] = useState(initialRecords);

  useEffect(() => {
    setInitialRecords(rakBuku);
    setRecordsData(rakBuku.slice(0, pageSize));
  }, [rakBuku, pageSize]);

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
        totalRecords={rakBuku.length}
        onPageChange={(page: number) => setPage(page)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
      />
    </>
  );
};

export default Table;
