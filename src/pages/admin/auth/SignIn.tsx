import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { validationSchema } from './validation/validationSchema';
import InputText from '../../../components/forms/Input/InputText';
import InputPassword from '../../../components/forms/Input/InputPassword';
import InputCheckbox from '../../../components/forms/Input/InputCheckbox';
import ButtonSolidPrimary from '../../../components/buttons/solid/ButtonSolidPrimary';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Admin | Login'));
  });

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen">
      <div className="min-h-screen hidden lg:flex flex-col items-center justify-center text-white dark:text-black">
        <img src="/assets/images/auth/library.jpg" alt="image login" className="w-screen h-screen" />
      </div>
      <div className="w-full lg:w-1/2 relative flex justify-center items-center">
        <div className="w-96 xl:p-0 lg:p-5 p-5">
          <h2 className="font-bold text-3xl mb-3">Login Admin</h2>
          <p className="mb-7">Masukkan username dan password untuk login</p>

          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, handleChange, submitCount, values }) => (
              <Form className="space-y-5">
                <div className={submitCount ? (errors.username ? 'has-error' : 'has-success') : ''}>
                  <InputText
                    id={'username'}
                    name={'username'}
                    label={'Username'}
                    value={values.username}
                    onChange={handleChange}
                    error={errors.username || ''}
                    placeholder={'Masukkan Username'}
                    isInputFilled={'Username Sudah Terisi'}
                  />
                </div>
                <div className={submitCount ? (errors.password ? 'has-error' : 'has-success') : ''}>
                  <InputPassword
                    id={'password'}
                    name={'password'}
                    label={'Password'}
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password || ''}
                    placeholder={'Masukkan Password'}
                    isInputFilled={'Password Sudah Terisi'}
                  />
                </div>
                <div>
                  <InputCheckbox id={'rememberMe'} name={'rememberMe'} text={'Ingatkan Saya'} />
                </div>
                <ButtonSolidPrimary
                  text={'Login'}
                  onClick={() => {
                    if (values.username && values.password && !errors.username && !errors.password) {
                      handleSubmit(values);
                    } else {
                      console.log('error');
                    }
                  }}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
