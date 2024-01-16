import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { requestGetBuku } from '../masterBuku/buku/api/requestGetBuku';
import { requestGetSiswa } from '../siswa/api/requestGetSiswa';
import { requestGetKelas } from '../kelas/api/requestGetKelas';
import { useEffect, useState } from 'react';
import { requestGetPeminjamanBuku } from '../masterPeminjamanBuku/api/requestGetPeminjamanBuku';
import IconArrowLeft from '../../../components/Icons/IconArrowLeft';

const Index = () => {
  const dispatch = useDispatch();
  const [Kelas, setKelas] = useState([]);
  const [buku, setBuku] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const [peminjamanBuku, setPeminjamanBuku] = useState([]);

  useEffect(() => {
    dispatch(setPageTitle('Admin | Dashboard'));

    // Kelas
    requestGetKelas().then((res) => {
      setKelas(res);
    });

    // Buku
    requestGetBuku().then((res) => {
      setBuku(res);
    });

    // Siswa
    requestGetSiswa().then((res) => {
      setSiswa(res);
    });

    // Riwayat Peminjaman Buku
    requestGetPeminjamanBuku().then((res) => {
      setPeminjamanBuku(res);
    });
  }, [dispatch]);

  const totalKelas = Kelas.length;
  const totalSiswa = siswa.length;
  const totalBuku = buku.length;
  const totalPeminjamanBuku = peminjamanBuku.length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
        <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
          <div className="flex justify-between">
            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Kelas</div>
          </div>
          <div className="flex items-center mt-5">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{totalKelas} Kelas</div>
          </div>
          <div className="flex items-center font-semibold mt-5">
            <IconArrowLeft className="ltr:mr-2 rtl:ml-2 shrink-0" />
            Data Kelas
          </div>
        </div>

        {/*  Siswa */}
        <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
          <div className="flex justify-between">
            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Siswa</div>
          </div>
          <div className="flex items-center mt-5">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {totalSiswa} Siswa </div>
          </div>
          <div className="flex items-center font-semibold mt-5">
            <IconArrowLeft className="ltr:mr-2 rtl:ml-2 shrink-0" />
            Data Siswa
          </div>
        </div>

        {/* Buku */}
        <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
          <div className="flex justify-between">
            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Buku</div>
          </div>
          <div className="flex items-center mt-5">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {totalBuku} Buku </div>
          </div>
          <div className="flex items-center font-semibold mt-5">
            <IconArrowLeft className="ltr:mr-2 rtl:ml-2 shrink-0" />
            Data Buku
          </div>
        </div>

        {/* Peminjaman Buku */}
        <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
          <div className="flex justify-between">
            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Peminjaman Buku</div>
          </div>
          <div className="flex items-center mt-5">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {totalPeminjamanBuku} Peminjaman Buku</div>
          </div>
          <div className="flex items-center font-semibold mt-5">
            <IconArrowLeft className="ltr:mr-2 rtl:ml-2 shrink-0" />
            Data Peminjaman Buku
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
