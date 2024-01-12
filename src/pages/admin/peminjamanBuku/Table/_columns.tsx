import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import TippyDefault from '../../../../components/tippys/default/TippyDefault';

const Columns = () => {
  return [
    {
      id: 'index',
      key: 'index',
      title: 'No',
      accessor: 'index',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.index + 1}</span>
        </>
      ),
    },
    {
      id: 'no_anggota',
      key: 'no_anggota',
      title: 'No Anggota',
      accessor: 'no_anggota',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.no_anggota}</span>
        </>
      ),
    },
    {
      id: 'nama_siswa',
      key: 'nama_siswa',
      title: 'Nama Siswa',
      accessor: 'nama_siswa',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.nama_siswa}</span>
        </>
      ),
    },
    {
      id: 'aksi',
      key: 'aksi',
      title: 'Aksi',
      accessor: 'aksi',
      render: (item: any) => (
        <>
          <div className="flex space-x-1 rtl:space-x-reverse gap-2">
            <Link to={`/peminjaman-buku/tambah-peminjaman-buku/${item.id_siswa}`}>
              <TippyDefault content="Peminjaman Buku">
                <Icon icon={'material-symbols:book'} width={20} />
              </TippyDefault>
            </Link>
          </div>
        </>
      ),
    },
  ];
};

export default Columns;
