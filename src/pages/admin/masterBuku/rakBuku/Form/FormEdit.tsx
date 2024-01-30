import { Formik } from 'formik';
import { validationSchema } from './validationSchema';
import { useState, useEffect } from 'react';
import { requestUpdateRakBuku } from '../api/requestUpdateRakBuku';
import { requestGetByIDRakBuku } from '../api/requestGetByIDRakBuku';
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import InputText from '../../../../../components/forms/Input/InputText';
import ButtonSolidDanger from '../../../../../components/buttons/solid/ButtonSolidDanger';
import ButtonSolidSuccess from '../../../../../components/buttons/solid/ButtonSolidSuccess';
import BreadcrumbsDefault from '../../../../../components/breadcrumbs/BreadcrumbsDefault';

const FormEdit = () => {
  const navigate = useNavigate();
  const { id_rak_buku } = useParams();
  const [namaRakBuku, setNamaRakBuku] = useState('');

  useEffect(() => {
    requestGetByIDRakBuku(id_rak_buku ?? '').then((response) => {
      setNamaRakBuku(response?.data?.nama_rak_buku || '');
    });
  }, []);

  const handleUpdate = async (e: { nama_rak_buku: string }): Promise<any> => {
    try {
      const { nama_rak_buku } = e;
      const request = await requestUpdateRakBuku(id_rak_buku ?? '', nama_rak_buku);

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
            icon: 'mdi:bookshelf',
          },
          {
            label: 'Edit Rak Buku',
            link: `/rak-buku/edit-rak-buku/${id_rak_buku}`,
          },
        ]}
      />

      <div className="mt-10">
        <Formik
          enableReinitialize={true}
          initialValues={{
            nama_rak_buku: namaRakBuku,
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
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
                <ButtonSolidSuccess text={'Edit Rak Buku'} width={'w-auto'} onClick={() => handleUpdate(values)} />
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

export default FormEdit;
