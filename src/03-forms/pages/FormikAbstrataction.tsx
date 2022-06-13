import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyCheckbox, MySelect, MyTextInput } from '../components';

import '../styles/styles.css';

export const FormikAbstrataction = () => {
  return (
    <div>
      <h1>Formik Abstractation</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          terms: false,
          jobType: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Should be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(15, 'Should be 15 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Email is not validate')
            .required('Required'),
          terms: Yup.boolean().oneOf(
            [true],
            'Should be accepts Terms and Conditions'
          ),
          jobType: Yup.string()
            .notOneOf(['it-jr'], 'This actions is not allowed')
            .required('Required'),
        })}>
        {(formik) => (
          <Form>
            <MyTextInput
              label={'First Name'}
              name={'firstName'}
              placeholder={'First Name'}
            />

            <MyTextInput
              label={'Last Name'}
              name={'lastName'}
              placeholder={'Last Name'}
            />

            <MyTextInput
              label={'Email Address'}
              name={'email'}
              placeholder={'Email Address'}
              type="email"
            />

            <MySelect label={'Job Type'} name={'jobType'}>
              <option value="">Pick Something</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="it-senior">IT Senior</option>
              <option value="it-jr">IT Junior</option>
            </MySelect>

            <MyCheckbox label={'Terms & Conditions'} name={'terms'} />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
