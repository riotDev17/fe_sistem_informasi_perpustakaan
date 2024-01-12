import { Formik } from 'formik';
import { validationSchema } from './validationSchema';
import { requestPeminjamanBuku } from '../../api/requestPeminjamanBuku';
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import BukuSelect from '../../../../../utils/BukuSelect';
import CetakKartuSiswa from '../../../siswa/CetakKartuSiswa';
import ButtonSolidDanger from '../../../../../components/buttons/solid/ButtonSolidDanger';
import BreadcrumbsDefault from '../../../../../components/breadcrumbs/BreadcrumbsDefault';
import ButtonSolidPrimary from '../../../../../components/buttons/solid/ButtonSolidPrimary';

const FormPeminjamanBuku = () => {
  const navigate = useNavigate();
  const { id_siswa } = useParams();

  const handlePeminjamanBuku = async (e: { id_buku: string }) => {
    try {
      const { id_buku } = e;
      const request = await requestPeminjamanBuku(id_siswa, id_buku);

      if (request) {
        navigate('/peminjaman-buku');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Peminjaman Buku"
        menus={[
          {
            label: 'Peminjaman Buku',
            link: '/peminjaman-buku',
            icon: 'material-symbols:book',
          },
          {
            label: 'Tambah Peminjaman Buku',
            link: `/peminjaman-buku/tambah-peminjaman-buku/${id_siswa}`,
          },
        ]}
      />

      <div className="mt-5">
        <CetakKartuSiswa />
      </div>

      <div className="mt-10">
        <Formik
          initialValues={{
            id_buku: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handlePeminjamanBuku}
        >
          {({ errors, setFieldValue, submitCount, values }) => (
            <Form className="space-y-5">
              <div className={submitCount ? (errors.id_buku ? 'has-error' : 'has-success') : ''}>
                <BukuSelect
                  id={'id_buku'}
                  name={'id_buku'}
                  label={'Buku'}
                  value={values.id_buku}
                  error={errors.id_buku || ''}
                  onChange={(e: any) => {
                    setFieldValue('id_agama', (values.id_buku = e.value));
                  }}
                  placeholder={'Pilih Buku'}
                  isInputFilled={'Form Buku Sudah Dipilih'}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <ButtonSolidPrimary text={'Pinjam Buku'} width={'w-auto'} onClick={() => handlePeminjamanBuku(values)} />
                <Link to={'/peminjaman-buku'}>
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

export default FormPeminjamanBuku;
