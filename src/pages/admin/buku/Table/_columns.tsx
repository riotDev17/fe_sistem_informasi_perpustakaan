import { Link } from 'react-router-dom';
import IconTrash from '../../../../components/Icons/IconTrash';
import IconPencil from '../../../../components/Icons/IconPencil';
import TippyDefault from '../../../../components/tippys/default/TippyDefault';
import BadgeBasicInfo from '../../../../components/badges/basic/BadgeBasicInfo';
import BadgeBasicDanger from '../../../../components/badges/basic/BadgeBasicDanger';

interface ColumnsProps {
  handleDelete: (id_buku: string) => void;
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
      id: 'judul_buku',
      key: 'judul_buku',
      title: 'Judul Buku',
      accessor: 'judul_buku',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.judul_buku}</span>
        </>
      ),
    },
    {
      id: 'pengarang',
      key: 'pengarang',
      title: 'Pengarang',
      accessor: 'pengarang',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.pengarang}</span>
        </>
      ),
    },
    {
      id: 'penerbit',
      key: 'penerbit',
      title: 'Penerbit',
      accessor: 'penerbit',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.penerbit}</span>
        </>
      ),
    },
    {
      id: 'tahun_terbit',
      key: 'tahun_terbit',
      title: 'Tahun Terbit',
      accessor: 'tahun_terbit',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.tahun_terbit}</span>
        </>
      ),
    },
    {
      id: 'stok_buku',
      key: 'stok_buku',
      title: 'Stok Buku',
      accessor: 'stok_buku',
      render: (item: any) => <>{item.stok_buku < 1 ? <BadgeBasicDanger label={`Stok Buku ${item.stok_buku}`} /> : <BadgeBasicInfo label={`Stok Buku ${item.stok_buku}`} />}</>,
    },
    {
      id: 'deskripsi',
      key: 'deskripsi',
      title: 'Deskripsi Buku',
      accessor: 'deskripsi',
      render: (item: any) => {
        const maxWords = 5;
        const words = item.deskripsi.split(' ');
        const truncatedDescription = words.slice(0, maxWords).join(' ');

        return (
          <>
            <span className="dark:text-white">{truncatedDescription}</span>
            {words.length > maxWords && '...'}
          </>
        );
      },
    },
    {
      id: 'rak_buku',
      key: 'rak_buku',
      title: 'Rak Buku',
      accessor: 'rak_buku',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.rak_buku?.nama_rak_buku}</span>
        </>
      ),
    },
    {
      id: 'foto_buku',
      key: 'foto_buku',
      title: 'Foto Buku',
      accessor: 'deskrfoto_bukuipsi',
      render: (item: any) => (
        <>
          <img className="rounded-sm w-20 object-cover" src={`${import.meta.env.VITE_API_URL}/${item.foto_buku}`} alt="Foto Buku" />
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
