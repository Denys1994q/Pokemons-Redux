import { configureStore } from "@reduxjs/toolkit";

import randomPokemonsSlice from "../components/random-pokemons/randomPokemonsSlice";
import searchPokemonsSlice from "../components/search/searchPokemonsSlice";

export const store = configureStore({
    reducer: {
        randomPokemonsSlice,
        searchPokemonsSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});
