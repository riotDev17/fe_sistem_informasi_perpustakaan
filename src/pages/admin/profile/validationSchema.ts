import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  username: yup.string().required('Username Wajib Diisi'),
  foto_admin: yup.string().required('Foto Wajib Diisi'),
});
