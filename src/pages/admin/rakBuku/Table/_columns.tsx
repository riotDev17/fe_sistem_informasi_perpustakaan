import { Link } from 'react-router-dom';
import IconTrash from '../../../../components/Icons/IconTrash';
import IconPencil from '../../../../components/Icons/IconPencil';
import TippyDefault from '../../../../components/tippys/default/TippyDefault';

interface ColumnsProps {
  handleDelete: (id_rak_buku: string) => void;
}

const Columns = ({ handleDelete }: ColumnsProps) => {
  return [
    {
      id: 'index',
      key: 'index',
      title: 'No',
      width: 60,
      accessor: 'index',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.index + 1}</span>
        </>
      ),
    },
    {
      id: 'nama_rak_buku',
      key: 'nama_rak_buku',
      title: 'Nama Rak Buku',
      width: 1000,
      accessor: 'nama_rak_buku',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.nama_rak_buku}</span>
        </>
      ),
    },
    {
      key: 'aksi',
      title: 'Aksi',
      width: 400,
      accessor: 'aksi',
      render: (item: any) => (
        <>
          <div className="flex space-x-1 rtl:space-x-reverse gap-2">
            <Link to={`/rak-buku/edit-rak-buku/${item.id_rak_buku}`}>
              <TippyDefault content="Edit">
                <IconPencil />
              </TippyDefault>
            </Link>
            <button onClick={() => handleDelete(item.id_rak_buku)}>
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
