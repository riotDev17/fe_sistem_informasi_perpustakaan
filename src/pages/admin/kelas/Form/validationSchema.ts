import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  nama_kelas: yup.string().required('Kelas Wajib Diisi'),
});
