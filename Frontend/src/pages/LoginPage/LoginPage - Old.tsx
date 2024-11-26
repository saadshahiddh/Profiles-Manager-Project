import React, { useState } from 'react'
import { AuthUser } from '../../types/global.types'
import { presentToast } from '../../utilities/tool';
import { setAuthToken } from '../../utilities/auth';
import { Link, useNavigate } from 'react-router-dom';
import { LoginData } from '../../types/user.types';

type LoginErrors = Partial<LoginData>;

const LoginPage = () => {
  /**************************************************
  * Hookes & Others
  */
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
  const [loginFormErrors, setLoginFormErrors] = useState<LoginErrors>();


  /**************************************************
  * Functions
  */
  function validateForm() {
    const formErrors: LoginErrors = {};
    const { email, password } = loginData;

    if (!email || !email.trim()) {
      formErrors['email'] = 'Email is required';
    } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) {
      formErrors['email'] = 'Invalid Email';
    }

    if (!password || !password.trim()) {
      formErrors['password'] = 'Password is required';
    }

    setLoginFormErrors(formErrors);
    return !Object.keys(formErrors).length;
  }

  function handleInputChange({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) {
    setLoginData(prevData => { return { ...prevData, [name]: value } });
    setLoginFormErrors(prevData => { return { ...prevData, [name]: '' } });
  }


  function handleSubmit(event: React.FormEvent) {
    if (event) {
      event.preventDefault();
    }
    if (validateForm()) {
      const { email, password } = loginData;
      if (email !== 'johndoe@gmail.com') {
        presentToast('Email does not exist!', 'error');
      } else if (password !== '123456789') {
        presentToast('Invalid password!', 'error');
      } else {
        presentToast('Logged in successfully!', 'success');
        const authUser: AuthUser = { name: 'John Doe', email };
        setAuthToken(JSON.stringify(authUser));
        navigate('/logged-in-redirect');
      }
    }
  }



  /**************************************************
  * Template
  */
  return (
    <>
      <form className='w-full grid grid-cols-1 gap-3'>
        <div className='text-3xl font-bold text-center mb-5'>
          Login
        </div>
        <div>
          <div className='text-gray-600 font-medium text-sm mb-1'>Name</div>
          <input type="text" placeholder='johndoe@gmail.com' name='email' value={loginData?.email || ''} onChange={handleInputChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
          {(loginFormErrors && loginFormErrors.email) && <div className='text-red-500 text-sm mt-1'>{loginFormErrors.email}</div>}
        </div>
        <div>
          <div className='text-gray-600 font-medium text-sm mb-1'>Password</div>
          <input type="password" placeholder='********' name='password' value={loginData?.password || ''} onChange={handleInputChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
          {(loginFormErrors && loginFormErrors.password) && <div className='text-red-500 text-sm mt-1'>{loginFormErrors.password}</div>}
        </div>
        <div className='flex items-center justify-between'>
          <Link className='cursor-pointer text-blue-500 hover:underline' to={'/register'}>Register</Link>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700">
            Login
          </button>
        </div>
      </form>
    </>
  )
}

export default LoginPage