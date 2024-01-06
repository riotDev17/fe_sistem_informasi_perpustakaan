import Swal from 'sweetalert2';
import API from '../../../../configs/api';

export const DELETE = async (id_agama: string) => {
  try {
    const alert = await Swal.fire({
      icon: 'warning',
      title: 'Apakah anda yakin?',
      text: 'Ingin menghapus data agama ini?',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      padding: '2em',
      customClass: 'sweet-alerts',
    });

    if (alert.isConfirmed) {
      try {
        await API.delete(`/api/agama/${id_agama}`);
        Swal.fire({
          icon: 'success',
          title: 'Terhapus',
          text: 'Agama berhasil dihapus.',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
        return true;
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Agama gagal dihapus.',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
        return false;
      }
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};
