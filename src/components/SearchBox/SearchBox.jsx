import { useDispatch, useSelector } from 'react-redux';
import { setNameFilter, setPhoneFilter } from '../../redux/filters/slice';
import { selectNameFilter, selectPhoneFilter } from '../../redux/filters/selectors';
import css from './SearchBox.module.css';

export default function SearchBox() {
    const dispatch = useDispatch();
    const nameFilter = useSelector(selectNameFilter);
    const phoneFilter = useSelector(selectPhoneFilter);

    return (
    <div className={css.wrapper}>
        <label className={css.label}>
        Search by name:
        <input
            className={css.input}
            type="text"
            value={nameFilter}
            onChange={e => dispatch(setNameFilter(e.target.value))}
        />
        </label>

        <label className={css.label}>
        Search by phone:
        <input
            className={css.input}
            type="text"
            value={phoneFilter}
            onChange={e => dispatch(setPhoneFilter(e.target.value))}
        />
        </label>
    </div>
    );
}