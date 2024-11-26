import React, { useRef } from 'react'
import { setAuthToken } from '../../utilities/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { LoginData } from '../../types/user.types';
import FormInput from '../../components/FormInput/FormInput';
import MyButton from '../../components/MyButton/MyButton';
import { loginUserApi } from '../../apis/user.apis';
import { presentToast } from '../../utilities/tool';




const LoginPage = () => {

  /**************************************************
  * Hookes & Others
  */
  const navigate = useNavigate();
  const loginFormRef = useRef<FormikProps<LoginData>>(null);
  const initialLoginData: LoginData = {};
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });


  /**************************************************
  * Functions
  */
  async function handleLoginSubmit() {
    const user: LoginData = loginFormRef.current?.values || {};
    await loginFormRef.current?.validateForm();
    if (loginFormRef.current?.isValid) {
      loginUserApi(user).then((token) => {
        setAuthToken(token);
        navigate('/logged-in-redirect');
      }, err => {
      })
    } else {
      presentToast('Please fill all the details!', 'warning');
    }
  };


  /**************************************************
  * Template
  */
  return (
    <>
      <Formik innerRef={loginFormRef} initialValues={initialLoginData} validationSchema={validationSchema}
        onSubmit={(event: any) => { event.preventDefault(); handleLoginSubmit() }}>
        {
          <Form>
            <div className='w-full grid grid-cols-1 gap-3'>
              <div className='text-3xl font-bold text-center mb-5'>
                Login
              </div>
              <div className='grid grid-cols-1 gap-2'>
                <FormInput type='email' label='Email' name='email' placeholder='johndoe@gmail.com' />
                <FormInput type='password' label='Password' name='password' placeholder='********' />
              </div>
              <div className='w-full flex justify-end mt-2'>
              </div>
              <div className='flex items-center justify-between mt-2'>
                <Link className='cursor-pointer text-blue-500 hover:underline' to={'/register'}>Register</Link>
                <MyButton onBtnClick={handleLoginSubmit} label='Login' type='submit' />
              </div>
            </div>
          </Form>
        }
      </Formik>
    </>
  )
}


export default LoginPage