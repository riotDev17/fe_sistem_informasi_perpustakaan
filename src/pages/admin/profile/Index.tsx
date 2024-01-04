import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { setPageTitle } from '../../../store/themeConfigSlice';
import React, { useEffect } from 'react';
import { validationSchema } from './validation/validationSchema';
import InputFile from '../../../components/forms/Input/InputFile';
import InputText from '../../../components/forms/Input/InputText';
import ButtonSolidPrimary from '../../../components/buttons/solid/ButtonSolidPrimary';
import API from '../../../configs/api';
import Swal from 'sweetalert2';

const Index = () => {
  const dispatch = useDispatch();
  const [admin, setAdmin] = React.useState<any>({ data: { username: '', foto_admin: '' } });
  const [image, setImage] = React.useState<any>('');
  const [imagePreview, setImagePreview] = React.useState<any>('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Profile'));
    getAdmin();
  }, []);

  const getAdmin = async () => {
    try {
      const response = await API.get('/api/admin');
      if (response.status === 200) {
        setAdmin(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfile = async (values: any): Promise<any> => {
    try {
      const dataAdmin = new FormData();
      dataAdmin.append('username', values.username);
      dataAdmin.append('foto_admin', values.foto_admin);

      const response = await API.put(`/api/admin/${admin?.data?.id_admin}`, dataAdmin);
      console.log(response);
      if (response.status === 200) {
        const toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
        });
        toast.fire({
          icon: 'success',
          title: 'Data Admin Berhasil Diubah',
          padding: '10px 20px',
        });
      }
    } catch (error) {
      console.log(error);
      const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: 'error',
        title: 'Data Admin Gagal Diubah',
        padding: '10px 20px',
      });
    }
  };

  const handleUploadImage = async (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <div className="pt-5">
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
        </div>

        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
          <h6 className="text-lg font-bold mb-5">Data Admin</h6>
          <div className="flex flex-col sm:flex-row">
            <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
              ) : (
                <img src={`${import.meta.env.VITE_API_URL}/${admin?.data?.foto_admin}`} alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
              )}
            </div>
            <div className="flex-1 ">
              <Formik
                initialValues={{ username: admin?.data?.username || '', foto_admin: admin?.data?.foto_admin || '' }}
                validationSchema={validationSchema}
                onSubmit={handleUpdateProfile}
                enableReinitialize={true}
              >
                {({ errors, handleChange, submitCount, values }) => (
                  <Form className="">
                    <div className={submitCount ? (errors.username ? 'has-error' : 'has-success') : ''}>
                      <InputText
                        id={'username'}
                        name={'username'}
                        label={'Username'}
                        value={values.username || ''}
                        onChange={handleChange}
                        error={typeof errors.username === 'string' ? errors.username : ''}
                        placeholder={'Masukkan Username'}
                        isInputFilled={'Username Sudah Terisi'}
                      />
                    </div>

                    <div className={submitCount ? (errors.foto_admin ? 'has-error' : 'has-success') : ''}>
                      <InputFile
                        id={'foto_admin'}
                        name={'foto_admin'}
                        label={'Foto Profil'}
                        value={values.foto_admin || ''}
                        error={typeof errors.foto_admin === 'string' ? errors.foto_admin : ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleUploadImage(e);
                        }}
                        isInputFilled={'Foto Sudah Terisi'}
                      />
                    </div>
                    <div className="flex justify-end">
                      <ButtonSolidPrimary text={'Update Profil Admin'} width="w-auto" />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
