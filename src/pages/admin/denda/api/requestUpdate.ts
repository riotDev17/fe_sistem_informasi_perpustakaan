import Swal from 'sweetalert2';
import API from '../../../../configs/api';

const URL = 'denda';

export const requestUpdate = async (id_denda: string, nominal: number) => {
  try {
    const response = await API.put(`/api/${URL}/${id_denda}`, {
      nominal: nominal,
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
        title: `Denda Berhasil Diedit`,
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
      title: 'Denda Gagal Diedit!',
      padding: '10px 20px',
    });

    return false;
  }
};
