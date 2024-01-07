import { Link } from 'react-router-dom';
import IconPencil from '../../../../components/Icons/IconPencil';
import IconTrash from '../../../../components/Icons/IconTrash';
import TippyDefault from '../../../../components/tippys/default/TippyDefault';
import FormatUang from '../../../../helpers/FormatUang';

interface ColumnsProps {
  handleDelete: (id_denda: string) => void;
}

const Columns = ({ handleDelete }: ColumnsProps) => {
  return [
    {
      key: 'id_denda',
      title: 'No',
      width: 60,
      accessor: 'id_denda',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.id_denda}>
            {item.index + 1}
          </span>
        </>
      ),
    },
    {
      key: 'nominal',
      title: 'Nominal Denda',
      width: 1000,
      accessor: 'nominal',
      render: (item: any) => (
        <>
          <span className="dark:text-white" key={item.nominal}>
            {FormatUang(item.nominal)}
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
          <div className="flex space-x-1 rtl:space-x-reverse gap-2" key={item.id_denda}>
            <Link to={`/denda/edit-denda/${item.id_denda}`}>
              <TippyDefault content="Edit">
                <IconPencil />
              </TippyDefault>
            </Link>
            <button onClick={() => handleDelete(item.id_denda)}>
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
