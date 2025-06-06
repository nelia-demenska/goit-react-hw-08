import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { useAuth } from '../../hooks/useAuth';
import css from './UserMenu.module.css'

export default function UserMenu () {
    const dispatch = useDispatch();
    const { user } = useAuth();

    return (
        <div className={css.usermenu}>
        <p>Welcome, {user.name}</p>
            <button className={css.button} type="button" onClick={() => dispatch(logOut())}>
        Logout
        </button>
    </div>
    );
};