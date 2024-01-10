import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  nama_siswa: yup.string().required('Nama Siswa Wajib Diisi'),
  nis: yup.number().required('NIS Wajib Diisi'),
  nisn: yup.number().required('NISN Wajib Diisi'),
  tanggal_lahir: yup.string().required('Tanggal Lahir Wajib Diisi'),
  tempat_lahir: yup.string().required('Tempat Lahir Wajib Diisi'),
  jenis_kelamin: yup.string().required('Jenis Kelamin Wajib Diisi'),
  id_agama: yup.string().required('Agama Wajib Diisi'),
  alamat: yup.string().required('Alamat Wajib Diisi'),
  id_kelas: yup.string().required('Kelas Wajib Diisi'),
  foto_siswa: yup.mixed().optional(),
});
