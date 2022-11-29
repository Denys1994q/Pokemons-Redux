import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    searchPokemons_filterPokemons,
    searchPokemons_sortPokemons,
    searchPokemons_openSortedBlock,
} from "../searchPokemonsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";

import SearchSelect from "./selects/SearchSelect";

const SearchSortPanel = () => {
    const openSortedBlock = useSelector(state => state.searchPokemonsSlice.openSortedBlock);

    const dispatch = useDispatch();

    const [activeType, setActiveType] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const data = ["height", "weight", "experience"];

    const showData = data.map((item, i) => {
        return (
            <li
                key={i}
                style={{ background: i === activeType ? "#FA7070" : null }}
                className='sorted-panel__list-item'
                onClick={() => sort(item, i)}>
                {item}
            </li>
        );
    });

    const sort = (type, i) => {
        if (i !== activeType) {
            setActiveType(i);
            dispatch(searchPokemons_sortPokemons(type));
        } else {
            setActiveType(null);
            selectedType
                ? dispatch(searchPokemons_filterPokemons(selectedType))
                : dispatch(searchPokemons_filterPokemons(""));
        }
    };

    return (
        <>
            <div className='sorted-panel'>
                Sort & Filter
                <span onClick={() => dispatch(searchPokemons_openSortedBlock())}>
                    {openSortedBlock ? <i className='fa fa-caret-up'></i> : <i className='fa fa-caret-down'></i>}
                </span>
            </div>
            <div style={{ display: openSortedBlock ? "block" : "none" }} className='sorted-panel__wrapper'>
                <ul className='sorted-panel__list'>
                    <li className='sorted-panel__select'>
                        <SearchSelect type={"types"} setSelectedType={setSelectedType} />
                    </li>
                    <FontAwesomeIcon
                        className='sorted-panel__listIcon'
                        icon={faGripLines}
                        size='2x'
                        rotation={90}
                        inverse
                    />
                    {showData}
                </ul>
            </div>
        </>
    );
};

export default SearchSortPanel;
