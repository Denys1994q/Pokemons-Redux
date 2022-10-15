import "../search_SortPanel/search_Sort_Panel.sass";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemons, sortPokemons } from "../../../store/reducer";
import { showOpenSortedBlock } from "../../../store/reducer";
import SearchSelect from "./selects/SearchSelect";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";

const SearchSortPanel = () => {
    // класна анімація на покеболи і на кнопку https://fontawesome.com/docs/web/use-with/react/style#size

    const openSortedBlock = useSelector((state) => state.openSortedBlock);

    const dispatch = useDispatch();

    const [activeType, setActiveType] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const data = ["height", "weight", "experience"];

    const showData = data.map((item, i) => {
        return (
            <li
                key={i}
                style={{ background: i === activeType ? "#FA7070" : null }}
                onClick={() => sort(item, i)}
            >
                {item}
            </li>
        );
    });

    const sort = (type, i) => {
        if (i !== activeType) {
            setActiveType(i);
            dispatch(sortPokemons(type));
        } else {
            setActiveType(null);
            selectedType ? dispatch(filterPokemons(selectedType)) : dispatch(filterPokemons(""));
        }
    };

    return (
        <>
            <div className='opened-sort'>
                Sort & Filter
                <span onClick={() => dispatch(showOpenSortedBlock())}>
                    {openSortedBlock ? (
                        <i className='fa fa-caret-up'></i>
                    ) : (
                        <i className='fa fa-caret-down'></i>
                    )}
                </span>
            </div>
            <div style={{ display: openSortedBlock ? "block" : "none" }} className='sorted-wrapper'>
                <ul className='sorted'>
                    <li className='sorted-types'>
                        <SearchSelect type={"types"} setSelectedType={setSelectedType} />
                    </li>
                    {/* <li className='sorted-types'>
                        <SearchSelect type={"abilities"} setSelectedType={setSelectedType} />
                    </li> */}
                    <FontAwesomeIcon icon={faGripLines} size='2x' rotation={90} inverse />
                    {showData}
                </ul>
            </div>
        </>
    );
};

export default SearchSortPanel;
