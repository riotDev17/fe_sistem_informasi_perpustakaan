import Swal from 'sweetalert2';
import API_JSON from '../../../../configs/API_JSON';

const URL = 'kelas';

export const requestUpdate = async (id_kelas: string, nama_kelas: string) => {
  try {
    const response = await API_JSON.put(`/api/${URL}/${id_kelas}`, {
      nama_kelas: nama_kelas,
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
        title: `Kelas Berhasil Diedit`,
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
      title: 'Kelas Gagal Diedit!',
      padding: '10px 20px',
    });

    return false;
  }
};
