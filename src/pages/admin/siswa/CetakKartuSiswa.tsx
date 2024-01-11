import { useParams } from 'react-router-dom';
import { requestGetByID } from './api/requestGetByID';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useRef, useState } from 'react';
import Barcode from 'react-barcode';
import FormatTanggal from '../../../helpers/FormatTanggal';
import BreadcrumbsDefault from '../../../components/breadcrumbs/BreadcrumbsDefault';
import ButtonIconTextLeft from '../../../components/buttons/icon/ButtonIconTextLeft';

const CetakKartuSiswa = () => {
  const { id_siswa } = useParams();
  const componentPDF = useRef(null);
  const [siswa, setSiswa] = useState<any>();

  useEffect(() => {
    requestGetByID(id_siswa ?? '').then((response) => {
      setSiswa(response?.data);
    });
  }, []);

  const handleCetakKartu = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: `Kartu Perpustakaan ${siswa?.nama_siswa}`,
  });

  return (
    <>
      <BreadcrumbsDefault
        header="Siswa"
        menus={[
          {
            label: 'Siswa',
            link: '/siswa',
            icon: 'ph:student-fill',
          },
          {
            label: 'Cetak kartu Siswa',
            link: `/siswa/cetak-kartu-siswa/:${id_siswa}`,
          },
        ]}
      />

      <div className="mt-5">
        <ButtonIconTextLeft onClick={handleCetakKartu} backgroundColor="btn-success" icon="mdi:printer" text="Cetak Kartu " />
      </div>

      <div className="mb-5 flex items-center justify-start mt-5">
        <div className="w-full bg-white  rounded border border-dark-light  dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
          <div ref={componentPDF}>
            <div className="mb-2 bg-primary p-10 text-center text-white">
              <h1 className="font-black text-5xl ">Kartu Anggota Perpustakaan</h1>
              <p className="mt-3 text-lg font-medium">Jl. Surya Suci No 130, Pontianak Selatan ,Kalimantan Barat , Indonesia</p>
            </div>

            <div className="data-siswa">
              <h1 className="text-3xl text-center mt-6 font-black text-dark mb-2">DATA SISWA</h1>
              <div className="p-10 flex flex-col sm:flex-row">
                <div className="w-64">
                  <img className="rounded-sm h-auto object-cover" src={`${import.meta.env.VITE_API_URL}/${siswa?.foto_siswa}`} alt="Foto siswa" />
                </div>

                <div className="flex-1 ltr:sm:pl-10 rtl:sm:pr-10 text-center sm:text-left">
                  <table className="max-w-auto">
                    <tbody>
                      <tr className="border-0">
                        <td className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light border border-none">
                          <strong>Nama</strong>
                        </td>
                        <td className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light ">: {siswa?.nama_siswa}</td>
                      </tr>
                      <tr className="border-0">
                        <td className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">
                          <strong>Kelas</strong>
                        </td>
                        <td className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">: {siswa?.kelas?.nama_kelas}</td>
                      </tr>
                      <tr className="border-0">
                        <td className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">
                          <strong>NIS / NISN</strong>
                        </td>
                        <td className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">
                          : {siswa?.nis} / {siswa?.nisn}
                        </td>
                      </tr>
                      <tr className="border-0">
                        <td className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">
                          <strong>Tempat, Tangal Lahir</strong>
                        </td>
                        <td className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">
                          : {siswa?.tempat_lahir} , {FormatTanggal(siswa?.tanggal_lahir)}
                        </td>
                      </tr>
                      <tr className="border-0">
                        <td className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">
                          <strong>Jenis Kelamin</strong>
                        </td>
                        <td className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">: {siswa?.jenis_kelamin}</td>
                      </tr>
                      <tr className="border-0">
                        <td className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">
                          <strong>Agama</strong>
                        </td>
                        <td className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">: {siswa?.agama?.nama_agama}</td>
                      </tr>
                      <tr className="border-0">
                        <td className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">
                          <strong>Alamat</strong>
                        </td>
                        <td className="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">: {siswa?.alamat}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-center py-5">
                <Barcode value={siswa?.no_anggota} width={5} height={60} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CetakKartuSiswa;
