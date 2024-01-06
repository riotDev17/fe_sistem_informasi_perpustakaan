import { Link } from 'react-router-dom';
import ButtonOutlineDanger from '../../../../components/buttons/outline/ButtonOutlineDanger';
import ButtonOutlineSuccess from '../../../../components/buttons/outline/ButtonOutlineSuccess';

interface ColumnsProps {
  handleDelete: (id_agama: string) => void;
}

const Columns = ({ handleDelete }: ColumnsProps) => {
  return [
    {
      key: 'id_agama',
      title: 'No',
      width: 100,
      accessor: 'id_agama',
      render: (item: any) => <span className="dark:text-white">{item.index + 1}</span>,
    },
    {
      key: 'nama_agama',
      title: 'Nama Agama',
      width: 1000,
      accessor: 'nama_agama',
      render: (item: any) => <span className="dark:text-white">{item.nama_agama}</span>,
    },
    {
      title: 'Aksi',
      accessor: 'aksi',
      render: (item: any) => (
        <>
          <div className="flex gap-4">
            <Link to={`/agama/edit-agama/${item.id_agama}`}>
              <ButtonOutlineSuccess text="Edit" />
            </Link>
            <ButtonOutlineDanger text="Hapus" onClick={() => handleDelete(item.id_agama)} />
          </div>
        </>
      ),
    },
  ];
};

export default Columns;
