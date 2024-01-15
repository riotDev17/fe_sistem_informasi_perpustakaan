import { Formik } from 'formik';
import { validationSchema } from './validationSchema';
import { requestUpdateBuku } from '../api/requestUpdateBuku';
import { requestGetByIDBuku } from '../api/requestGetByIDBuku';
import { useEffect, useState } from 'react';
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import InputFile from '../../../../../components/forms/Input/InputFile';
import InputText from '../../../../../components/forms/Input/InputText';
import InputNumber from '../../../../../components/forms/Input/InputNumber';
import PreviewImage from '../../../../../utils/PreviewImage';
import RakBukuSelect from '../../../../../utils/RakBukuSelect';
import InputTextarea from '../../../../../components/forms/Input/InputTexarea';
import ButtonSolidDanger from '../../../../../components/buttons/solid/ButtonSolidDanger';
import ButtonSolidSuccess from '../../../../../components/buttons/solid/ButtonSolidSuccess';
import BreadcrumbsDefault from '../../../../../components/breadcrumbs/BreadcrumbsDefault';

const FormEdit = () => {
  const navigate = useNavigate();
  const { id_buku } = useParams();
  const [formData, setFormData] = useState({
    judulBuku: '',
    pengarang: '',
    penerbit: '',
    tahunTerbit: 0,
    stokBuku: 0,
    deskripsi: '',
    fotoBuku: '',
    idRakBuku: '',
  });

  useEffect(() => {
    requestGetByIDBuku(id_buku ?? '').then((response) => {
      setFormData({
        judulBuku: response?.data?.judul_buku || '',
        pengarang: response?.data?.pengarang || '',
        penerbit: response?.data?.penerbit || '',
        tahunTerbit: response?.data?.tahun_terbit || 0,
        stokBuku: response?.data?.stok_buku || 0,
        deskripsi: response?.data?.deskripsi || '',
        fotoBuku: response?.data?.foto_buku || '',
        idRakBuku: response?.data?.rak_buku?.id_rak_buku || '',
      });
    });
  }, []);

  const handleUpdate = async (values: any) => {
    try {
      const request = await requestUpdateBuku(id_buku ?? '', { ...values });

      if (request) {
        navigate('/buku');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Buku"
        menus={[
          {
            label: 'Buku',
            link: '/buku',
            icon: 'iconoir:book-solid',
          },
          {
            label: 'Edit Buku',
            link: `/buku/edit-buku/:${id_buku}`,
          },
        ]}
      />

      <div className="mt-10">
        <Formik
          enableReinitialize={true}
          initialValues={{
            judul_buku: formData.judulBuku,
            pengarang: formData.pengarang,
            penerbit: formData.penerbit,
            tahun_terbit: formData.tahunTerbit,
            deskripsi: formData.deskripsi,
            stok_buku: formData.stokBuku,
            foto_buku: formData.fotoBuku,
            id_rak_buku: formData.idRakBuku,
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ errors, handleChange, submitCount, values, setFieldValue }) => (
            <Form className="space-y-5">
              <div className={submitCount ? (errors.judul_buku ? 'has-error' : 'has-success') : ''}>
                <InputText
                  id={'judul_buku'}
                  name={'judul_buku'}
                  label={'Judul Buku'}
                  value={values.judul_buku}
                  onChange={handleChange}
                  error={errors.judul_buku || ''}
                  placeholder={'Masukkan Judul Buku'}
                  isInputFilled={'Form Judul Buku Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.pengarang ? 'has-error' : 'has-success') : ''}>
                <InputText
                  id={'pengarang'}
                  name={'pengarang'}
                  label={'Pengarang'}
                  value={values.pengarang}
                  onChange={handleChange}
                  error={errors.pengarang || ''}
                  placeholder={'Masukkan Pengarang Buku'}
                  isInputFilled={'Form Pengarang Buku Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.penerbit ? 'has-error' : 'has-success') : ''}>
                <InputText
                  id={'penerbit'}
                  name={'penerbit'}
                  label={'Penerbit'}
                  value={values.penerbit}
                  onChange={handleChange}
                  error={errors.penerbit || ''}
                  placeholder={'Masukkan Penerbit Buku'}
                  isInputFilled={'Form Penerbit Buku Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.tahun_terbit ? 'has-error' : 'has-success') : ''}>
                <InputNumber
                  id={'tahun_terbit'}
                  name={'tahun_terbit'}
                  label={'Tahun Terbit'}
                  value={values.tahun_terbit}
                  onChange={handleChange}
                  error={errors.tahun_terbit || ''}
                  placeholder={'Masukkan Tahun Terbik Buku'}
                  isInputFilled={'Form Tahun Terbit Buku Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.stok_buku ? 'has-error' : 'has-success') : ''}>
                <InputNumber
                  id={'stok_buku'}
                  name={'stok_buku'}
                  label={'Stok Buku'}
                  value={values.stok_buku}
                  onChange={handleChange}
                  error={errors.stok_buku || ''}
                  placeholder={'Masukkan Stok Buku'}
                  isInputFilled={'Form Stok Buku Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.id_rak_buku ? 'has-error' : 'has-success') : ''}>
                <RakBukuSelect
                  id={'id_rak_buku'}
                  name={'id_rak_buku'}
                  label={'Rak Buku'}
                  value={values.id_rak_buku}
                  onChange={(selectedValue) => {
                    setFieldValue('id_rak_buku', selectedValue.value);
                  }}
                  error={errors.id_rak_buku || ''}
                  placeholder={'Pilih Rak Buku'}
                  isInputFilled={'Form Rak Buku Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.deskripsi ? 'has-error' : 'has-success') : ''}>
                <InputTextarea
                  id={'deskripsi'}
                  name={'deskripsi'}
                  rows={10}
                  value={values.deskripsi}
                  onChange={handleChange}
                  placeholder={'Masukkan Deskripsi Buku'}
                  label={'Deskripsi Buku'}
                  error={errors.deskripsi || ''}
                  isInputFilled={'Form Deskripsi Buku Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.foto_buku ? 'has-error' : 'has-success') : ''}>
                <InputFile
                  id={'foto_buku'}
                  name={'foto_buku'}
                  label={'Foto Buku'}
                  value={values.foto_buku}
                  onChange={(e: any) => {
                    setFieldValue('foto_buku', e.target.files[0]);
                  }}
                  error={errors.foto_buku || ''}
                  isInputFilled={'Form Foto Buku Sudah Terisi'}
                />

                {values.foto_buku && (values.foto_buku as any) instanceof File ? (
                  <PreviewImage image={values.foto_buku} />
                ) : values.foto_buku ? (
                  <div className="custom-file-container__image-preview relative">
                    <img src={`${import.meta.env.VITE_API_URL}/${values.foto_buku}`} alt="Foto Buku" />
                  </div>
                ) : null}
              </div>

              <div className="flex gap-3 justify-end">
                <ButtonSolidSuccess text={'Edit Buku'} width={'w-auto'} onClick={() => handleUpdate(values)} />
                <Link to={'/buku'}>
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
