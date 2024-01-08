import { Formik } from 'formik';
import { requestCreate } from '../api/requestCreate';
import { validationSchema } from './validationSchema';
import { Form, Link, useNavigate } from 'react-router-dom';
import InputText from '../../../../components/forms/Input/InputText';
import ButtonSolidDanger from '../../../../components/buttons/solid/ButtonSolidDanger';
import ButtonSolidPrimary from '../../../../components/buttons/solid/ButtonSolidPrimary';
import BreadcrumbsDefault from '../../../../components/breadcrumbs/BreadcrumbsDefault';
import InputNumber from '../../../../components/forms/Input/InputNumber';

const FormAdd = () => {
  const navigate = useNavigate();

  const handleCreate = async (e: { nominal: number }): Promise<any> => {
    try {
      const { nominal } = e;
      const request = await requestCreate(nominal);

      if (request) {
        navigate('/denda');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Denda"
        menus={[
          {
            label: 'Denda',
            link: '/denda',
            icon: 'mdi:dollar',
          },
          {
            label: 'Tambah Denda',
            link: '/denda/tambah-denda',
          },
        ]}
      />

      <div className="mt-10">
        <Formik
          initialValues={{
            nominal: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreate}
        >
          {({ errors, handleChange, submitCount, values }) => (
            <Form className="space-y-5">
              <div className={submitCount ? (errors.nominal ? 'has-error' : 'has-success') : ''}>
                <InputNumber
                  id={'nominal'}
                  name={'nominal'}
                  label={'Nominal Denda'}
                  value={values.nominal}
                  onChange={handleChange}
                  error={errors.nominal || ''}
                  placeholder={'Masukkan Nominal Denda'}
                  isInputFilled={'Form Nominal Denda Sudah Terisi'}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <ButtonSolidPrimary text={'Tambah Denda'} width={'w-auto'} onClick={() => handleCreate(values)} />
                <Link to={'/denda'}>
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
