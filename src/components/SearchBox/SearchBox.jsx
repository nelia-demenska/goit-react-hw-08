import css from './SearchBox.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from "../../redux/filtersSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

export default function SearchBox() {

    const dispatch = useDispatch();
    const filter = useSelector(selectNameFilter);

    return (
        <>
        <p className={css.filter}>Find contacts by name</p>
            <input
                className={css.input}
                type="text"
                value={filter}
                onChange={(e) => dispatch(changeFilter(e.target.value))} />
            </>
    )
};