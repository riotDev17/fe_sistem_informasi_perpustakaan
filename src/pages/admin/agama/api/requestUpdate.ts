import Swal from 'sweetalert2';
import API from '../../../../configs/api';

const URL = 'agama';

export const requestUpdate = async (id_agama: string, nama_agama: string) => {
  try {
    const response = await API.put(`/api/${URL}/${id_agama}`, {
      nama_agama: nama_agama,
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
        title: `Agama Berhasil Diedit`,
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
      title: 'Agama Gagal Diedit!',
      padding: '10px 20px',
    });

    return false;
  }
};
