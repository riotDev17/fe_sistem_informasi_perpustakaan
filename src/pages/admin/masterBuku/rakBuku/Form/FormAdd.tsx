import { Formik } from 'formik';
import { validationSchema } from './validationSchema';
import { requestCreateRakBuku } from '../api/requestCreateRakBuku';
import { Form, Link, useNavigate } from 'react-router-dom';
import InputText from '../../../../../components/forms/Input/InputText';
import ButtonSolidDanger from '../../../../../components/buttons/solid/ButtonSolidDanger';
import ButtonSolidPrimary from '../../../../../components/buttons/solid/ButtonSolidPrimary';
import BreadcrumbsDefault from '../../../../../components/breadcrumbs/BreadcrumbsDefault';

const FormAdd = () => {
  const navigate = useNavigate();

  const handleCreate = async (e: { nama_rak_buku: string }): Promise<any> => {
    try {
      const { nama_rak_buku } = e;
      const request = await requestCreateRakBuku(nama_rak_buku);

      if (request) {
        navigate('/rak-buku');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Rak Buku"
        menus={[
          {
            label: 'Rak Buku',
            link: '/rak-buku',
            icon: 'bxs:book',
          },
          {
            label: 'Tambah Rak Buku',
            link: '/rak-buku/tambah-rak-buku',
          },
        ]}
      />

      <div className="mt-10">
        <Formik
          initialValues={{
            nama_rak_buku: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreate}
        >
          {({ errors, handleChange, submitCount, values }) => (
            <Form className="space-y-5">
              <div className={submitCount ? (errors.nama_rak_buku ? 'has-error' : 'has-success') : ''}>
                <InputText
                  id={'nama_rak_buku'}
                  name={'nama_rak_buku'}
                  label={'Rak Buku'}
                  value={values.nama_rak_buku}
                  onChange={handleChange}
                  error={errors.nama_rak_buku || ''}
                  placeholder={'Masukkan Nama Rak Buku'}
                  isInputFilled={'Form Rak Buku Sudah Terisi'}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <ButtonSolidPrimary text={'Tambah Rak Buku'} width={'w-auto'} onClick={() => handleCreate(values)} />
                <Link to={'/rak-buku'}>
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
