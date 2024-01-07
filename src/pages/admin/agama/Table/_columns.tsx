import { Link } from 'react-router-dom';
import ButtonOutlineDanger from '../../../../components/buttons/outline/ButtonOutlineDanger';
import ButtonOutlineSuccess from '../../../../components/buttons/outline/ButtonOutlineSuccess';
import IconPencil from '../../../../components/Icons/IconPencil';
import IconTrash from '../../../../components/Icons/IconTrash';
import TippyDefault from '../../../../components/tippys/default/TippyDefault';

interface ColumnsProps {
  handleDelete: (id_agama: string) => void;
}

const Columns = ({ handleDelete }: ColumnsProps) => {
  return [
    {
      key: 'id_agama',
      title: 'No',
      width: 60,
      accessor: 'id_agama',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.id_agama}>
            {item.index + 1}
          </span>
        </>
      ),
    },
    {
      key: 'nama_agama',
      title: 'Nama Agama',
      width: 1000,
      accessor: 'nama_agama',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.nama_agama}>
            {item.nama_agama}
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
          <div className="flex space-x-1 rtl:space-x-reverse gap-2" key={item.id_agama}>
            <Link to={`/agama/edit-agama/${item.id_agama}`}>
              <TippyDefault content="Edit">
                <IconPencil />
              </TippyDefault>
            </Link>
            <button onClick={() => handleDelete(item.id_agama)}>
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
