import { Formik } from 'formik';
import { validationSchema } from './validationSchema';
import { requestUpdateKelas } from '../api/requestUpdateKelas';
import { useEffect, useState } from 'react';
import { requestGetByIDkelas } from '../api/requestGetByIDKelas';
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import InputText from '../../../../components/forms/Input/InputText';
import ButtonSolidDanger from '../../../../components/buttons/solid/ButtonSolidDanger';
import ButtonSolidSuccess from '../../../../components/buttons/solid/ButtonSolidSuccess';
import BreadcrumbsDefault from '../../../../components/breadcrumbs/BreadcrumbsDefault';

const FormEdit = () => {
  const navigate = useNavigate();
  const { id_kelas } = useParams();
  const [namaKelas, setNamaKelas] = useState('');

  useEffect(() => {
    requestGetByIDkelas(id_kelas ?? '').then((response) => {
      setNamaKelas(response?.data?.nama_kelas || '');
    });
  }, []);

  const handleUpdate = async (e: { nama_kelas: string }): Promise<any> => {
    try {
      const { nama_kelas } = e;
      const request = await requestUpdateKelas(id_kelas ?? '', nama_kelas);

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
          onSubmit={handleUpdate}
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
                <ButtonSolidSuccess text={'Edit Kelas'} width={'w-auto'} onClick={() => handleUpdate(values)} />
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
