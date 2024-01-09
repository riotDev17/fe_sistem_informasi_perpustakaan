import { Formik } from 'formik';
import { requestUpdate } from '../api/requestUpdate';
import { requestGetByID } from '../api/requestGetByID';
import { validationSchema } from './validationSchema';
import { useEffect, useState } from 'react';
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import InputFile from '../../../../../components/forms/Input/InputFile';
import InputText from '../../../../../components/forms/Input/InputText';
import InputNumber from '../../../../../components/forms/Input/InputNumber';
import PreviewImage from './PreviewImage';
import RakBukuSelect from '../../../../../utils/RakBukuSelect';
import InputTextarea from '../../../../../components/forms/Input/InputTexarea';
import ButtonSolidDanger from '../../../../../components/buttons/solid/ButtonSolidDanger';
import ButtonSolidSuccess from '../../../../../components/buttons/solid/ButtonSolidSuccess';
import BreadcrumbsDefault from '../../../../../components/breadcrumbs/BreadcrumbsDefault';

const FormEdit = () => {
  const navigate = useNavigate();
  const { id_buku } = useParams();
  const [judulBuku, setJudulBuku] = useState('');
  const [pengarang, setPengarang] = useState('');
  const [penerbit, setPenerbit] = useState('');
  const [tahunTerbit, setTahunTerbit] = useState(0);
  const [stokBuku, setStokBuku] = useState(0);
  const [deskripsi, setDeskripsi] = useState('');
  const [fotoBuku, setFotoBuku] = useState('');
  const [idRakBuku, setIdRakBuku] = useState('');

  useEffect(() => {
    requestGetByID(id_buku ?? '').then((response) => {
      setJudulBuku(response?.data?.judul_buku || '');
      setPengarang(response?.data?.pengarang || '');
      setPenerbit(response?.data?.penerbit || '');
      setTahunTerbit(response?.data?.tahun_terbit || '');
      setStokBuku(response?.data?.stok_buku || '');
      setDeskripsi(response?.data?.deskripsi || '');
      setFotoBuku(response?.data?.foto_buku || '');
      setIdRakBuku(response?.data?.rak_buku?.id_rak_buku || '');
    });
  }, []);

  const handleUpdate = async (e: {
    judul_buku: string;
    pengarang: string;
    penerbit: string;
    tahun_terbit: number;
    stok_buku: number;
    deskripsi: string;
    foto_buku: string;
    id_rak_buku: string;
  }): Promise<any> => {
    try {
      const { judul_buku, pengarang, penerbit, tahun_terbit, stok_buku, deskripsi, foto_buku, id_rak_buku } = e;

      const request = await requestUpdate(id_buku ?? '', judul_buku, pengarang, penerbit, tahun_terbit, stok_buku, deskripsi, foto_buku, id_rak_buku);

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
            judul_buku: judulBuku,
            pengarang: pengarang,
            penerbit: penerbit,
            tahun_terbit: tahunTerbit,
            deskripsi: deskripsi,
            stok_buku: stokBuku,
            foto_buku: fotoBuku,
            id_rak_buku: idRakBuku,
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
