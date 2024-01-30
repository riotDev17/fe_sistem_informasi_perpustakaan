import Swal from 'sweetalert2';
import API_FORM from '../../../../configs/API_FORM';

const URL = 'buku';

export const requestUpdateBuku = async (id_buku: string, data: any) => {
  const { judul_buku, pengarang, penerbit, tahun_terbit, stok_buku, deskripsi, foto_buku, id_rak_buku } = data;

  try {
    const response = await API_FORM.put(`/api/${URL}/${id_buku}`, {
      judul_buku,
      pengarang,
      penerbit,
      tahun_terbit,
      deskripsi,
      stok_buku,
      foto_buku,
      id_rak_buku,
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
        title: 'Buku Berhasil Diedit!',
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
      title: 'Buku Gagal Diedit!',
      padding: '10px 20px',
    });

    return false;
  }
};
