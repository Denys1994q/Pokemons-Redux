import pokedex from "../../imgs/pokedex1.png";

import Btns from "./btns/Pokemons_Btns";
import Screen from "./screen/Pokemons_Screen";
import List from "./list/PokemonsList";

const RandomPokemons = () => {
    return (
        <>
            <div className='random-pokemons'>
                <div className='random-pokemons__searchBtns'>
                    <Btns />
                </div>
                <div className='random-pokemons__wrapper'>
                    <div className='random-pokemons__left'>
                        <div className='random-pokemons__left-imgWrapper'>
                            <img className='random-pokemons__left-img' src={pokedex} alt='pokedex' />
                            <Screen />
                        </div>
                    </div>
                    <div className='random-pokemons__right'>
                        <List />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RandomPokemons;
