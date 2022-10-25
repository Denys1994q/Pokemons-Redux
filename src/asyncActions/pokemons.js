import { randomPokemons_getPokemons } from "../components/random_Pokemons/randomPokemonsSlice";
import {
    searchPokemons_getOrderedPokemons,
    searchPokemons_getAbilityDesc,
    searchPokemons_getTypes,
} from "../components/search/searchPokemonsSlice";

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

// забрати звідси fetchAbilityDesc і fetchTypes
export const fetchAbilityDesc = name => {
    return function (dispatch) {
        fetch(`https://pokeapi.co/api/v2/ability/${name}`)
            .then(response => response.json())
            .then(data => dispatch(searchPokemons_getAbilityDesc(data)));
    };
};

// зробити її через createAsyncThunk
// export const fetchPokemon = (request, name) => {
//     return function (dispatch) {
//         dispatch(searchPokemons_showLoading(true));

//         request(`https://pokeapi.co/api/v2/pokemon/${name}`)
//             .then(data => dispatch(searchPokemons_getPokemon({ data, status: "ok" })))
//             .catch(data => dispatch(searchPokemons_pokemonFetchingError(true))) // 404, якщо не знайдено покемона
//             .finally(() => dispatch(searchPokemons_showLoading(false)));
//     };
// };

export const fetchTypes = () => {
    return function (dispatch) {
        try {
            fetch("https://pokeapi.co/api/v2/type/")
                .then(response => response.json())
                .then(data => dispatch(searchPokemons_getTypes(data.results)))
                .catch(error => console.error(error));
        } catch (e) {
            console.error("Could not fetch", e);
        }
    };
};
