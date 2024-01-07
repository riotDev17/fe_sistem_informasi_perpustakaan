import { Link } from 'react-router-dom';
import IconPencil from '../../../../../components/Icons/IconPencil';
import IconTrash from '../../../../../components/Icons/IconTrash';
import TippyDefault from '../../../../../components/tippys/default/TippyDefault';

interface ColumnsProps {
  handleDelete: (id_rak_buku: string) => void;
}

const Columns = ({ handleDelete }: ColumnsProps) => {
  return [
    {
      key: 'id_rak_buku',
      title: 'No',
      width: 60,
      accessor: 'id_rak_buku',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.id_rak_buku}>
            {item.index + 1}
          </span>
        </>
      ),
    },
    {
      key: 'nama_rak_buku',
      title: 'Nama Rak Buku',
      width: 1000,
      accessor: 'nama_rak_buku',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.nama_rak_buku}>
            {item.nama_rak_buku}
          </span>
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
          <div className="flex space-x-1 rtl:space-x-reverse gap-2" key={item.id_rak_buku}>
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
