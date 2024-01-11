import { Link, useNavigate, useParams } from 'react-router-dom';
import { requestGetByID } from '../api/requestGetByID';
import { useEffect, useState } from 'react';
import { requestUpdate } from '../api/requestUpdate';
import BreadcrumbsDefault from '../../../../components/breadcrumbs/BreadcrumbsDefault';
import { Form, Formik } from 'formik';
import { validationSchema } from './validationSchema';
import InputText from '../../../../components/forms/Input/InputText';
import InputNumber from '../../../../components/forms/Input/InputNumber';
import DateDefault from '../../../../components/forms/date/DateDefault';
import TrimValue from '../../../../helpers/TrimValue';
import JenisKelaminSelect from '../../../../utils/JenisKelaminSelect';
import AgamaSelect from '../../../../utils/AgamaSelect';
import KelasSelect from '../../../../utils/KelasSelect';
import InputFile from '../../../../components/forms/Input/InputFile';
import PreviewImage from '../../../../utils/PreviewImage';
import ButtonSolidDanger from '../../../../components/buttons/solid/ButtonSolidDanger';
import ButtonSolidSuccess from '../../../../components/buttons/solid/ButtonSolidSuccess';

const FormEdit = () => {
  const navigate = useNavigate();
  const { id_siswa } = useParams();
  const [formData, setFormData] = useState({
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
  });

  console.log(formData);

  useEffect(() => {
    requestGetByID(id_siswa ?? '').then((response) => {
      setFormData({
        nama_siswa: response?.data?.nama_siswa || '',
        nis: response?.data?.nis || 0,
        nisn: response?.data?.nisn || 0,
        tanggal_lahir: response?.data?.tanggal_lahir || '',
        tempat_lahir: response?.data?.tempat_lahir || '',
        jenis_kelamin: response?.data?.jenis_kelamin || '',
        id_agama: response?.data?.agama?.id_agama || '',
        alamat: response?.data?.alamat || '',
        id_kelas: response?.data?.kelas?.id_kelas || '',
        foto_siswa: response?.data?.foto_siswa || '',
      });
    });
  }, []);

  const handleUpdate = async (values: any) => {
    try {
      const request = await requestUpdate(id_siswa ?? '', { ...values });

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
            label: 'Edit Siswa',
            link: `/siswa/edit-siswa/${id_siswa}`,
          },
        ]}
      />

      <div className="mt-10">
        <Formik
          enableReinitialize={true}
          initialValues={{
            nama_siswa: formData.nama_siswa,
            nis: formData.nis,
            nisn: formData.nisn,
            tanggal_lahir: formData.tanggal_lahir,
            tempat_lahir: formData.tempat_lahir,
            jenis_kelamin: formData.jenis_kelamin,
            id_agama: formData.id_agama,
            alamat: formData.alamat,
            id_kelas: formData.id_kelas,
            foto_siswa: formData.foto_siswa,
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
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
                  onChange={(selectedValue) => {
                    setFieldValue('id_agama', selectedValue.value);
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
                  onChange={(selectedValue) => {
                    setFieldValue('id_kelas', selectedValue.value);
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

                {values.foto_siswa && (values.foto_siswa as any) instanceof File ? (
                  <PreviewImage image={values.foto_siswa} />
                ) : values.foto_siswa ? (
                  <div className="custom-file-container__image-preview relative">
                    <img src={`${import.meta.env.VITE_API_URL}/${values.foto_siswa}`} alt="Foto Siswa" />
                  </div>
                ) : null}
              </div>

              <div className="flex gap-3 justify-end">
                <ButtonSolidSuccess text={'Edit Siswa'} width={'w-auto'} />
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

export default FormEdit;
