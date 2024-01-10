import Swal from 'sweetalert2';
import API_FORM from '../../../../configs/API_FORM';

const URL = 'admin';

export const requestUpdate = async (id_admin: string, username: string, foto_admin: string) => {
  try {
    const alert = await Swal.fire({
      icon: 'warning',
      title: 'Apakah anda yakin?',
      text: 'Ingin mengupdate profile?',
      showCancelButton: true,
      confirmButtonText: 'Update',
      padding: '2em',
      customClass: 'sweet-alerts',
    });

    if (alert.isConfirmed) {
      const response = await API_FORM.put(`/api/${URL}/${id_admin}`, {
        username: username,
        foto_admin: foto_admin,
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
          title: `Profil Berhasil Diedit`,
          padding: '10px 20px',
        });

        return true;
      }
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
      title: 'Profil Gagal Diedit',
      padding: '10px 20px',
    });

    return false;
  }
};
