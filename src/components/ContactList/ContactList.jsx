import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contacts/selectors';
import { selectNameFilter, selectPhoneFilter } from '../../redux/filters/selectors';
import css from './ContactList.module.css';

export default function ContactList() {
    const contacts = useSelector(selectContacts);
    const nameFilter = useSelector(selectNameFilter);
    const phoneFilter = useSelector(selectPhoneFilter);

    const filteredContacts = contacts.filter(contact => {
    const nameMatch = nameFilter === '' || contact?.name?.toLowerCase().includes(nameFilter.toLowerCase());
    const phoneMatch = phoneFilter === '' || contact?.number?.toString().toLowerCase().includes(phoneFilter.toLowerCase());
    return nameMatch && phoneMatch;
});

    return (
        <ul className={css.list}>
            {filteredContacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
            ))}
        </ul>
    );
}