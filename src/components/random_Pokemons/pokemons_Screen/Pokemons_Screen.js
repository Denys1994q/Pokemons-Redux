import whoPokemon from "../../../imgs/who_pokemon.png";

import { useSelector } from "react-redux";

const PokemonsScreen = () => {
    const pokemons = useSelector(state => state.randomPokemonsSlice.pokemons);
    const activePokemon = useSelector(state => state.randomPokemonsSlice.activePokemonTimer);

    return (
        <div className='random-pokemons__left-img-screen'>
            {activePokemon ? (
                <>
                    <img src={pokemons[activePokemon].sprites.other.dream_world.front_default} alt='pokemon_of_a_day' />
                    <div className='random-pokemons__left-img-screen-info'>
                        <p>
                            Name: <span>{pokemons[activePokemon].name}</span>
                        </p>
                        <p>Height: {pokemons[activePokemon].height}</p>
                        <p>Weight: {pokemons[activePokemon].weight}</p>
                    </div>
                </>
            ) : (
                <img src={whoPokemon} alt='unknown_pokemon' />
            )}
        </div>
    );
};

export default PokemonsScreen;
