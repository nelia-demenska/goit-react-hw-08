import Contact from "../Contact/Contact";
import css from './ContactList.module.css';
import { useSelector } from "react-redux";
import { selectFilteredContacts } from '../../redux/contactsSlice';

export default function ContactList() {
    
    const contacts = useSelector(selectFilteredContacts);

    return (
    <ul className={css.list}>
        {contacts.map(({ id, name, number }) => (
        <Contact key={id} id={id} name={name} number={number} />
        ))}
    </ul>
    );
};
