import API_JSON from '../../../../configs/API_JSON';
import Swal from 'sweetalert2';

const URL = 'kelas';

export const requestCreateKelas = async (nama_kelas: any): Promise<any> => {
  try {
    const data = { nama_kelas };
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
        title: `Kelas Berhasil Ditambahkan`,
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
      title: 'Kelas Gagal Ditambahkan!',
      padding: '10px 20px',
    });

    return false;
  }
};
