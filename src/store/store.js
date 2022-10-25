// import { createStore, combineReducers, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import { reducer } from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

import randomPokemonsSlice from "../components/random_Pokemons/randomPokemonsSlice";
import searchPokemonsSlice from "../components/search/searchPokemonsSlice";

// const rootReducer = combineReducers({
//     randomPokemons: randomPokemonsReducer,
//     search: searchReducer,
// });

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export const store = configureStore({
    reducer: {
        randomPokemonsSlice,
        searchPokemonsSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});
