import "../search_Panel/search_Panel.sass";
import failure from "../../../imgs/sad.jpg";
//
import PacmanLoader from "react-spinners/PacmanLoader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../../../asyncActions/pokemons";
import { setActivePokemon, openComparisonMarks } from "../../../store/reducer";

const SearchPanel = () => {
    const dispatch = useDispatch();

    const showMarks = useSelector((state) => state.addComparisonMark);

    const [searchTextFromInput, setSearchTextFromInput] = useState("");
    const [showError, setShowError] = useState(false);

    const loading = useSelector((state) => state.loading);
    const searchedPokemon = useSelector((state) => state.searchedPokemon);

    const searchPokemon = (e) => {
        setSearchTextFromInput(e.target.value);
        if (e.target.value.length > 0) {
            setShowError(false);
        }
    };

    const findPokemon = () => {
        if (searchTextFromInput.length > 0) {
            dispatch(fetchPokemon(searchTextFromInput));
            dispatch(setActivePokemon(null));
            setShowError(false);
        } else {
            setShowError(true);
        }
        setSearchTextFromInput("");
    };

    const comparePokemons = () => {
        dispatch(openComparisonMarks(true));
    };

    return (
        <div className='main-search-input'>
            <div className='main-search-input-wrapper'>
                <input
                    value={searchTextFromInput}
                    onChange={(e) => searchPokemon(e)}
                    type='text'
                    placeholder='pokemon name or id'
                />
                {showError ? <p className='main-search-input-error'>Error</p> : null}
                <button className='btn compareBtn' onClick={() => comparePokemons()}>
                    Compare Pokemons
                </button>
                {showMarks ? <div className='compare__choose'>choose 2 pokemons</div> : null}
            </div>
            {loading ? (
                <div className='pakman'>
                    <PacmanLoader color={"#fd7d24"} loading={loading} size={15} />
                </div>
            ) : (
                <button onClick={() => findPokemon()} className='btn-search'>
                    <i className='fa fa-search'></i>
                </button>
            )}
            <div
                className='search-status'
                style={{
                    display:
                        searchedPokemon && searchedPokemon.status === "not found" && !loading
                            ? "block"
                            : "none",
                }}
            >
                <img src={failure} alt='pokemon not found' />
            </div>
        </div>
    );
};

export default SearchPanel;
