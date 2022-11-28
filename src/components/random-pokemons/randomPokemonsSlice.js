import { createSlice } from "@reduxjs/toolkit";

import pokeball from "../../imgs/pokeball.png";
let arrPokeballs = [];
for (let i = 0; i < 60; i++) {
    arrPokeballs.push({ img: pokeball });
}

const initialState = {
    pokemons: arrPokeballs,
    activePokemonTimer: null,
    showModal: false,
    closeFirstBtn: false,
};

let arr = [];

const randomPokemonsSlice = createSlice({
    name: "randomPokemons",
    initialState,
    reducers: {
        randomPokemons_getPokemons: (state, action) => {
            arr.push({ ...action.payload });
            state.pokemons = [...arr];
        },
        randomPokemons_setActivePokemonTimer: (state, action) => {
            state.activePokemonTimer = action.payload;
        },
        randomPokemons_openModal: (state, action) => {
            state.showModal = action.payload;
        },
        randomPokemons_closeFirstBtn: (state, action) => {
            state.closeFirstBtn = action.payload;
        },
    },
});

const { actions, reducer } = randomPokemonsSlice;

export default reducer;

export const {
    randomPokemons_getPokemons,
    randomPokemons_setActivePokemonTimer,
    randomPokemons_openModal,
    randomPokemons_closeFirstBtn,
} = actions;
