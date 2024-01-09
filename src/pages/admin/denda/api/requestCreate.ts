import Swal from 'sweetalert2';
import API_JSON from '../../../../configs/API_JSON';

const URL = 'denda';

export const requestCreate = async (nominal: number): Promise<any> => {
  try {
    const data = { nominal };
    const response = await API_JSON.post(`/api/${URL}`, data);

    if (response.status === 200) {
      const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: 'success',
        title: `Denda Berhasil Ditambahkan`,
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
      title: 'Denda Gagal Ditambahkan!',
      padding: '10px 20px',
    });

    return false;
  }
};
