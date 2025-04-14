import css from './Contact.module.css'
import { FaUser } from 'react-icons/fa'
import { FaPhone } from 'react-icons/fa6'
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

export default function Contact({ id, name, number }) {

    const dispatch = useDispatch();

    const handleDelete = () => dispatch(deleteContact(id));

return (
    <li className={css.item}>
        <div className={css.contacts}>
            <div> <FaUser className={css.icon}/>  {name} </div>
            <div> <FaPhone className={css.icon}/>  {number} </div>
            </div>
        <button className={css.button} onClick={handleDelete}>Delete</button>
    </li>
    );
}