import Swal from 'sweetalert2';
import API_JSON from '../../../../configs/API_JSON';

const URL = 'peminjaman-buku';

export const requestPeminjamanBuku = async (id_siswa: any, id_buku: string) => {
  try {
    const data = { id_buku };
    const response = await API_JSON.post(`/api/${URL}/${id_siswa}`, data);

    if (response.status === 200) {
      const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: 'success',
        title: `Peminjaman Buku Berhasil Dilakukan!`,
        padding: '10px 20px',
      });
    }

    return true;
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
      title: 'Peminjaman Buku Gagal Dilakukan!',
      padding: '10px 20px',
    });

    return false;
  }
};
