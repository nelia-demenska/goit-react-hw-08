import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css'

export default function Navigation () {
    return (
        <nav >
        <NavLink className={css.menu} to="/">Home</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
    </nav>
    );
};