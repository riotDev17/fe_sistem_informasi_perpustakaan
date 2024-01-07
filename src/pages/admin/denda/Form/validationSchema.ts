import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  nominal: yup.number().required('Nominal Denda Wajib Diisi'),
});
