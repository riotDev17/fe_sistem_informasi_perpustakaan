import React, { useEffect, useState } from 'react';
import Columns from './_columns';
import TableSkinBordered from '../../../../components/tables/skin/TableSkinBordered';

interface TableProps {
  siswa: any[];
}

const Table: React.FC<TableProps> = ({ siswa }) => {
  const PAGE_SIZES = [5, 15, 25, 50, 100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(siswa);
  const [recordsData, setRecordsData] = useState(initialRecords);

  useEffect(() => {
    setInitialRecords(siswa);
    setRecordsData(siswa.slice(0, pageSize));
  }, [siswa, pageSize]);

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
        totalRecords={siswa.length}
        onPageChange={(page: number) => setPage(page)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
      />
    </>
  );
};

export default Table;
