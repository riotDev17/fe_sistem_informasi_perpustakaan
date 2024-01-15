import React, { useEffect, useState } from 'react';
import Columns from './_columns';
import TableSkinBordered from '../../../../../components/tables/skin/TableSkinBordered';

interface TableProps {
  peminjaman: any[];
  handleDeletePeminjamanBuku: (id_peminjaman: string) => void;
  handleUpdateRiwayat: (id_peminjaman: string) => void;
}

const Table: React.FC<TableProps> = ({ peminjaman, handleDeletePeminjamanBuku, handleUpdateRiwayat }) => {
  const PAGE_SIZES = [5, 15, 25, 50, 100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(peminjaman);
  const [recordsData, setRecordsData] = useState(initialRecords);

  useEffect(() => {
    setInitialRecords(peminjaman);
    setRecordsData(peminjaman.slice(0, pageSize));
  }, [peminjaman, pageSize]);

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
        columns={Columns({ handleDeletePeminjamanBuku, handleUpdateRiwayat })}
        recordsPerPage={pageSize}
        totalRecords={peminjaman.length}
        onPageChange={(page: number) => setPage(page)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
      />
    </>
  );
};

export default Table;
