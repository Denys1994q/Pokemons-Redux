import whoPokemon from "../../../imgs/who_pokemon.png";

import { useSelector } from "react-redux";

const PokemonsScreen = () => {
    const pokemons = useSelector(state => state.randomPokemonsSlice.pokemons);
    const activePokemon = useSelector(state => state.randomPokemonsSlice.activePokemonTimer);

    return (
        <div className='pokemons-screen'>
            {activePokemon ? (
                <>
                    <img
                        className='pokemons-screen__photo'
                        src={pokemons[activePokemon].sprites.other.dream_world.front_default}
                        alt='pokemon_of_a_day'
                    />
                    <div className='pokemons-screen__info'>
                        <p className='pokemons-screen__description'>
                            Name: <span>{pokemons[activePokemon].name}</span>
                        </p>
                        <p className='pokemons-screen__description'>Height: {pokemons[activePokemon].height}</p>
                        <p className='pokemons-screen__description'>Weight: {pokemons[activePokemon].weight}</p>
                    </div>
                </>
            ) : (
                <img className='pokemons-screen__photo' src={whoPokemon} alt='unknown_pokemon' />
            )}
        </div>
    );
};

export default PokemonsScreen;
