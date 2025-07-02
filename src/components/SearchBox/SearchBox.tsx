import { useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { selectNameFilter } from "../../redux/filters/selectors";
import { changeFilter } from "../../redux/filters/slice";
import { useAppDispatch } from "../../redux/store";
import { FormEvent } from "react";

const SearchBox = () => {
  const filter = useSelector(selectNameFilter);
  const dispatch = useAppDispatch();

  const handleChange = (evt: FormEvent<HTMLInputElement>) => {
    dispatch(changeFilter(evt.currentTarget.value));
  };
  return (
    <div className={css.searchBox}>
      <h2>Find contacts by name or number</h2>
      <input
        className={css.searchInput}
        type="text"
        name=""
        onChange={handleChange}
        value={filter}
      />
    </div>
  );
};

export default SearchBox;
