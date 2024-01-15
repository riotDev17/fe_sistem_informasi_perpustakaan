import Swal from 'sweetalert2';
import API_JSON from '../../../../configs/API_JSON';

const URL = 'peminjaman-buku';

export const requestUpdatePeminjamanBuku = async (id_peminjaman: any) => {
  try {
    const alert = await Swal.fire({
      icon: 'warning',
      title: 'Apakah anda yakin?',
      text: 'Ingin menghapus mengupdate riwayat peminjaman?',
      showCancelButton: true,
      confirmButtonText: 'Update',
      padding: '2em',
      customClass: 'sweet-alerts',
    });

    if (alert.isConfirmed) {
      await API_JSON.put(`/api/${URL}/${id_peminjaman}`);
      const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: 'success',
        title: 'Riwayat Peminjaman Buku Berhasil Diupdate!',
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
      title: 'Riwayat Peminjaman Buku Gagal Diupdate!',
      padding: '10px 20px',
    });

    return false;
  }
};
