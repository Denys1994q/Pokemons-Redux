import PokemonCard from "./pokemonCard/PokemonCard";
import { useSelector } from "react-redux";

const PokemonsList = () => {
    const activePokemon = useSelector((state) => state.randomPokemonsSlice.activePokemonTimer);
    const pokemons = useSelector((state) => state.randomPokemonsSlice.pokemons);
    const showPokeballs = useSelector((state) => state.randomPokemonsSlice.closeFirstBtn);

    return (
        <ul style={{ display: showPokeballs ? "grid" : "none" }} className='main-cards'>
            {pokemons.length > 0
                ? pokemons.map((item, i) => {
                      return <PokemonCard key={i} item={item} i={i} active={activePokemon} />;
                  })
                : null}
        </ul>
    );
};

export default PokemonsList;
