import { Formik } from 'formik';
import { requestUpdate } from '../api/requestUpdate';
import { requestGetByID } from '../api/requestGetByID';
import { validationSchema } from './validationSchema';
import { useEffect, useState } from 'react';
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import InputText from '../../../../components/forms/Input/InputText';
import BreadcrumbsBasic from '../../../../components/breadcrumbs/BreadcrumbsBasic';
import ButtonSolidDanger from '../../../../components/buttons/solid/ButtonSolidDanger';
import ButtonSolidSuccess from '../../../../components/buttons/solid/ButtonSolidSuccess';

const FormEdit = () => {
  const navigate = useNavigate();
  const { id_kelas } = useParams();
  const [namaKelas, setNamaKelas] = useState('');

  useEffect(() => {
    requestGetByID(id_kelas ?? '').then((response) => {
      setNamaKelas(response?.data?.nama_kelas || '');
    });
  }, []);

  const handleSubmit = async (e: { nama_kelas: string }): Promise<any> => {
    try {
      const { nama_kelas } = e;
      const request = await requestUpdate(id_kelas ?? '', nama_kelas);

      if (request) {
        navigate('/kelas');
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
            label: 'Kelas',
            link: '/kelas',
          },
          {
            label: 'Edit Kelas',
            link: `/kelas/edit-kelas/${id_kelas}`,
          },
        ]}
      />

      <div className="mt-10">
        <Formik
          enableReinitialize={true}
          initialValues={{
            nama_kelas: namaKelas,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, handleChange, submitCount, values }) => (
            <Form className="space-y-5">
              <div className={submitCount ? (errors.nama_kelas ? 'has-error' : 'has-success') : ''}>
                <InputText
                  id={'nama_kelas'}
                  name={'nama_kelas'}
                  label={'Kelas'}
                  value={values.nama_kelas}
                  onChange={handleChange}
                  error={errors.nama_kelas || ''}
                  placeholder={'Masukkan Nama Kelas'}
                  isInputFilled={'Kelas Sudah Terisi'}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <ButtonSolidSuccess text={'Edit Kelas'} width={'w-auto'} onClick={() => handleSubmit(values)} />
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

export default FormEdit;
