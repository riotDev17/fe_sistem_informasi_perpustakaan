import React, { useEffect, useState } from 'react';
import Columns from './_columns';
import TableSkinBordered from '../../../../components/tables/skin/TableSkinBordered';

interface TableProps {
  riwayat: any[];
}

const Table: React.FC<TableProps> = ({ riwayat }) => {
  const PAGE_SIZES = [10, 15, 25, 50, 100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(riwayat);
  const [recordsData, setRecordsData] = useState(initialRecords);

  useEffect(() => {
    setInitialRecords(riwayat);
    setRecordsData(riwayat.slice(0, pageSize));
  }, [riwayat, pageSize]);

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
        columns={Columns()}
        recordsPerPage={pageSize}
        totalRecords={riwayat.length}
        onPageChange={(page: number) => setPage(page)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
      />
    </>
  );
};

export default Table;
