import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import { selectContacts } from '../../redux/contactsSlice';
import css from './ContactForm.module.css';

export default function ContactForm() {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);

    const UserSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
    phone: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
    });

    const handleSubmit = (values, { resetForm }) => {
    const { name, phone } = values;
    const isDuplicate = contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
        alert(`${name} is already in contacts.`);
        return;
    }

    dispatch(addContact({ name, phone }));
    resetForm();
    };

    return (
    <Formik
        initialValues={{ name: '', phone: '' }}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
    >
        <Form className={css.form}>
        <div className={css.group}>
            <label className={css.label} htmlFor="name">Name:</label>
            <Field className={css.input} type="text" name="name" />
            <ErrorMessage
            className={css.error}
            name="name"
            component="span"
            />
        </div>

        <div className={css.group}>
            <label className={css.label} htmlFor="phone">Phone:</label>
            <Field className={css.input} type="tel" name="phone" />
            <ErrorMessage
            className={css.error}
            name="phone"
            component="span"
            />
        </div>

        <button className={css.button} type="submit">
            Add contact
        </button>
        </Form>
    </Formik>
    );
}