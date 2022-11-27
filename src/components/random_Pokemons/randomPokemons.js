// import "./random_Pokemons.sass";
import pokedex from "../../imgs/pokedex1.png";
//
import Pokemons_Btns from "./pokemons_Btns/Pokemons_Btns";
import Pokemons_Screen from "./pokemons_Screen/Pokemons_Screen";
import Pokemons_List from "./pokemons_List/PokemonsList";

const RandomPokemons = () => {
    return (
        <>
            <div className='main'>
                <div className='main-search'>
                    <Pokemons_Btns />
                </div>
                <div className='main-wrapper'>
                    <div className='main-wrapper-left'>
                        <div className='main-wrapper-left-img'>
                            <img src={pokedex} alt='pokedex' />
                            <Pokemons_Screen />
                        </div>
                    </div>
                    <div className='main-wrapper-right'>
                        <Pokemons_List />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RandomPokemons;
