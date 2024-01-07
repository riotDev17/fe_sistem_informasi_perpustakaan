import { Link } from 'react-router-dom';
import TippyDefault from '../../../../components/tippys/default/TippyDefault';
import IconPencil from '../../../../components/Icons/IconPencil';
import IconTrash from '../../../../components/Icons/IconTrash';

interface ColumnsProps {
  handleDelete: (id_agama: string) => void;
}

const Columns = ({ handleDelete }: ColumnsProps) => {
  return [
    {
      key: 'id_kelas',
      title: 'No',
      width: 60,
      accessor: 'id_kelas',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.id_kelas}>
            {item.index + 1}
          </span>
        </>
      ),
    },
    {
      key: 'nama_kelas',
      title: 'Nama Kelas',
      width: 1000,
      accessor: 'nama_kelas',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.nama_kelas}>
            {item.nama_kelas}
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
          <div className="flex space-x-1 rtl:space-x-reverse gap-2" key={item.id_kelas}>
            <Link to={`/kelas/edit-kelas/${item.id_kelas}`}>
              <TippyDefault content="Edit">
                <IconPencil />
              </TippyDefault>
            </Link>
            <button onClick={() => handleDelete(item.id_kelas)}>
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
