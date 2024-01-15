import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconEye from '../../../components/Icons/IconEye';
import IconArrowLeft from '../../../components/Icons/IconArrowLeft';
import { requestGetKelas } from '../kelas/api/requestGetKelas';

const Index = () => {
  const dispatch = useDispatch();
  const [Kelas, setKelas] = useState([]);
  const [buku, setBuku] = useState([]);

  useEffect(() => {
    dispatch(setPageTitle('Admin | Dashboard'));

    // Kelas
    requestGetKelas().then((res) => {
      setKelas(res);
    });

    // Buku
  }, [dispatch]);

  const totalKelas = Kelas.length;

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

        {/* Sessions */}
        <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
          <div className="flex justify-between">
            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Sessions</div>
          </div>
          <div className="flex items-center mt-5">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 74,137 </div>
            <div className="badge bg-white/30">- 2.35% </div>
          </div>
          <div className="flex items-center font-semibold mt-5">
            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
            Last Week 84,709
          </div>
        </div>

        {/*  Time On-Site */}
        <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
          <div className="flex justify-between">
            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Time On-Site</div>
          </div>
          <div className="flex items-center mt-5">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 38,085 </div>
            <div className="badge bg-white/30">+ 1.35% </div>
          </div>
          <div className="flex items-center font-semibold mt-5">
            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
            Last Week 37,894
          </div>
        </div>

        {/* Bounce Rate */}
        <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
          <div className="flex justify-between">
            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Bounce Rate</div>
          </div>
          <div className="flex items-center mt-5">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 49.10% </div>
            <div className="badge bg-white/30">- 0.35% </div>
          </div>
          <div className="flex items-center font-semibold mt-5">
            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
            Last Week 50.01%
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
