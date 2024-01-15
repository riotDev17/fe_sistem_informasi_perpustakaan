import Swal from 'sweetalert2';
import API_FORM from '../../../../configs/API_FORM';

const URL = 'siswa';

export const requestUpdateSiswa = async (id_siswa: string, data: any) => {
  const { nama_siswa, nis, nisn, tanggal_lahir, tempat_lahir, jenis_kelamin, id_agama, alamat, id_kelas, foto_siswa } = data;

  try {
    const response = await API_FORM.put(`/api/${URL}/${id_siswa}`, {
      nama_siswa,
      nis,
      nisn,
      tanggal_lahir,
      tempat_lahir,
      jenis_kelamin,
      id_agama,
      alamat,
      id_kelas,
      foto_siswa,
    });

    if (response.status === 200) {
      const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: 'success',
        title: `Siswa Berhasil Diedit`,
        padding: '10px 20px',
      });

      return true;
    }
  } catch (error) {
    console.log(error);

    const toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
    });
    toast.fire({
      icon: 'error',
      title: 'Siswa Gagal Diedit!',
      padding: '10px 20px',
    });

    return false;
  }
};
