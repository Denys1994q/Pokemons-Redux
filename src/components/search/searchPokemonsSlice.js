import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

const initialState = {
    openSortedBlock: false,
    addComparisonMark: false,
    pokemonsToCompare: [],
    pokemonsOrdered: [],
    pokemonsAfterFilter: [],
    abilities: {},
    searchedPokemon: null,
    loading: false,
    fetchPokemonError: false,
    types: null,
    activePokemon: null,
};

// export const fetchPokemon = (request, name) => {
//     return function (dispatch) {
//         dispatch(searchPokemons_showLoading(true));

//         request(`https://pokeapi.co/api/v2/pokemon/${name}`)
//             .then(data => dispatch(searchPokemons_getPokemon({ data, status: "ok" })))
//             .catch(data => dispatch(searchPokemons_pokemonFetchingError(true))) // 404, якщо не знайдено покемона
//             .finally(() => dispatch(searchPokemons_showLoading(false)));
//     };
// };

export const fetchPokemon = createAsyncThunk("searchPokemons/fetchPokemon", name => {
    const { request } = useHttp();
    return request(`https://pokeapi.co/api/v2/pokemon/${name}`);
});

const searchPokemonsSlice = createSlice({
    name: "searchPokemons",
    initialState,
    reducers: {
        // порівняння покемонів
        searchPokemons_openSortedBlock: state => {
            state.openSortedBlock = !state.openSortedBlock;
        },
        searchPokemons_addComparisonMark: state => {
            state.addComparisonMark = !state.addComparisonMark;
        },
        searchPokemons_addPokemonsCompare: (state, action) => {
            state.pokemonsToCompare = [...state.pokemonsToCompare, action.payload];
        },
        searchPokemons_deletePokemonsCompare: (state, action) => {
            if (action.payload === "deleteAll") {
                state.pokemonsToCompare = [];
            } else {
                state.pokemonsToCompare = state.pokemonsToCompare.filter(item => item !== action.payload);
            }
        },
        // список покемонів
        searchPokemons_getOrderedPokemons: (state, action) => {
            state.pokemonsOrdered = [...state.pokemonsOrdered, action.payload];
        },
        // фільтр покемонів
        searchPokemons_filterPokemons: (state, action) => {
            let chosenPokemons = [];
            if (action.payload === "") {
                state.pokemonsAfterFilter = state.pokemonsOrdered;
            } else {
                for (let i = 0; i < state.pokemonsOrdered.length; i++) {
                    for (let r = 0; r < state.pokemonsOrdered[i].types.length; r++) {
                        if (state.pokemonsOrdered[i].types[r].type.name === action.payload) {
                            chosenPokemons.push(state.pokemonsOrdered[i]);
                        }
                    }
                }
                state.pokemonsAfterFilter = chosenPokemons;
            }
        },
        // типи покемонів
        searchPokemons_getTypes: (state, action) => {
            state.types = action.payload;
        },
        // сортування покемонів
        searchPokemons_sortPokemons: (state, action) => {
            let ar = [...state.pokemonsAfterFilter];
            if (action.payload === "height") {
                ar.sort((a, b) => {
                    return a.height - b.height;
                });
            } else if (action.payload === "weight") {
                ar.sort((a, b) => {
                    return a.weight - b.weight;
                });
            } else if (action.payload === "experience") {
                ar.sort((a, b) => {
                    return a.base_experience - b.base_experience;
                });
            }
            state.pokemonsAfterFilter = ar;
        },
        // навички покемона
        searchPokemons_getAbilityDesc: (state, action) => {
            state.abilities = action.payload;
        },
        // пошук покемона
        // searchPokemons_getPokemon: (state, action) => {
        //     state.searchedPokemon = action.payload;
        //     state.fetchPokemonError = false;
        // },
        // searchPokemons_showLoading: state => {
        //     state.loading = true;
        // },
        // searchPokemons_pokemonFetchingError: state => {
        //     state.fetchPokemonError = true;
        //     state.loading = false;
        // },
        // активний покемон
        searchPokemons_setActivePokemon: (state, action) => {
            state.activePokemon = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPokemon.pending, state => {
                state.loading = true;
                state.fetchPokemonError = false;
            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                state.searchedPokemon = action.payload;
                state.loading = false;
                state.fetchPokemonError = false;
            })
            .addCase(fetchPokemon.rejected, state => {
                state.fetchPokemonError = true;
                state.loading = false;
            })
            .addDefaultCase(() => { }) 
    },
});

const { actions, reducer } = searchPokemonsSlice;

export default reducer;

export const {
    searchPokemons_openSortedBlock,
    searchPokemons_addComparisonMark,
    searchPokemons_addPokemonsCompare,
    searchPokemons_deletePokemonsCompare,
    searchPokemons_getOrderedPokemons,
    searchPokemons_filterPokemons,
    searchPokemons_sortPokemons,
    searchPokemons_getAbilityDesc,
    // searchPokemons_getPokemon,
    // searchPokemons_showLoading,
    // searchPokemons_pokemonFetchingError,
    searchPokemons_getTypes,
    searchPokemons_setActivePokemon,
} = actions;
