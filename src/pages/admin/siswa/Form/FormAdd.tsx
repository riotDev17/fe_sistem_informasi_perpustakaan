import { Form, Formik } from 'formik';
import BreadcrumbsDefault from '../../../../components/breadcrumbs/BreadcrumbsDefault';
import { validationSchema } from './validationSchema';
import InputText from '../../../../components/forms/Input/InputText';
import ButtonSolidPrimary from '../../../../components/buttons/solid/ButtonSolidPrimary';
import { Link, useNavigate } from 'react-router-dom';
import ButtonSolidDanger from '../../../../components/buttons/solid/ButtonSolidDanger';
import PreviewImage from '../../../../utils/PreviewImage';
import InputFile from '../../../../components/forms/Input/InputFile';
import InputNumber from '../../../../components/forms/Input/InputNumber';
import DateDefault from '../../../../components/forms/date/DateDefault';
import TrimValue from '../../../../helpers/TrimValue';
import JenisKelaminSelect from '../../../../utils/JenisKelaminSelect';
import AgamaSelect from '../../../../utils/AgamaSelect';
import KelasSelect from '../../../../utils/KelasSelect';
import { requestCreate } from '../api/requestCreate';

const FormAdd = () => {
  const navigate = useNavigate();

  const handleCreate = async (e: {
    nama_siswa: string;
    nis: number;
    nisn: number;
    tanggal_lahir: string;
    tempat_lahir: string;
    jenis_kelamin: string;
    id_agama: string;
    alamat: string;
    id_kelas: string;
    foto_siswa: string;
  }): Promise<any> => {
    try {
      const { nama_siswa, nis, nisn, tanggal_lahir, tempat_lahir, jenis_kelamin, id_agama, alamat, id_kelas, foto_siswa } = e;

      const request = await requestCreate(nama_siswa, nis, nisn, tanggal_lahir, tempat_lahir, jenis_kelamin, id_agama, alamat, id_kelas, foto_siswa);

      if (request) {
        navigate('/siswa');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Siswa"
        menus={[
          {
            label: 'Siswa',
            link: '/siswa',
            icon: 'ph:student-fill',
          },
          {
            label: 'Tambah Siswa',
            link: '/siswa/tambah-siswa',
          },
        ]}
      />

      <div className="mt-10">
        <Formik
          initialValues={{
            nama_siswa: '',
            nis: 0,
            nisn: 0,
            tanggal_lahir: '',
            tempat_lahir: '',
            jenis_kelamin: '',
            id_agama: '',
            alamat: '',
            id_kelas: '',
            foto_siswa: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreate}
        >
          {({ errors, handleChange, submitCount, values, setFieldValue }) => (
            <Form className="space-y-5">
              <div className={submitCount ? (errors.nama_siswa ? 'has-error' : 'has-success') : ''}>
                <InputText
                  id={'nama_siswa'}
                  name={'nama_siswa'}
                  label={'Nama Siswa'}
                  value={values.nama_siswa}
                  onChange={handleChange}
                  error={errors.nama_siswa || ''}
                  placeholder={'Masukkan Nama Siswa'}
                  isInputFilled={'Form Nama Siswa Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.nis ? 'has-error' : 'has-success') : ''}>
                <InputNumber
                  id={'nis'}
                  name={'nis'}
                  label={'NIS ( Nomor Induk Siswa )'}
                  value={values.nis}
                  onChange={handleChange}
                  error={errors.nis || ''}
                  placeholder={'Masukkan NIS'}
                  isInputFilled={'Form NIS Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.nisn ? 'has-error' : 'has-success') : ''}>
                <InputNumber
                  id={'nisn'}
                  name={'nisn'}
                  label={'NISN ( Nomor Induk Siswa Nasional )'}
                  value={values.nisn}
                  onChange={handleChange}
                  error={errors.nisn || ''}
                  placeholder={'Masukkan NISN'}
                  isInputFilled={'Form NISN Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.tanggal_lahir ? 'has-error' : 'has-success') : ''}>
                <DateDefault
                  id={'tanggal_lahir'}
                  name={'tanggal_lahir'}
                  label={'Tanggal Lahir'}
                  value={TrimValue(values.tanggal_lahir)}
                  onChange={(date) => {
                    setFieldValue('tanggal_lahir', date[0]);
                  }}
                  error={errors.tanggal_lahir || ''}
                  placeholder={'Masukkan Tanggal Lahir'}
                  isInputFilled={'Form Tanggal Lahir Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.tempat_lahir ? 'has-error' : 'has-success') : ''}>
                <InputText
                  id={'tempat_lahir'}
                  name={'tempat_lahir'}
                  label={'Tempat Lahir'}
                  value={values.tempat_lahir}
                  onChange={handleChange}
                  error={errors.tempat_lahir || ''}
                  placeholder={'Masukkan Tempat Lahir'}
                  isInputFilled={'Form Tempat Lahir Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.jenis_kelamin ? 'has-error' : 'has-success') : ''}>
                <JenisKelaminSelect
                  id={'jenis_kelamin'}
                  name={'jenis_kelamin'}
                  label={'Jenis Kelamin'}
                  error={errors.jenis_kelamin || ''}
                  value={values.jenis_kelamin}
                  onChange={(value: any) => {
                    setFieldValue('jenis_kelamin', value.value);
                  }}
                  isInputFilled={'Form Jenis Kelamin Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.id_agama ? 'has-error' : 'has-success') : ''}>
                <AgamaSelect
                  id={'id_agama'}
                  name={'id_agama'}
                  label={'Agama'}
                  value={values.id_agama}
                  error={errors.id_agama || ''}
                  onChange={(e: any) => {
                    setFieldValue('id_rak_buku', (values.id_agama = e.value));
                  }}
                  placeholder={'Pilih Agama'}
                  isInputFilled={'Form Agama Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.id_kelas ? 'has-error' : 'has-success') : ''}>
                <KelasSelect
                  id={'id_kelas'}
                  name={'id_kelas'}
                  label={'Kelas'}
                  value={values.id_kelas}
                  error={errors.id_kelas || ''}
                  onChange={(e: any) => {
                    setFieldValue('id_kelas', (values.id_kelas = e.value));
                  }}
                  placeholder={'Pilih Kelas'}
                  isInputFilled={'Form Kelas Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.alamat ? 'has-error' : 'has-success') : ''}>
                <InputText
                  id={'alamat'}
                  name={'alamat'}
                  label={'Alamat Siswa'}
                  value={values.alamat}
                  onChange={handleChange}
                  error={errors.alamat || ''}
                  placeholder={'Masukkan Alamat Siswa'}
                  isInputFilled={'Form Alamat Siswa Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.foto_siswa ? 'has-error' : 'has-success') : ''}>
                <InputFile
                  id={'foto_siswa'}
                  name={'foto_siswa'}
                  label={'Foto Siswa'}
                  value={values.foto_siswa}
                  onChange={(e: any) => {
                    setFieldValue('foto_siswa', e.target.files[0]);
                  }}
                  error={errors.foto_siswa || ''}
                  isInputFilled={'Form Foto Siswa Sudah Terisi'}
                />

                {values.foto_siswa && <PreviewImage image={values.foto_siswa} />}
              </div>

              <div className="flex gap-3 justify-end">
                <ButtonSolidPrimary text={'Tambah Siswa'} width={'w-auto'} />
                <Link to={'/siswa'}>
                  <ButtonSolidDanger text={'Batal'} width={'w-auto'} />
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormAdd;
