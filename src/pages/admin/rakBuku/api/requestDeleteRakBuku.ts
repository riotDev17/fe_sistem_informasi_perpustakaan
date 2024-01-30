import Swal from 'sweetalert2';
import API_JSON from '../../../../configs/API_JSON';

const URL = 'rak-buku';

export const requestDeleteRakBuku = async (id_rak_buku: string) => {
  try {
    const alert = await Swal.fire({
      icon: 'warning',
      title: 'Apakah anda yakin?',
      text: 'Ingin menghapus rak buku ini?',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      padding: '2em',
      customClass: 'sweet-alerts',
    });

    if (alert.isConfirmed) {
      await API_JSON.delete(`/api/${URL}/${id_rak_buku}`);
      const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: 'success',
        title: 'Rak Buku Berhasil Dihapus!',
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
      title: 'Rak Buku Gagal Dihapus!',
      padding: '10px 20px',
    });

    return false;
  }
};
