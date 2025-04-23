import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css'

export default function AuthNav  () {
    return (
    <nav>
        <NavLink className={css.authnav} to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
    </nav>
    );
};