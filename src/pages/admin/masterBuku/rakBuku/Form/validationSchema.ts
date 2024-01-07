import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  nama_rak_buku: yup.string().required('Rak Buku Wajib Diisi'),
});
