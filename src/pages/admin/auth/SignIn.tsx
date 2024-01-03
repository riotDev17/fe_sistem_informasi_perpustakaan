import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect } from 'react';
import InputText from '../../../components/forms/Input/InputText';
import InputPassword from '../../../components/forms/Input/InputPassword';
import ButtonSolidPrimary from '../../../components/buttons/solid/ButtonSolidPrimary';
import CheckboxDefaultPrimary from '../../../components/forms/checkbox/default/CheckboxDefaultPrimary';

const LoginCover = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Admin | Login'));
  });
  const navigate = useNavigate();

  const submitForm = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      <div className="min-h-screen hidden lg:flex flex-col items-center justify-center text-white dark:text-black">
        <img src="/assets/images/auth/library.jpg" alt="image login" className="w-screen h-screen" />
      </div>
      <div className="w-full lg:w-1/2 relative flex justify-center items-center">
        <div className="w-96 lg:p-0 p-5">
          <h2 className="font-bold text-3xl mb-3">Sign In</h2>
          <p className="mb-7">Enter your username and password to login</p>
          <form className="space-y-5" onSubmit={submitForm}>
            <div>
              <InputText
                id={'username'}
                name={'username'}
                label={'Username'}
                value={''}
                error={''}
                placeholder={'Enter Username'}
                onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </div>
            <div>
              <InputPassword
                id={'password'}
                name={'password'}
                label={'Password'}
                value={''}
                error={''}
                placeholder={'Enter password'}
                onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </div>
            <div>
              <CheckboxDefaultPrimary text={'Remember me'} />
            </div>
            <ButtonSolidPrimary text={'SIGN IN'} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginCover;
