import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/FormInput/FormInput';

const LoginForm = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    console.log('Form Submitted:', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <FormInput
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
          />

          <FormInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
          />

          <button type="submit" className="btn-primary">
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
