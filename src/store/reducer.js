import pokeball from "../imgs/pokeball.png";
let arrPokeballs = [];
for (let i = 0; i < 60; i++) {
    arrPokeballs.push({ img: pokeball });
}

const defaultState = {
    pokemons: arrPokeballs,
    activePokemonTimer: null,
    showModal: false,
    closeFirstBtn: false,
    pokemonsOrdered: [],
    pokemonsAfterFilter: [],
    abilities: {},
    searchedPokemon: null,
    loading: false,
    types: null,
    activePokemon: null,
    openSortedBlock: false,
    addComparisonMark: false,
    pokemonsToCompare: [],
};

const GET_POKEMONS = "GET_POKEMONS";
const SET_ACTIVE_POKEMON_TIMER = "SET_ACTIVE_POKEMON_TIMER";
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_FIRST_BTN = "CLOSE_FIRST_BTN";

const GET_ORDERED_POKEMONS = "GET_ORDERED_POKEMONS";
const GET_ABILITY_DESC = "GET_ABILITY_DESC";
const GET_POKEMON = "GET_POKEMON";
const SHOW_LOADING = "SHOW_LOADING";
const GET_TYPES = "GET_TYPES";
const SET_ACTIVE_POKEMON = "SET_ACTIVE_POKEMON";
const FILTER_POKEMONS = "FILTER_POKEMONS";
const SORT_POKEMONS = "SORT_POKEMONS";
const OPEN_SORTED_BLOCK = "OPEN_SORTED_BLOCK";
const ADD_COMPARISON_MARK = "ADD_COMPARISON_MARK";
const ADD_POKEMONS_COMPARE = "ADD_POKEMONS_COMPARE";
const DELETE_POKEMONS_COMPARE = "DELETE_POKEMONS_COMPARE";

let arr = [];
let orderedArr = [];
let arrPokemonsToCompare = [];

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            arr.push({ ...action.payload });
            return { ...state, pokemons: [...arr] };
        case SET_ACTIVE_POKEMON_TIMER:
            return { ...state, activePokemonTimer: action.payload };
        case OPEN_MODAL:
            return { ...state, showModal: action.payload };
        case CLOSE_FIRST_BTN:
            return { ...state, closeFirstBtn: action.payload };
        case OPEN_SORTED_BLOCK:
            return { ...state, openSortedBlock: !state.openSortedBlock };
        case ADD_COMPARISON_MARK:
            return { ...state, addComparisonMark: !state.addComparisonMark };
        case ADD_POKEMONS_COMPARE:
            arrPokemonsToCompare.push(action.payload);
            return { ...state, pokemonsToCompare: [...arrPokemonsToCompare] };
        case DELETE_POKEMONS_COMPARE:
            if (action.payload === "deleteAll") {
                arrPokemonsToCompare = [];
                return {
                    ...state,
                    pokemonsToCompare: arrPokemonsToCompare,
                };
            } else {
                for (let i = 0; i < arrPokemonsToCompare.length; i++) {
                    if (arrPokemonsToCompare[i] === action.payload) {
                        arrPokemonsToCompare.splice(i, 1);
                    }
                }
                return {
                    ...state,
                    pokemonsToCompare: arrPokemonsToCompare,
                };
            }
        case GET_ORDERED_POKEMONS:
            orderedArr.push({ ...action.payload });
            return { ...state, pokemonsOrdered: [...orderedArr] };
        case FILTER_POKEMONS:
            let chosenPokemons = [];
            if (action.payload === "") {
                return { ...state, pokemonsAfterFilter: state.pokemonsOrdered };
            } else {
                for (let i = 0; i < state.pokemonsOrdered.length; i++) {
                    for (let r = 0; r < state.pokemonsOrdered[i].types.length; r++) {
                        if (state.pokemonsOrdered[i].types[r].type.name === action.payload) {
                            chosenPokemons.push(state.pokemonsOrdered[i]);
                        }
                    }
                }
                return { ...state, pokemonsAfterFilter: chosenPokemons };
            }
        case SORT_POKEMONS:
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
            return { ...state, pokemonsAfterFilter: ar };
        case GET_ABILITY_DESC:
            return { ...state, abilities: action.payload };
        case GET_POKEMON:
            return { ...state, searchedPokemon: action.payload };
        case SHOW_LOADING:
            return { ...state, loading: action.payload };
        case GET_TYPES:
            return { ...state, types: action.payload };
        case SET_ACTIVE_POKEMON:
            return { ...state, activePokemon: action.payload };

        default:
            return state;
    }
};

export const addPokemonsFromAPI = (payload) => ({
    type: GET_POKEMONS,
    payload,
});
export const setActivePokemonTimer = (payload) => ({
    type: SET_ACTIVE_POKEMON_TIMER,
    payload,
});
export const openModal = (payload) => ({
    type: OPEN_MODAL,
    payload,
});
export const closeFirstBtn = (payload) => ({
    type: CLOSE_FIRST_BTN,
    payload,
});
export const addOrderedPokemonsFromAPI = (payload) => ({
    type: GET_ORDERED_POKEMONS,
    payload,
});
export const addAbilityDescFromAPI = (payload) => ({
    type: GET_ABILITY_DESC,
    payload,
});
export const addPokemonFromAPI = (payload) => ({ type: GET_POKEMON, payload });
export const showLoading = (payload) => ({ type: SHOW_LOADING, payload });
export const getTypes = (payload) => ({ type: GET_TYPES, payload });
export const setActivePokemon = (payload) => ({
    type: SET_ACTIVE_POKEMON,
    payload,
});
export const filterPokemons = (payload) => ({ type: FILTER_POKEMONS, payload });
export const sortPokemons = (payload) => ({ type: SORT_POKEMONS, payload });
export const showOpenSortedBlock = (payload) => ({
    type: OPEN_SORTED_BLOCK,
    payload,
});
export const openComparisonMarks = (payload) => ({ type: ADD_COMPARISON_MARK, payload });
export const comparePokemons = (payload) => ({
    type: ADD_POKEMONS_COMPARE,
    payload,
});
export const deleteComparePokemons = (payload) => ({
    type: DELETE_POKEMONS_COMPARE,
    payload,
});
