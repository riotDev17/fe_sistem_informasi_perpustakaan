import ButtonOutlineDanger from '../../../../components/buttons/outline/ButtonOutlineDanger';
import ButtonOutlineSuccess from '../../../../components/buttons/outline/ButtonOutlineSuccess';

const Columns = () => {
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
      render: () => (
        <>
          <div className="flex gap-4">
            <ButtonOutlineSuccess text="Edit" />
            <ButtonOutlineDanger text="Hapus" />
          </div>
        </>
      ),
    },
  ];
};

export default Columns;
