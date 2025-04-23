import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { editContact } from '../../redux/contacts/operations';
import { toast } from 'react-hot-toast';
import css from './EditContactModal.module.css';

const EditSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').required('Required'),
    number: Yup.string().min(3, 'Too Short!').required('Required'),
});

export default function EditContactModal({ contact, onClose }) {
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
    dispatch(editContact({ id: contact.id, ...values }))
    .unwrap()
    .then(() => {
        toast.success('Contact updated');
        onClose();
    })
    .catch(() => toast.error('Failed to update'));
};

    return (
    <div className={css.overlay}>
        <div className={css.modal}>
        <h3>Edit contact</h3>
        <Formik
            initialValues={{
            name: contact.name || '',
            number: contact.number || '',
            }}
            validationSchema={EditSchema}
            onSubmit={handleSubmit}
        >
            <Form className={css.form}>
            <label htmlFor="name">
                Name:
                <Field name="name" type="text" />
            </label>
            <label htmlFor="number">
                Phone:
                <Field name="number" type="text" />
            </label>
            <div className={css.buttons}>
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>
                Cancel
                </button>
            </div>
            </Form>
        </Formik>
        </div>
    </div>
    );
}