import Swal from 'sweetalert2';
import API_JSON from '../../../../configs/API_JSON';

const URL = 'siswa';

export const requestDelete = async (id_siswa: string) => {
  try {
    const alert = await Swal.fire({
      icon: 'warning',
      title: 'Apakah anda yakin?',
      text: 'Ingin menghapus siswa ini?',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      padding: '2em',
      customClass: 'sweet-alerts',
    });

    if (alert.isConfirmed) {
      try {
        await API_JSON.delete(`/api/${URL}/${id_siswa}`);
        const toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
        });
        toast.fire({
          icon: 'success',
          title: 'Siswa Berhasil Dihapus',
          padding: '10px 20px',
        });

        return true;
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
          title: 'Siswa Gagal Dihapus',
          padding: '10px 20px',
        });

        return false;
      }
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};
