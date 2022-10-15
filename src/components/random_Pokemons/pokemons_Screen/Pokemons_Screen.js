import whoPokemon from "../../../imgs/who_pokemon.png";
//
import { useSelector } from "react-redux";

const PokemonsScreen = () => {
    const pokemons = useSelector((state) => state.pokemons);
    const activePokemon = useSelector((state) => state.activePokemonTimer);

    return (
        <div className='main-wrapper-left-img-screen'>
            {activePokemon ? (
                <>
                    <img
                        src={pokemons[activePokemon].sprites.other.dream_world.front_default}
                        alt='pokemon_of_a_day'
                    />
                    <div className='main-wrapper-left-img-screen-info'>
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
