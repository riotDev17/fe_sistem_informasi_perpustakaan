import { Formik } from 'formik';
import { requestCreate } from '../api/requestCreate';
import { validationSchema } from './validationSchema';
import { Form, Link, useNavigate } from 'react-router-dom';
import InputText from '../../../../components/forms/Input/InputText';
import ButtonSolidPrimary from '../../../../components/buttons/solid/ButtonSolidPrimary';
import ButtonSolidDanger from '../../../../components/buttons/solid/ButtonSolidDanger';
import BreadcrumbsDefault from '../../../../components/breadcrumbs/BreadcrumbsDefault';

const FormAdd = () => {
  const navigate = useNavigate();

  const handleCreate = async (e: { nama_kelas: string }): Promise<any> => {
    try {
      const { nama_kelas } = e;
      const request = await requestCreate(nama_kelas);

      if (request) {
        navigate('/kelas');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Kelas"
        menus={[
          {
            label: 'Kelas',
            link: '/kelas',
            icon: 'streamline:class-lesson-solid',
          },
          {
            label: 'Tambah Kelas',
            link: '/kelas/tambah-kelas',
          },
        ]}
      />

      <div className="mt-10">
        <Formik
          initialValues={{
            nama_kelas: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreate}
        >
          {({ errors, handleChange, submitCount, values }) => (
            <Form className="space-y-5">
              <div className={submitCount ? (errors.nama_kelas ? 'has-error' : 'has-success') : ''}>
                <InputText
                  id={'nama_kelas'}
                  name={'nama_kelas'}
                  label={'Nama Kelas'}
                  value={values.nama_kelas}
                  onChange={handleChange}
                  error={errors.nama_kelas || ''}
                  placeholder={'Masukkan Nama Kelas'}
                  isInputFilled={'Form Nama Kelas Sudah Terisi'}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <ButtonSolidPrimary text={'Tambah kelas'} width={'w-auto'} onClick={() => handleCreate(values)} />
                <Link to={'/kelas'}>
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
