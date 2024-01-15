import { Formik } from 'formik';
import { validationSchema } from './validationSchema';
import { requestUpdateDenda } from '../api/requestUpdateDenda';
import { useState, useEffect } from 'react';
import { requestGetByIDDenda } from '../api/requestGetByIDDenda';
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import InputText from '../../../../components/forms/Input/InputText';
import ButtonSolidDanger from '../../../../components/buttons/solid/ButtonSolidDanger';
import ButtonSolidSuccess from '../../../../components/buttons/solid/ButtonSolidSuccess';
import BreadcrumbsDefault from '../../../../components/breadcrumbs/BreadcrumbsDefault';

const FormEdit = () => {
  const navigate = useNavigate();
  const { id_denda } = useParams();
  const [nominal, setNominal] = useState(0);

  useEffect(() => {
    requestGetByIDDenda(id_denda ?? '').then((response) => {
      setNominal(response?.data?.nominal || '');
    });
  }, []);

  const handleUpdate = async (e: { nominal: number }): Promise<any> => {
    try {
      const { nominal } = e;
      const request = await requestUpdateDenda(id_denda ?? '', nominal);

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
            label: 'Edit Denda',
            link: `/denda/edit-denda/${id_denda}`,
          },
        ]}
      />

      <div className="mt-10">
        <Formik
          enableReinitialize={true}
          initialValues={{
            nominal: nominal,
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ errors, handleChange, submitCount, values }) => (
            <Form className="space-y-5">
              <div className={submitCount ? (errors.nominal ? 'has-error' : 'has-success') : ''}>
                <InputText
                  id={'nominal'}
                  name={'nominal'}
                  label={'Nominal Denda'}
                  value={values.nominal.toString()}
                  onChange={handleChange}
                  error={errors.nominal || ''}
                  placeholder={'Masukkan Nominal Denda'}
                  isInputFilled={'Form Nominal Denda Sudah Terisi'}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <ButtonSolidSuccess text={'Edit Denda'} width={'w-auto'} onClick={() => handleUpdate(values)} />
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

export default FormEdit;
