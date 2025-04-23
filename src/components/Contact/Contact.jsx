import css from './Contact.module.css'
import { FaUser } from 'react-icons/fa'
import { FaPhone } from 'react-icons/fa6'
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { useState } from 'react';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import EditContactModal from '../EditContactModal/EditContactModal';
import { toast } from 'react-hot-toast';


export default function Contact ({ contact }) {
    const dispatch = useDispatch();
    const { id, name, number } = contact;

    const [openModal, setOpenModal] = useState(false);
    const [isEditOpen, setEditOpen] = useState(false);


    const handleDelete = () => {
    dispatch(deleteContact(id))
    .unwrap()
    .then(() => toast.success(`${name} has been deleted`))
    .catch(() => toast.error('Failed to delete contact'));
    setOpenModal(false);
};

    return (
        <>
        <li className={css.item}>
        <div className={css.contacts}>
            <div> <FaUser className={css.icon}/>  {name} </div>
            <div> <FaPhone className={css.icon}/>  {number} </div>
                </div>
                <div className={css.button}>
                    <button onClick={() => setEditOpen(true)}>Edit</button>
                    <button onClick={() => setOpenModal(true)}>Delete</button>
                </div>
                {isEditOpen && (
        <EditContactModal contact={contact} onClose={() => setEditOpen(false)} />
        )}
        </ li>
        <ConfirmDeleteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleDelete}
        />
        </>
            );
};