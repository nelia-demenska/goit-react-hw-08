import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import css from './ContactForm.module.css';
import { toast } from 'react-hot-toast';

export default function ContactForm() {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);

    const ContactSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
    number: Yup.string()
        .matches(/^\+?\d{7,14}$/, 'Phone number is not valid')
        .required('Required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
    const { name, number } = values;

    const isDuplicateName = contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const isDuplicateNumber = contacts.some(
        contact => contact.number === number
    );

    if (isDuplicateName || isDuplicateNumber) {
        toast.error('This contact already exists.');
        return;
    }

    try {
        await dispatch(addContact({ name, number })).unwrap();
        toast.success(`${name} added successfully`);
        resetForm();
    } catch {
        toast.error('Failed to add contact');
    }
    };

    return (
    <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
    >
        <Form className={css.form}>
        <div className={css.group}>
            <label className={css.label} htmlFor="name">Name:</label>
            <Field className={css.input} type="text" name="name" />
            <ErrorMessage className={css.error} name="name" component="span" />
        </div>

        <div className={css.group}>
            <label className={css.label} htmlFor="number">Phone:</label>
            <Field className={css.input} type="tel" name="number" />
            <ErrorMessage className={css.error} name="number" component="span" />
        </div>

        <button className={css.button} type="submit">
            Add contact
        </button>
        </Form>
    </Formik>
    );
}

