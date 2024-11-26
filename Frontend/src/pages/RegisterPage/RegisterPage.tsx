import React, { useRef } from 'react'
import { setAuthToken } from '../../utilities/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { RegisterData } from '../../types/user.types';
import FormInput from '../../components/FormInput/FormInput';
import MyButton from '../../components/MyButton/MyButton';
import { registerUserApi } from '../../apis/user.apis';
import { presentToast } from '../../utilities/tool';




const RegisterPage = () => {

  /**************************************************
  * Hookes & Others
  */
  const navigate = useNavigate();
  const registerFormRef = useRef<FormikProps<RegisterData>>(null);
  const initialRegisterData: RegisterData = {};
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
  });


  /**************************************************
  * Functions
  */
  async function handleRegisterSubmit() {
    const user: RegisterData = registerFormRef.current?.values || {};
    await registerFormRef.current?.validateForm();
    if (registerFormRef.current?.isValid) {
      registerUserApi(user).then((token) => {
        setAuthToken(token);
        navigate('/logged-in-redirect');
        // }, err => {
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
      <Formik innerRef={registerFormRef} initialValues={initialRegisterData} validationSchema={validationSchema}
        onSubmit={(event: any) => { event.preventDefault(); handleRegisterSubmit() }}>
        {
          <Form>
            <div className='w-full grid grid-cols-1 gap-3'>
              <div className='text-3xl font-bold text-center mb-5'>
                Register
              </div>
              <div className='grid grid-cols-1 gap-2'>
                <FormInput type='text' label='Name' name='name' placeholder='John Doe' />
                <FormInput type='email' label='Email' name='email' placeholder='johndoe@gmail.com' />
                <FormInput type='password' label='Password' name='password' placeholder='********' />
                <FormInput type='password' label='Confirm Password' name='confirmPassword' placeholder='********' />
              </div>
              <div className='w-full flex justify-end mt-2'>
              </div>
              <div className='flex items-center justify-between mt-2'>
                <Link className='cursor-pointer text-blue-500 hover:underline' to={'/login'}>Login</Link>
                <MyButton onBtnClick={handleRegisterSubmit} label='Register' type='submit' />
              </div>
            </div>
          </Form>
        }
      </Formik>
    </>
  )
}


export default RegisterPage