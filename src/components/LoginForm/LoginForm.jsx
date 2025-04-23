import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import css from './LoginForm.module.css';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email')
    .required('Required'),
    password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Required'),
});

export default function LoginForm() {
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
    dispatch(logIn(values));
    resetForm();
    };

    return (
    <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
    >
        <Form className={css.form}>
        <div className={css.group}>
            <label className={css.label} htmlFor="email">Email:</label>
            <Field className={css.input} type="email" name="email" id="email" autoComplete="email"/>
            <ErrorMessage className={css.error} name="email" component="span" />
        </div>

        <div className={css.group}>
            <label className={css.label} htmlFor="password">Password:</label>
            <Field className={css.input} type="password" name="password" id="password" autoComplete="current-password"/>
            <ErrorMessage className={css.error} name="password" component="span" />
        </div>

        <button className={css.button} type="submit">Log In</button>
        </Form>
    </Formik>
    );
}