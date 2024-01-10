import { Link } from 'react-router-dom';
import IconTrash from '../../../../components/Icons/IconTrash';
import IconPencil from '../../../../components/Icons/IconPencil';
import TippyDefault from '../../../../components/tippys/default/TippyDefault';
import IconPrinter from '../../../../components/Icons/IconPrinter';

interface ColumnsProps {
  handleDelete: (id_siswa: string) => void;
}

const Columns = ({ handleDelete }: ColumnsProps) => {
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
      id: 'nis',
      key: 'nis',
      title: 'NIS',
      accessor: 'nis',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.nis}</span>
        </>
      ),
    },
    {
      id: 'nisn',
      key: 'nisn',
      title: 'NISN',
      accessor: 'nisn',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.nisn}</span>
        </>
      ),
    },
    {
      id: 'tanggal_lahir',
      key: 'tanggal_lahir',
      title: 'Tanggal Lahir',
      accessor: 'tanggal_lahir',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.tanggal_lahir}</span>
        </>
      ),
    },
    {
      id: 'tempat_lahir',
      key: 'tempat_lahir',
      title: 'Tempat Lahir',
      accessor: 'tempat_lahir',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.tempat_lahir}</span>
        </>
      ),
    },
    {
      id: 'jenis_kelamin',
      key: 'jenis_kelamin',
      title: 'Jenis Kelamin',
      accessor: 'jenis_kelamin',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.jenis_kelamin}</span>
        </>
      ),
    },
    {
      id: 'agama',
      key: 'agama',
      title: 'Agama',
      accessor: 'agama',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.agama?.nama_agama}</span>
        </>
      ),
    },
    {
      id: 'kelas',
      key: 'kelas',
      title: 'Kelas',
      accessor: 'kelas',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.kelas?.nama_kelas}</span>
        </>
      ),
    },
    {
      id: 'alamat',
      key: 'alamat',
      title: 'Alamat',
      accessor: 'alamat',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.alamat}</span>
        </>
      ),
    },
    {
      id: 'foto_siswa',
      key: 'foto_siswa',
      title: 'Foto Siswa',
      accessor: 'foto_siswa',
      render: (item: any) => (
        <>
          <img className="rounded-sm w-20 object-cover" src={`${import.meta.env.VITE_API_URL}/${item.foto_siswa}`} alt="Foto siswa" />
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
            <button>
              <TippyDefault content="Cetak Kartu">
                <IconPrinter />
              </TippyDefault>
            </button>
            <Link to={`/siswa/edit-siswa/${item.id_siswa}`}>
              <TippyDefault content="Edit Data Siswa">
                <IconPencil />
              </TippyDefault>
            </Link>
            <button onClick={() => handleDelete(item.id_siswa)}>
              <TippyDefault content="Hapus Data Siswa">
                <IconTrash />
              </TippyDefault>
            </button>
          </div>
        </>
      ),
    },
  ];
};

export default Columns;
