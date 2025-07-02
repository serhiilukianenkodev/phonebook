import { Form, Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useId } from "react";

import css from "./ContactForm.module.css";
import { addContact } from "../../redux/contacts/operations";
import { useAppDispatch } from "../../redux/store";

interface FormValues {
  name: string;
  number: string;
}

const initialValues: FormValues = {
  name: "",
  number: "",
};

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .trim()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const ContactForm = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  const nameFieldId = useId();
  const numberFieldId = useId();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      {({ isValid, dirty }) => (
        <Form className={css.addContactForm}>
          <div className={css.fieldWrapper}>
            <label htmlFor={nameFieldId}>Name</label>
            <Field
              type="text"
              name="name"
              id={nameFieldId}
              className={css.formField}
            />
            <ErrorMessage
              name="name"
              component="span"
              className={css.errorField}
            />
          </div>

          <div className={css.fieldWrapper}>
            <label htmlFor={numberFieldId}>Number</label>
            <Field
              type="text"
              name="number"
              id={numberFieldId}
              className={css.formField}
            />
            <ErrorMessage
              name="number"
              component="span"
              className={css.errorField}
            />
          </div>

          <button
            type="submit"
            className={css.formSubmitBtn}
            disabled={!isValid || !dirty}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
