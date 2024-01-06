import React, { useEffect } from 'react';
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import BreadcrumbsBasic from '../../../../components/breadcrumbs/BreadcrumbsBasic';
import { Formik } from 'formik';
import { validationSchema } from './validationSchema';
import InputText from '../../../../components/forms/Input/InputText';
import ButtonSolidDanger from '../../../../components/buttons/solid/ButtonSolidDanger';
import ButtonSolidSuccess from '../../../../components/buttons/solid/ButtonSolidSuccess';
import { GETBYID } from '../api/GETBYID';
import { PUT } from '../api/PUT';

const FormEdit = () => {
  const navigate = useNavigate();
  const { id_agama } = useParams();
  const [namaAgama, setNamaAgama] = React.useState('');

  useEffect(() => {
    GETBYID(id_agama ?? '').then((response) => {
      setNamaAgama(response?.data?.nama_agama || '');
    });
  }, []);

  const handleSubmit = async (e: { nama_agama: string }): Promise<any> => {
    try {
      const { nama_agama } = e;
      const request = await PUT(id_agama ?? '', nama_agama);

      if (request) {
        navigate('/agama');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BreadcrumbsBasic
        menus={[
          {
            label: 'Agama',
            link: '/agama',
          },
          {
            label: 'Edit Agama',
            link: `/agama/edit-agama/${id_agama}`,
          },
        ]}
      />

      <div className="mt-10">
        <Formik
          enableReinitialize={true}
          initialValues={{
            nama_agama: namaAgama,
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
                <ButtonSolidSuccess text={'Edit Agama'} width={'w-auto'} onClick={() => handleSubmit(values)} />
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

export default FormEdit;
