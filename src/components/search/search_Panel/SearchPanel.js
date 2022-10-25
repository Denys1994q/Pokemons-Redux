import "../search_Panel/search_Panel.sass";
import failure from "../../../imgs/sad.jpg";
//
import { useHttp } from "../../../hooks/http.hook";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPokemons_setActivePokemon, searchPokemons_addComparisonMark, fetchPokemon } from "../searchPokemonsSlice";

const SearchPanel = () => {
    const dispatch = useDispatch();

    const { request } = useHttp();

    const showMarks = useSelector(state => state.searchPokemonsSlice.addComparisonMark);

    const [searchTextFromInput, setSearchTextFromInput] = useState("");
    const [showError, setShowError] = useState(false);

    const loading = useSelector(state => state.searchPokemonsSlice.searchedPokemonLoading);
    const pokemonLoadingError = useSelector(state => state.searchPokemonsSlice.searchedPokemonError);
    // const searchedPokemon = useSelector(state => state.searchPokemonsSlice.searchedPokemon);

    const searchPokemon = e => {
        setSearchTextFromInput(e.target.value);
        if (e.target.value.length > 0) {
            setShowError(false);
        }
    };

    const findPokemon = () => {
        if (searchTextFromInput.length > 0) {
            dispatch(fetchPokemon(searchTextFromInput));
            dispatch(searchPokemons_setActivePokemon(null));
            setShowError(false);
        } else {
            setShowError(true);
        }
        setSearchTextFromInput("");
    };

    const comparePokemons = () => {
        dispatch(searchPokemons_addComparisonMark(true));
    };

    return (
        <div className='main-search-input'>
            <div className='main-search-input-wrapper'>
                <input
                    value={searchTextFromInput}
                    onChange={e => searchPokemon(e)}
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
            {pokemonLoadingError ? (
                <div className='search-status'>
                    <img src={failure} alt='pokemon not found' />
                </div>
            ) : null}
        </div>
    );
};

export default SearchPanel;
