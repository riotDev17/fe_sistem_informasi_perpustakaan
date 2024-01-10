import Swal from 'sweetalert2';
import API_FORM from '../../../../configs/API_FORM';

const URL = 'siswa';

export const requestCreate = async (
  nama_siswa: string,
  nis: number,
  nisn: number,
  tanggal_lahir: string,
  tempat_lahir: string,
  jenis_kelamin: string,
  id_agama: string,
  alamat: string,
  id_kelas: string,
  foto_siswa: string
) => {
  try {
    const data = { nama_siswa, nis, nisn, tanggal_lahir, tempat_lahir, jenis_kelamin, id_agama, alamat, id_kelas, foto_siswa };
    const response = await API_FORM.post(`/api/${URL}`, data);

    if (response.status === 200) {
      const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: 'success',
        title: `Siswa Berhasil Ditambahkan`,
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
      title: 'Siswa Gagal Ditambahkan!',
      padding: '10px 20px',
    });

    return false;
  }
};
