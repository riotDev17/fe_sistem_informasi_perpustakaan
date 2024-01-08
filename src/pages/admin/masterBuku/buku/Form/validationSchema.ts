import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  judul_buku: yup.string().required('Agama Wajib Diisi'),
  pengarang: yup.string().required('Pengarang Wajib Diisi'),
  penerbit: yup.string().required('Penerbit Wajib Diisi'),
  tahun_terbit: yup.number().required('Tahun Terbit Wajib Diisi'),
  deskripsi: yup.string().optional(),
  stok_buku: yup.number().required('Stok Buku Wajib Diisi'),
  foto_buku: yup.mixed().optional(),
  id_rak_buku: yup.string().required('Rak Buku Wajib Diisi'),
});
