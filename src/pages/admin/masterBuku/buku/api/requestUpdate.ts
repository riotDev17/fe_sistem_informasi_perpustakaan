import Swal from 'sweetalert2';
import API_FORM from '../../../../../configs/API_FORM';

const URL = 'buku';

export const requestUpdate = async (
  id_buku: string,
  judul_buku: string,
  pengarang: string,
  penerbit: string,
  tahun_terbit: number,
  stok_buku: number,
  deskripsi: string,
  foto_buku: string,
  id_rak_buku: string
) => {
  try {
    const response = await API_FORM.put(`/api/${URL}/${id_buku}`, {
      judul_buku: judul_buku,
      pengarang: pengarang,
      penerbit: penerbit,
      tahun_terbit: tahun_terbit,
      deskripsi: deskripsi,
      stok_buku: stok_buku,
      foto_buku: foto_buku,
      id_rak_buku: id_rak_buku,
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
        title: `Buku Berhasil Diedit`,
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
