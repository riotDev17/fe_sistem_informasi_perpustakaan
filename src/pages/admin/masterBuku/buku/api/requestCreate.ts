import Swal from 'sweetalert2';
import API_FORM from '../../../../../configs/API_FORM';

const URL = 'buku';

export const requestCreate = async (judul_buku: string, pengarang: string, penerbit: string, tahun_terbit: number, deskripsi: string, stok_buku: number, foto_buku: string, id_rak_buku: string) => {
  try {
    const data = { judul_buku, pengarang, penerbit, tahun_terbit, deskripsi, stok_buku, foto_buku, id_rak_buku };
    const response = await API_FORM.post(`/api/${URL}`, data);

    if (response.status === 200) {
      const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: 'success',
        title: `Buku Berhasil Ditambahkan`,
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
      title: 'Buku Gagal Ditambahkan!',
      padding: '10px 20px',
    });

    return false;
  }
};
