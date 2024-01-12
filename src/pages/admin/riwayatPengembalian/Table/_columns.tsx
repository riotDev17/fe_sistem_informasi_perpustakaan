import IconRestore from '../../../../components/Icons/IconRestore';
import TippyDefault from '../../../../components/tippys/default/TippyDefault';
import FormatTanggal from '../../../../helpers/FormatTanggal';
import BadgeBasicSuccess from '../../../../components/badges/basic/BadgeBasicSuccess';

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
          <span className="dark:text-white">{item.siswa?.no_anggota}</span>
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
          <span className="dark:text-white">{item.siswa?.nama_siswa}</span>
        </>
      ),
    },
    {
      id: 'judul_buku',
      key: 'judul_buku',
      title: 'Buku Yang Dipinjam',
      accessor: 'judul_buku',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.buku?.judul_buku}</span>
        </>
      ),
    },
    {
      id: 'tanggal_kembali',
      key: 'tanggal_kembali',
      title: 'Tanggal Kembali',
      accessor: 'tanggal_kembali',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{FormatTanggal(item.tanggal_kembali)}</span>
        </>
      ),
    },
    {
      id: 'status',
      key: 'status',
      title: 'Status',
      accessor: 'status',
      render: (item: any) => (
        <>
          <BadgeBasicSuccess label={item.status} />
        </>
      ),
    },
  ];
};

export default Columns;
