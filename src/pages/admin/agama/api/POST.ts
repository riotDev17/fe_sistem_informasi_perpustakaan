import Swal from 'sweetalert2';
import API from '../../../../configs/api';

export const POST = async (nama_agama: any): Promise<any> => {
  try {
    const data = { nama_agama };
    const response = await API.post('/api/agama', data);

    if (response.status === 200) {
      const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: 'success',
        title: `Agama Berhasil Ditambahkan`,
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
      title: 'Agama Gagal Ditambahkan!',
      padding: '10px 20px',
    });

    return false;
  }
};
