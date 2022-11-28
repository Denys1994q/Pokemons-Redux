import pokedex from "../../imgs/pokedex1.png";

import Pokemons_Btns from "./pokemons_Btns/Pokemons_Btns";
import Pokemons_Screen from "./pokemons_Screen/Pokemons_Screen";
import Pokemons_List from "./pokemons_List/PokemonsList";

const RandomPokemons = () => {
    return (
        <>
            <div className='random-pokemons'>
                <div className='random-pokemons__searchBtns'>
                    <Pokemons_Btns />
                </div>
                <div className='random-pokemons__wrapper'>
                    <div className='random-pokemons__left'>
                        <div className='random-pokemons__left-img'>
                            <img src={pokedex} alt='pokedex' />
                            <Pokemons_Screen />
                        </div>
                    </div>
                    <div className='random-pokemons__right'>
                        <Pokemons_List />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RandomPokemons;
