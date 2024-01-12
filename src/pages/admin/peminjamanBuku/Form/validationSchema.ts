import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  id_buku: yup.string().required('Buku Wajib Dipilih'),
});
