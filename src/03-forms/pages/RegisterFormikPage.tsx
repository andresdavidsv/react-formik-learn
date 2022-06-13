import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '../components';

import '../styles/styles.css';

export const RegisterFormikPage = () => {
  return (
    <div>
      <h1>Register Page</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password1: '',
          password2: '',
        }}
        onSubmit={(values) => {
          return console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, 'Should be 2 characters or more')
            .max(15, 'Should be 15 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Email is not validate')
            .required('Required'),
          password1: Yup.string()
            .min(6, 'Should be 6 characters or more')
            .required('Required'),
          password2: Yup.string()
            .oneOf([Yup.ref('password1')], 'Password are not equal')
            .required('Required'),
        })}>
        {({ handleReset }) => (
          <Form>
            <MyTextInput label={'Name'} name={'name'} placeholder={'Name'} />

            <MyTextInput
              label={'Email Address'}
              name={'email'}
              placeholder={'Email Address'}
              type="email"
            />

            <MyTextInput
              label={'Password'}
              name={'password1'}
              placeholder={'Password'}
              type="password"
            />

            <MyTextInput
              label={'Repat Password'}
              name={'password2'}
              placeholder={'Repeat Password'}
              type="password"
            />

            <button type="submit">Submit</button>
            <button type="submit" onClick={handleReset}>
              Reset Password
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
