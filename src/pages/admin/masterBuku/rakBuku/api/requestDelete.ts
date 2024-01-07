import Swal from 'sweetalert2';
import API from '../../../../../configs/api';

const URL = 'rak-buku';

export const requestDelete = async (id_rak_buku: string) => {
  try {
    const alert = await Swal.fire({
      icon: 'warning',
      title: 'Apakah anda yakin?',
      text: 'Ingin menghapus data rak buku ini?',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      padding: '2em',
      customClass: 'sweet-alerts',
    });

    if (alert.isConfirmed) {
      try {
        await API.delete(`/api/${URL}/${id_rak_buku}`);
        const toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
        });
        toast.fire({
          icon: 'success',
          title: 'Rak Buku Berhasil Dihapus',
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
          title: 'Rak Buku Gagal Dihapus',
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
