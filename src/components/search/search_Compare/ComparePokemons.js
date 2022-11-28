import { useSelector, useDispatch } from "react-redux";
import { searchPokemons_addComparisonMark, searchPokemons_deletePokemonsCompare } from "../searchPokemonsSlice";
import vs from "../../../imgs/vs.webp";

const ComparePokemons = () => {
    const dispatch = useDispatch();

    const pokemonsAfterFilter = useSelector(state => state.searchPokemonsSlice.pokemonsAfterFilter);
    const pokemonsToCompareArr = useSelector(state => state.searchPokemonsSlice.pokemonsToCompare);

    const closeAndCleanArr = () => {
        dispatch(searchPokemons_addComparisonMark(false));
        dispatch(searchPokemons_deletePokemonsCompare("deleteAll"));
    };

    return (
        <>
            <div className='compare'></div>
            <div className='compare__text'>
                <span className='compare__close' onClick={() => closeAndCleanArr()}>
                    X
                </span>
                <div className='compare__text__left'>
                    <img
                        src={pokemonsAfterFilter[pokemonsToCompareArr[0]].sprites.other.dream_world.front_default}
                        alt=''
                    />
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[0]].name}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[0]].height}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[0]].weight}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[0]].base_experience}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[0]].stats[0].base_stat}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[0]].stats[1].base_stat}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[0]].stats[2].base_stat}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[0]].stats[3].base_stat}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[0]].stats[4].base_stat}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[0]].stats[5].base_stat}</span>
                    </p>
                </div>
                <div className='compare__text__center'>
                    <img src={vs} alt='' />
                    <p>Name</p>
                    <p>Height</p>
                    <p>Weight</p>
                    <p>Experience</p>
                    <p>Health</p>
                    <p>Attack</p>
                    <p>Defense</p>
                    <p>Special Attack</p>
                    <p>Special Defence</p>
                    <p>Speed</p>
                </div>
                <div className='compare__text__right'>
                    <img
                        src={pokemonsAfterFilter[pokemonsToCompareArr[1]].sprites.other.dream_world.front_default}
                        alt=''
                    />
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[1]].name}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[1]].height}</span>{" "}
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[1]].weight}</span>{" "}
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[1]].base_experience}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[1]].stats[0].base_stat}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[1]].stats[1].base_stat}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[1]].stats[2].base_stat}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[1]].stats[3].base_stat}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[1]].stats[4].base_stat}</span>
                    </p>
                    <p>
                        <span>{pokemonsAfterFilter[pokemonsToCompareArr[1]].stats[5].base_stat}</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default ComparePokemons;
