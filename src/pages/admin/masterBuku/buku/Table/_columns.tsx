import { Link } from 'react-router-dom';
import IconPencil from '../../../../../components/Icons/IconPencil';
import IconTrash from '../../../../../components/Icons/IconTrash';
import TippyDefault from '../../../../../components/tippys/default/TippyDefault';

interface ColumnsProps {
  handleDelete: (id_buku: string) => void;
}

const Columns = ({ handleDelete }: ColumnsProps) => {
  return [
    {
      key: 'index',
      title: 'No',
      width: 60,
      accessor: 'index',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.index}>
            {item.index + 1}
          </span>
        </>
      ),
    },
    {
      key: 'judul_buku',
      title: 'Judul Buku',
      accessor: 'judul_buku',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.judul_buku}>
            {item.judul_buku}
          </span>
        </>
      ),
    },
    {
      key: 'pengarang',
      title: 'Pengarang',
      accessor: 'pengarang',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.pengarang}>
            {item.pengarang}
          </span>
        </>
      ),
    },
    {
      key: 'penerbit',
      title: 'Penerbit',
      accessor: 'penerbit',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.penerbit}>
            {item.penerbit}
          </span>
        </>
      ),
    },
    {
      key: 'tahun_terbit',
      title: 'Tahun Terbit',
      accessor: 'tahun_terbit',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.tahun_terbit}>
            {item.tahun_terbit}
          </span>
        </>
      ),
    },
    {
      key: 'stok_buku',
      title: 'Stok Buku',
      accessor: 'stok_buku',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.stok_buku}>
            {item.stok_buku}
          </span>
        </>
      ),
    },
    {
      key: 'deskripsi',
      title: 'Deskripsi Buku',
      accessor: 'deskripsi',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.deskripsi}>
            {item.deskripsi}
          </span>
        </>
      ),
    },
    {
      key: 'foto_buku',
      title: 'Foto Buku',
      accessor: 'deskrfoto_bukuipsi',
      render: (item: any) => (
        <>
          <img className="rounded-sm w-16 object-cover" src={`${import.meta.env.VITE_API_URL}/${item.foto_buku}`} alt="Foto Buku" />
        </>
      ),
    },
    {
      key: 'aksi',
      title: 'Aksi',
      accessor: 'aksi',
      render: (item: any) => (
        <>
          <div className="flex space-x-1 rtl:space-x-reverse gap-2">
            <Link to={`/buku/edit-buku/${item.id_buku}`}>
              <TippyDefault content="Edit">
                <IconPencil />
              </TippyDefault>
            </Link>
            <button onClick={() => handleDelete(item.id_buku)}>
              <TippyDefault content="Hapus">
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
