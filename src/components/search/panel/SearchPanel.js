import failure from "../../../imgs/sad.jpg";

import { useHttp } from "../../../hooks/http.hook";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    searchPokemons_setActivePokemon,
    searchPokemons_addComparisonMark,
    fetchPokemon,
} from "../searchPokemonsSlice";

const SearchPanel = () => {
    const dispatch = useDispatch();

    const { request } = useHttp();

    const showMarks = useSelector(state => state.searchPokemonsSlice.addComparisonMark);

    const [searchTextFromInput, setSearchTextFromInput] = useState("");
    const [showError, setShowError] = useState(false);

    const loading = useSelector(state => state.searchPokemonsSlice.searchedPokemonLoading);
    const pokemonLoadingError = useSelector(state => state.searchPokemonsSlice.searchedPokemonError);

    const searchPokemon = e => {
        setSearchTextFromInput(e.target.value);
        if (e.target.value.length > 0) {
            setShowError(false);
        }
    };

    const findPokemon = () => {
        if (searchTextFromInput.length > 0) {
            dispatch(fetchPokemon(searchTextFromInput));
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
        <div className='search-panel'>
            <div className='search-panel__wrapper'>
                <input
                    className='search-panel__input'
                    value={searchTextFromInput}
                    onChange={e => searchPokemon(e)}
                    type='text'
                    placeholder='pokemon name or id'
                />
                {showError ? <p className='search-panel__error'>Error</p> : null}
                {showMarks ? <div className='search-panel__compare'>select 2 pokemons from a list</div> : null}
                {loading ? (
                    <div className='search-panel__spinner'>
                        <PacmanLoader color={"#fd7d24"} loading={loading} size={15} />
                    </div>
                ) : (
                    <button onClick={() => findPokemon()} className='btn btn-search'>
                        <i className='fa fa-search'></i>
                    </button>
                )}
                {pokemonLoadingError ? (
                    <div className='search-panel__status'>
                        <img src={failure} alt='pokemon not found' />
                    </div>
                ) : null}
            </div>
            <button className='btn btn-compareBtn' onClick={() => comparePokemons()}>
                Compare Pokemons
            </button>
        </div>
    );
};

export default SearchPanel;
