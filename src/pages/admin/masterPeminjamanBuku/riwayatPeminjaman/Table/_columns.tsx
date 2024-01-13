import IconRestore from '../../../../../components/Icons/IconRestore';
import TippyDefault from '../../../../../components/tippys/default/TippyDefault';
import FormatTanggal from '../../../../../helpers/FormatTanggal';
import BadgeBasicPrimary from '../../../../../components/badges/basic/BadgesBasicPrimary';
import BadgeBasicDanger from '../../../../../components/badges/basic/BadgeBasicDanger';
import BadgeBasicSuccess from '../../../../../components/badges/basic/BadgeBasicSuccess';

interface ColumnsProps {
  handlePengembalianBuku: (id_peminjaman: string) => void;
}

const Columns = ({ handlePengembalianBuku }: ColumnsProps) => {
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
          <span className="dark:text-white">{item.siswa?.no_anggota}</span>
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
          <span className="dark:text-white">{item.siswa?.nama_siswa}</span>
        </>
      ),
    },
    {
      id: 'judul_buku',
      key: 'judul_buku',
      title: 'Buku Yang Dipinjam',
      accessor: 'judul_buku',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{item.buku?.judul_buku}</span>
        </>
      ),
    },
    {
      id: 'tanggal_pinjam',
      key: 'tanggal_pinjam',
      title: 'Tanggal Pinjam',
      accessor: 'tanggal_pinjam',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{FormatTanggal(item.tanggal_pinjam)}</span>
        </>
      ),
    },
    {
      id: 'tanggal_kembali',
      key: 'tanggal_kembali',
      title: 'Tanggal Kembali',
      accessor: 'tanggal_kembali',
      render: (item: any) => (
        <>
          <span className="dark:text-white">{FormatTanggal(item.tanggal_kembali)}</span>
        </>
      ),
    },
    {
      id: 'keterlambatan',
      key: 'keterlambatan',
      title: 'Keterlambatan',
      accessor: 'keterlambatan',
      render: (item: any) => {
        const tanggalKembali = new Date(item.tanggal_kembali);
        const keterlambatan = new Date(item.keterlambatan);

        // Menghitung selisih hari
        const selisihHari = Math.ceil((keterlambatan.getTime() - tanggalKembali.getTime()) / (1000 * 60 * 60 * 24));

        // Mengecek apakah terlambat
        const isTerlambat = selisihHari > 0;

        return <>{isTerlambat ? <BadgeBasicDanger label={`Terlambat ${selisihHari} hari`} /> : <span>-</span>}</>;
      },
    },
    {
      id: 'status',
      key: 'status',
      title: 'Status',
      accessor: 'status',
      render: (item: any) => <>{item.status === 'Pinjam' ? <BadgeBasicSuccess label={item.status} /> : <BadgeBasicDanger label={item.status} />}</>,
    },
    {
      id: 'aksi',
      key: 'aksi',
      title: 'Aksi',
      accessor: 'aksi',
      render: (item: any) => (
        <>
          <div className="flex space-x-1 rtl:space-x-reverse gap-2">
            <button onClick={() => handlePengembalianBuku(item.id_peminjaman)}>
              <TippyDefault content="Kembalikan Buku">
                <IconRestore />
              </TippyDefault>
            </button>
          </div>
        </>
      ),
    },
  ];
};

export default Columns;
