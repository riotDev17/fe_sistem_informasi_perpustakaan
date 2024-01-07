import Swal from 'sweetalert2';
import API from '../../../../configs/api';
import auth from '../../../../configs/auth';

export const LOGOUT = async () => {
  try {
    const response = await API.delete('/api/admin/logout');
    if (response.status === 200) {
      auth.removeToken();
      auth.removeUsername();

      const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: 'success',
        title: 'Anda Berhasil Logout',
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
      title: 'Anda Gagal Logout',
      padding: '10px 20px',
    });

    return false;
  }
};
