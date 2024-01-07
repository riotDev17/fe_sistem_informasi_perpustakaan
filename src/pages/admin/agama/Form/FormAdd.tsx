import { Formik } from 'formik';
import { requestCreate } from '../api/requestCreate';
import { validationSchema } from './validationSchema';
import { Form, Link, useNavigate } from 'react-router-dom';
import InputText from '../../../../components/forms/Input/InputText';
import ButtonSolidDanger from '../../../../components/buttons/solid/ButtonSolidDanger';
import ButtonSolidPrimary from '../../../../components/buttons/solid/ButtonSolidPrimary';
import BreadcrumbsDefault from '../../../../components/breadcrumbs/BreadcrumbsDefault';

const FormAdd = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: { nama_agama: string }): Promise<any> => {
    try {
      const { nama_agama } = e;
      const request = await requestCreate(nama_agama);

      if (request) {
        navigate('/agama');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <BreadcrumbsDefault
          menus={[
            {
              label: 'Agama',
              link: '/agama',
              icon: 'mdi:religion-christian',
            },
            {
              label: 'Tambah Agama',
              link: '/agama/tambah-agama',
            },
          ]}
        />
      </div>

      <div className="mt-10">
        <Formik
          initialValues={{
            nama_agama: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, handleChange, submitCount, values }) => (
            <Form className="space-y-5">
              <div className={submitCount ? (errors.nama_agama ? 'has-error' : 'has-success') : ''}>
                <InputText
                  id={'nama_agama'}
                  name={'nama_agama'}
                  label={'Agama'}
                  value={values.nama_agama}
                  onChange={handleChange}
                  error={errors.nama_agama || ''}
                  placeholder={'Masukkan Nama Agama'}
                  isInputFilled={'Agama Sudah Terisi'}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <ButtonSolidPrimary text={'Tambah Agama'} width={'w-auto'} onClick={() => handleSubmit(values)} />
                <Link to={'/agama'}>
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
