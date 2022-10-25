// import pokeball from "../imgs/pokeball.png";
// let arrPokeballs = [];
// for (let i = 0; i < 60; i++) {
//     arrPokeballs.push({ img: pokeball });
// }

// const defaultState = {
//     pokemons: arrPokeballs,
//     activePokemonTimer: null,
//     showModal: false,
//     closeFirstBtn: false,
// };

// const GET_POKEMONS = "GET_POKEMONS";
// const SET_ACTIVE_POKEMON_TIMER = "SET_ACTIVE_POKEMON_TIMER";
// const OPEN_MODAL = "OPEN_MODAL";
// const CLOSE_FIRST_BTN = "CLOSE_FIRST_BTN";

// let arr = [];

// const randomPokemonsReducer = (state = defaultState, action) => {
//     switch (action.type) {
//         case GET_POKEMONS:
//             arr.push({ ...action.payload });
//             return { ...state, pokemons: [...arr] };
//         case SET_ACTIVE_POKEMON_TIMER:
//             return { ...state, activePokemonTimer: action.payload };
//         case OPEN_MODAL:
//             return { ...state, showModal: action.payload };
//         case CLOSE_FIRST_BTN:
//             return { ...state, closeFirstBtn: action.payload };
//         default:
//             return state;
//     }
// };

// export const addPokemonsFromAPI = (payload) => ({
//     type: GET_POKEMONS,
//     payload,
// });
// export const setActivePokemonTimer = (payload) => ({
//     type: SET_ACTIVE_POKEMON_TIMER,
//     payload,
// });
// export const openModal = (payload) => ({
//     type: OPEN_MODAL,
//     payload,
// });
// export const closeFirstBtn = (payload) => ({
//     type: CLOSE_FIRST_BTN,
//     payload,
// });

// export default randomPokemonsReducer;