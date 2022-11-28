import { randomPokemons_getPokemons } from "../components/random-pokemons/randomPokemonsSlice";
import { searchPokemons_getOrderedPokemons } from "../components/search/searchPokemonsSlice";

function fetchPokemonData(pokemon, dispatch) {
    let url = pokemon.url;
    fetch(url)
        .then(response => response.json())
        .then(data => dispatch(randomPokemons_getPokemons(data)));
}

function fetchOrderedPokemonData(pokemon, dispatch) {
    let url = pokemon.url;
    fetch(url)
        .then(response => response.json())
        .then(data => dispatch(searchPokemons_getOrderedPokemons(data)));
}

// основна ф-ія: дві зверху з різних слайсів
let n = 0;
export const fetchPokemons = (randomNumber, limit, firstTime) => {
    if (randomNumber > 0) {
        return function (dispatch) {
            fetch(`https://pokeapi.co/api/v2/pokemon/?limit=60&offset=${randomNumber}`)
                .then(response => response.json())
                .then(function (allPokemon) {
                    allPokemon.results.forEach(function (pokemon) {
                        fetchPokemonData(pokemon, dispatch);
                    });
                });
        };
    } else {
        return function (dispatch) {
            if (firstTime) {
                n = 0;
            } else {
                n += limit;
            }
            fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${n}`)
                .then(response => response.json())
                .then(function (allPokemon) {
                    allPokemon.results.forEach(function (pokemon) {
                        fetchOrderedPokemonData(pokemon, dispatch);
                    });
                });
        };
    }
};
