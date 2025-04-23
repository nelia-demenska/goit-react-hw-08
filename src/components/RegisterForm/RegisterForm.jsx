import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegisterForm.module.css';

const RegisterSchema = Yup.object().shape({
    name: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .required('Required'),
    email: Yup.string()
    .email('Invalid email')
    .required('Required'),
    password: Yup.string()
    .min(7, 'Minimum 7 characters')
    .required('Required'),
});

export default function RegisterForm() {
    const dispatch = useDispatch();
    
    const handleSubmit = (values, { resetForm }) => {
    const uniqueEmail = values.email.replace('@', `+${Date.now()}@`);
    const updatedValues = { ...values, email: uniqueEmail };

    // console.log('REGISTRATION PAYLOAD:', updatedValues);

    dispatch(register(updatedValues))
    .unwrap()
    .then(() => {
        toast.success('Registration successful!');
        resetForm();
    })
    .catch(error => {
        if (error.includes('11000')) {
        toast.error('This email is already registered');
        } else {
        toast.error(`Registration failed: ${error}`);
        }
    });
};

    return (
    <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
    >
        <Form className={css.form}>
        <div className={css.group}>
            <label className={css.label} htmlFor="name">Name:</label>
            <Field className={css.input} type="text" name="name" />
            <ErrorMessage className={css.error} name="name" component="span" />
        </div>

        <div className={css.group}>
            <label className={css.label} htmlFor="email">Email:</label>
            <Field className={css.input} type="email" name="email" />
            <ErrorMessage className={css.error} name="email" component="span" />
        </div>

        <div className={css.group}>
            <label className={css.label} htmlFor="password">Password:</label>
            <Field className={css.input} type="password" name="password" />
            <ErrorMessage className={css.error} name="password" component="span" />
        </div>

        <button className={css.button} type="submit">Register</button>
        </Form>
    </Formik>
    );
}