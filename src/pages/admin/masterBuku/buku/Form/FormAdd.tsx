import { Formik } from 'formik';
import BreadcrumbsDefault from '../../../../../components/breadcrumbs/BreadcrumbsDefault';
import { validationSchema } from './validationSchema';
import { Form, Link } from 'react-router-dom';
import InputText from '../../../../../components/forms/Input/InputText';
import ButtonSolidPrimary from '../../../../../components/buttons/solid/ButtonSolidPrimary';
import ButtonSolidDanger from '../../../../../components/buttons/solid/ButtonSolidDanger';
import InputNumber from '../../../../../components/forms/Input/InputNumber';
import QuillBasic from '../../../../../components/quills/QuillBasic';
import InputFile from '../../../../../components/forms/Input/InputFile';
import PreviewImage from './PreviewImage';
import RakBukuSelect from '../../../../../utils/RakBukuSelect';

const FormAdd = () => {
  const handleRakBuku = (id_rak_buku: string) => {
    console.log(id_rak_buku);
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
            label: 'Tambah Buku',
            link: '/buku/tambah-buku',
          },
        ]}
      />

      <div className="mt-10">
        <Formik
          initialValues={{
            judul_buku: '',
            pengarang: '',
            penerbit: '',
            tahun_terbit: 0,
            deskripsi: '',
            stok_buku: 0,
            foto_buku: '',
            id_rak_buku: '',
          }}
          validationSchema={validationSchema}
          onSubmit={'test'}
        >
          {({ errors, handleChange, submitCount, values, setFieldValue, setTouched }) => (
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
                  onChange={(e: any) => {
                    setFieldValue('id_rak_buku', (values.id_rak_buku = e.value));
                  }}
                  error={errors.id_rak_buku || ''}
                  placeholder={'Pilih Rak Buku'}
                  isInputFilled={'Form Rak Buku Sudah Terisi'}
                />
              </div>

              <div className={submitCount ? (errors.deskripsi ? 'has-error' : 'has-success') : ''}>
                <QuillBasic
                  id={'deskripsi'}
                  label={'Deskripsi Buku'}
                  value={values.deskripsi}
                  onChange={handleChange}
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

                {values.foto_buku && <PreviewImage image={values.foto_buku} />}
              </div>

              <div className="flex gap-3 justify-end">
                <ButtonSolidPrimary text={'Tambah Buku'} width={'w-auto'} onClick={() => handleCreate(values)} />
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

export default FormAdd;
