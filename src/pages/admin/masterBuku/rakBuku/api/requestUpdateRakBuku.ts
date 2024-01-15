import Swal from 'sweetalert2';
import API_JSON from '../../../../../configs/API_JSON';

const URL = 'rak-buku';

export const requestUpdateRakBuku = async (id_rak_buku: string, nama_rak_buku: string) => {
  try {
    const response = await API_JSON.put(`/api/${URL}/${id_rak_buku}`, {
      nama_rak_buku: nama_rak_buku,
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
        title: `Rak Buku Berhasil Diedit!`,
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
      title: 'Rak Buku Gagal Diedit!',
      padding: '10px 20px',
    });

    return false;
  }
};
