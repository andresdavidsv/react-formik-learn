import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MySelect, MyTextInput } from '../components';
import formJson from '../data/custom-form.json';

const initialValues: { [key: string]: any } = {};
const requiredFields: { [key: string]: any } = {};

for (const input of formJson) {
  initialValues[input.name] = input.value;

  if (!input.validations) continue;

  let schema = Yup.string();

  for (const rule of input.validations) {
    if (rule.type === 'required') {
      schema = schema.required('Required');
    }
    if (rule.type === 'minLength') {
      schema = schema.min(
        (rule as any).value || 1,
        `Should be at least ${(rule as any).value}`
      );
    }
    if (rule.type === 'email') {
      schema = schema.email('Email is not validate');
    }
  }
  requiredFields[input.name] = schema;
}

const validationSchema = Yup.object({ ...requiredFields });

export const DynamicForm = () => {
  return (
    <div>
      <h1>DynamicForm</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}>
        {(formik) => (
          <Form noValidate>
            {formJson.map(({ type, name, placeholder, label, options }) => {
              if (type === 'input' || type === 'password' || type === 'email') {
                return (
                  <MyTextInput
                    key={name}
                    type={type as any}
                    name={name}
                    placeholder={placeholder}
                    label={label}
                  />
                );
              } else if (type === 'select') {
                return (
                  <MySelect key={name} name={name} label={label}>
                    <option value={''}>Select an option</option>
                    {options?.map((option) => (
                      <option key={option.label} value={option.id}>
                        {' '}
                        {option.label}{' '}
                      </option>
                    ))}
                  </MySelect>
                );
              }

              throw new Error(`Type: ${type} is not supported`);
            })}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
