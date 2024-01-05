import { DataTable } from 'mantine-datatable';
import React from 'react';

interface TableSkinBorderedProps {
  page: number;
  onPageChange: (page: number) => void;
  recordsPerPageOptions: number[];
  recordsPerPage: number;
  onRecordsPerPageChange: (pageSize: number) => void;
  totalRecords: number;
  columns: any[];
  records: any[];
}

const TableSkinBordered: React.FC<TableSkinBorderedProps> = ({ page, onPageChange, recordsPerPageOptions, recordsPerPage, onRecordsPerPageChange, columns, records, totalRecords }) => {
  return (
    <>
      <div className="panel text-white">
        <div className="datatables text-white">
          <DataTable
            className="whitespace-nowrap table-bordered dark:text-white text-black"
            page={page}
            minHeight={200}
            records={records}
            columns={columns}
            totalRecords={totalRecords}
            onPageChange={onPageChange}
            recordsPerPage={recordsPerPage}
            recordsPerPageOptions={recordsPerPageOptions}
            onRecordsPerPageChange={onRecordsPerPageChange}
            noRecordsText="Tidak Ada Data"
            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
          />
        </div>
      </div>
    </>
  );
};

export default TableSkinBordered;
