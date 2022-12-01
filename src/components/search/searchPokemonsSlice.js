import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

const initialState = {
    // стилі: сортування
    openSortedBlock: false,
    // стилі: порівняння
    addComparisonMark: false,
    // список: покемони для порівняння
    pokemonsToCompare: [],
    // список: відсортовані покемони
    pokemonsOrdered: [],
    // cписок: фідфільтровані покемони
    pokemonsAfterFilter: [],
    // навички покемона
    pokemonAbilities: {},
    pokemonAbilitiesLoading: false,
    pokemonAbilitiesError: false,
    // покемон з інпута для пошуку
    resetPokemon: false,
    searchedPokemonLoading: false,
    searchedPokemonError: false,
    // типи покемонів для селекта
    pokemonTypes: [],
    pokemonTypesLoading: null,
    pokemonTypesError: null,
    // покемон зі списку завантажених
    activePokemon: null,
    // покемон з інпута для пошуку
    activePokemonBody: null,
};

export const fetchPokemon = createAsyncThunk("searchPokemons/fetchPokemon", name => {
    const { request } = useHttp();
    return request(`https://pokeapi.co/api/v2/pokemon/${name}`);
});

export const fetchPokemonAbilities = createAsyncThunk("searchPokemons/fetchPokemonAbilities", name => {
    const { request } = useHttp();
    return request(`https://pokeapi.co/api/v2/ability/${name}`);
});

export const fetchPokemonTypes = createAsyncThunk("searchPokemons/fetchPokemonTypes", () => {
    const { request } = useHttp();
    return request("https://pokeapi.co/api/v2/type/");
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
        // активний покемон
        searchPokemons_setActivePokemon: (state, action) => {
            state.activePokemon = action.payload;
        },
        searchPokemons_resetPokemonFromSearch: state => {
            state.activePokemonBody = null;
        },
    },
    extraReducers: builder => {
        builder // пошук покемона по інпуту
            .addCase(fetchPokemon.pending, state => {
                state.searchedPokemonLoading = true;
                state.searchedPokemonError = false;
            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                state.activePokemonBody = action.payload;
                state.searchedPokemonLoading = false;
                state.searchedPokemonError = false;
            })
            .addCase(fetchPokemon.rejected, state => {
                state.searchedPokemonError = true;
                state.searchedPokemonLoading = false;
            });
        builder // абілітіс покемона
            .addCase(fetchPokemonAbilities.pending, state => {
                state.pokemonAbilitiesLoading = true;
                state.pokemonAbilitiesError = false;
            })
            .addCase(fetchPokemonAbilities.fulfilled, (state, action) => {
                state.pokemonAbilities = action.payload;
                state.pokemonAbilitiesLoading = false;
                state.pokemonAbilitiesError = false;
            })
            .addCase(fetchPokemonAbilities.rejected, state => {
                state.pokemonAbilitiesError = true;
                state.pokemonAbilitiesLoading = false;
            });
        builder // типи покемонів
            .addCase(fetchPokemonTypes.pending, state => {
                state.pokemonTypesLoading = true;
                state.pokemonTypesError = false;
            })
            .addCase(fetchPokemonTypes.fulfilled, (state, action) => {
                state.pokemonTypes = action.payload;
                state.pokemonTypesLoading = false;
                state.pokemonTypesError = false;
            })
            .addCase(fetchPokemonTypes.rejected, state => {
                state.pokemonTypesError = true;
                state.pokemonTypesLoading = false;
            })
            .addDefaultCase(() => {});
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
    searchPokemons_setActivePokemon,
    searchPokemons_resetPokemonFromSearch,
} = actions;
