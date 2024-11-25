import React, { useState } from 'react'
import { AuthUser } from '../../types/global.types'
import { presentToast } from '../../utilities/tool';
import { setAuthToken } from '../../utilities/auth';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RegisterData } from '../../types/user.types';
import FormInput from '../../components/FormInput/FormInput';
import MyButton from '../../components/MyButton/MyButton';



type RegisterErrors = Partial<RegisterData>;

const RegisterPage = () => {
  /**************************************************
  * Hookes & Others
  */
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState<RegisterData>({ email: '', password: '' });
  const [registerFormErrors, setRegisterFormErrors] = useState<RegisterErrors>();


  /**************************************************
  * Functions
  */
  function validateForm() {
    const formErrors: RegisterErrors = {};
    const { email, password } = registerData;

    if (!email || !email.trim()) {
      formErrors['email'] = 'Email is required';
    } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) {
      formErrors['email'] = 'Invalid Email';
    }

    if (!password || !password.trim()) {
      formErrors['password'] = 'Password is required';
    }

    setRegisterFormErrors(formErrors);
    return !Object.keys(formErrors).length;
  }

  function handleInputChange({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) {
    setRegisterData(prevData => { return { ...prevData, [name]: value } });
    setRegisterFormErrors(prevData => { return { ...prevData, [name]: '' } });
  }



  const initialRegisterData: RegisterData = { email: '', password: '' };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
  });

  const handleSubmit = (values: any) => {
    console.log('Form Data:', values);
  };


  /**************************************************
  * Template
  */
  return (
    <>
      <Formik initialValues={{}} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div className="w-full h-full flex items-center justify-center">
            <div className='shadow border p-5 min-w-96'>
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
                  <MyButton onBtnClick={() => handleSubmit({})} label='Register' type='submit' />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default RegisterPage