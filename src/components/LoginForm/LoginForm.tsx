import { logIn } from "../../redux/auth/operations";
import { Form, Field, Formik, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../redux/store";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email().trim().required(),
    password: Yup.string().min(5).trim().required(),
  });

  const handleSubmit = (
    values: FormValues,
    options: FormikHelpers<FormValues>
  ) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("login success");
      })
      .catch(() => {
        toast.error("login error");
      });

    options.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            Email
            <Field type="email" name="email" />
            <ErrorMessage name="email" className="error" component="div" />
          </label>
          <label className={css.label}>
            Password
            <Field type="password" name="password" />
            <ErrorMessage name="password" className="error" component="div" />
          </label>
          <button type="submit">Log In</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
