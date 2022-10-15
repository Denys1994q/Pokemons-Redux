import { addPokemonsFromAPI } from "../store/reducer";
import {addOrderedPokemonsFromAPI} from "../store/reducer";
import {addAbilityDescFromAPI} from "../store/reducer";
import {addPokemonFromAPI} from "../store/reducer";
import {showLoading} from "../store/reducer";
import {getTypes} from "../store/reducer";

function fetchPokemonData(pokemon, dispatch){
    let url = pokemon.url
      fetch(url)
      .then(response => response.json())
      .then(data => dispatch(addPokemonsFromAPI(data)))
}

function fetchOrderedPokemonData(pokemon, dispatch){
  let url = pokemon.url
    fetch(url)
    .then(response => response.json())
    .then(data => dispatch(addOrderedPokemonsFromAPI(data)))
}

let n = 0;
export const fetchPokemons = (randomNumber, limit, firstTime) => {
  if (randomNumber > 0) {
    return function (dispatch) {
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=60&offset=${randomNumber}`)
        .then((response) => response.json())
        .then(function(allPokemon) {
          allPokemon.results.forEach(function(pokemon){
              fetchPokemonData(pokemon, dispatch); 
            })
        })
    };
  } else {
    return function (dispatch) {
      if (firstTime) {
        n = 0
      }
      else {
        n+=limit;
      }
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${n}`)
        .then((response) => response.json())
        .then(function(allPokemon) {
          allPokemon.results.forEach(function(pokemon){
            fetchOrderedPokemonData(pokemon, dispatch); 
            })
        })
    };
  }
};

export const fetchAbilityDesc = (name) => {
  return function(dispatch) {
    fetch(`https://pokeapi.co/api/v2/ability/${name}`)
    .then((response) => response.json())
    .then(data =>  dispatch(addAbilityDescFromAPI(data)) )
  }
}

export const fetchPokemon = (name) => {
  return function(dispatch) {
    dispatch(showLoading(true))
    try {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then(data => dispatch(addPokemonFromAPI({data, status: 'ok'})) )
      .catch(data => dispatch(addPokemonFromAPI({data, status: 'not found'})))
      .finally(() => dispatch(showLoading(false)))
    }
    catch(e) {
      console.log(e)
    }
  }
}

export const fetchTypes = () => {
  return function(dispatch) {
    try {
      fetch('https://pokeapi.co/api/v2/type/')
      .then((response) => response.json())
      .then(data => dispatch(getTypes(data.results)) )
      .catch(error => console.log(error))
    }
    catch(e) {
      console.log(e)
    }
  }
}

