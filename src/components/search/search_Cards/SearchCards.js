import "../search_Cards/search_cards.sass";
import "../../common/modal/modal.sass";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPokemons, fetchAbilityDesc } from "../../../asyncActions/pokemons";
import {searchPokemons_setActivePokemon, searchPokemons_filterPokemons, searchPokemons_addPokemonsCompare, searchPokemons_deletePokemonsCompare} from '../searchPokemonsSlice'
// import { setActivePokemon, filterPokemons, comparePokemons, deleteComparePokemons } from "../../../store/searchReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { CSSTransition } from "react-transition-group";

import BarChart from "../../common/charts/Doughnut";
import SkeletonComponent from "../../common/skeleton/Skeleton";
import ComparePokemons from "../search_Compare/ComparePokemons";

const SearchCards = () => {
    const dispatch = useDispatch();
    // звичайні з сервера (на сторінці не показуються)
    // фільтруються (якщо нічого, записуються всі звичайні у відфільтровані)
    // сортуються відфільтровані

    const activePokemon = useSelector(state => state.searchPokemonsSlice.activePokemon);
    const pokemons = useSelector(state => state.searchPokemonsSlice.pokemonsOrdered);
    const pokemonsAfterFilter = useSelector(state => state.searchPokemonsSlice.pokemonsAfterFilter);
    const abilitiesDesc = useSelector(state => state.searchPokemonsSlice.abilities);
    const searchedPokemon = useSelector(state => state.searchPokemonsSlice.searchedPokemon);
    const pokemonsToCompareArr = useSelector(state => state.searchPokemonsSlice.pokemonsToCompare);
    const showMarks = useSelector(state => state.searchPokemonsSlice.addComparisonMark);

    const [showAbilityInfo, setShowAbilityInfo] = useState(false);
    const [animateFromList, setAnimateFromList] = useState(false);

    const addPokemonsToCompare = i => {
        if (pokemonsToCompareArr.indexOf(i) > -1) {
            dispatch(searchPokemons_deletePokemonsCompare(i));
        } else {
            dispatch(searchPokemons_addPokemonsCompare(i));
        }
    };

    const dispatchAndAnimate = i => {
        if (i !== activePokemon) {
            dispatch(searchPokemons_setActivePokemon(i));
            setAnimateFromList(true);
            if (animateFromList) {
                setAnimateFromList(false);
            }
        }
    };

    useEffect(() => {
        if (!animateFromList) {
            setAnimateFromList(true);
        }
    }, [animateFromList]);

    const showPokemons = pokemonsAfterFilter.map((item, i) => {
        return (
            <li key={i} className='cards-search-wrapper'>
                <div
                    onClick={() => dispatchAndAnimate(i)}
                    className={
                        i === activePokemon ? "cards-search-photo cards-search-photo-active" : "cards-search-photo"
                    }>
                    <LazyLoadImage
                        effect='blur'
                        src={item.sprites ? item.sprites.other.dream_world.front_default : null}
                        alt=''
                    />
                    {showMarks ? (
                        <p
                            className={
                                pokemonsToCompareArr.indexOf(i) > -1
                                    ? "cards-search-photo-comparison cards-search-photo-comparison-active"
                                    : "cards-search-photo-comparison"
                            }>
                            <FontAwesomeIcon
                                onClick={() => addPokemonsToCompare(i)}
                                icon={faBalanceScale}
                                size='lg'
                                inverse
                            />
                        </p>
                    ) : null}
                </div>
                <div className='cards-search-name'>{item.name}</div>
                <ul className='cards-search-type'>
                    {item.types.map((it, i) => {
                        return (
                            <li key={i} className={it.type.name}>
                                {it.type.name}
                            </li>
                        );
                    })}
                </ul>
            </li>
        );
    });

    useEffect(() => {
        dispatch(fetchPokemons(0, 12, true));
    }, []);

    useEffect(() => {
        dispatch(searchPokemons_filterPokemons(""));
    }, [pokemons]);

    const getInfoAboutAbilities = item => {
        dispatch(fetchAbilityDesc(item.ability.name));
        setShowAbilityInfo(true);
    };

    const content =
        searchedPokemon && !activePokemon && activePokemon !== 0 ? (
            <>
                <p className='cards-main-right-title'>{searchedPokemon.name}</p>
                <p className='cards-main-right-info'>Height: {searchedPokemon.height}</p>
                <p className='cards-main-right-info'>Weight: {searchedPokemon.weight}</p>
                <p className='cards-main-right-info'>Experience: {searchedPokemon.base_experience}</p>
                <div className='cards-main-right-info-abilities'>
                    <div className='cards-main-right-info-abilities-left'>
                        <p>Abilities:</p>
                    </div>
                    <div className='cards-main-right-info-abilities-right'>
                        <ul>
                            {searchedPokemon.abilities.map((item, i) => {
                                return (
                                    <li key={i}>
                                        {item.ability.name}{" "}
                                        <span onClick={() => getInfoAboutAbilities(item)} className='about-ability'>
                                            ?
                                        </span>{" "}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div
                        style={{ display: showAbilityInfo ? "flex" : "none" }}
                        className='cards-main-right-info-abilities-about'>
                        {abilitiesDesc.effect_entries ? abilitiesDesc.effect_entries[1].effect : 1}{" "}
                        <span onClick={() => setShowAbilityInfo(false)}>X</span>{" "}
                    </div>
                </div>
                <div className='cards-main-right-photo'>
                    <LazyLoadImage
                        effect='blur'
                        src={searchedPokemon.sprites.other.dream_world.front_default}
                        alt=''
                    />
                </div>
                {<BarChart stats={searchedPokemon.stats} />}
            </>
        ) : (
            <>
                {(pokemonsAfterFilter.length > 0 && activePokemon && pokemonsAfterFilter[activePokemon].name) ||
                activePokemon === 0 ? (
                    <>
                        <p className='cards-main-right-title'>{pokemonsAfterFilter[activePokemon].name}</p>
                        <p className='cards-main-right-info'>Height: {pokemonsAfterFilter[activePokemon].height}</p>
                        <p className='cards-main-right-info'>Weight: {pokemonsAfterFilter[activePokemon].weight}</p>
                        <p className='cards-main-right-info'>
                            Experience: {pokemonsAfterFilter[activePokemon].base_experience}
                        </p>
                        <div className='cards-main-right-info-abilities'>
                            <div className='cards-main-right-info-abilities-left'>
                                <p>Abilities:</p>
                            </div>
                            <div className='cards-main-right-info-abilities-right'>
                                <ul>
                                    {pokemonsAfterFilter[activePokemon].abilities.map((item, i) => {
                                        return (
                                            <li key={i}>
                                                {item.ability.name}
                                                <span
                                                    onClick={() => getInfoAboutAbilities(item)}
                                                    className='about-ability'>
                                                    ?
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div
                                style={{
                                    display: showAbilityInfo ? "flex" : "none",
                                }}
                                className='cards-main-right-info-abilities-about'>
                                {abilitiesDesc.effect_entries ? abilitiesDesc.effect_entries[1].effect : ""}{" "}
                                <span onClick={() => setShowAbilityInfo(false)}>X</span>{" "}
                            </div>
                        </div>
                        <CSSTransition in={animateFromList} timeout={500} classNames='scale-anim' unmountOnExit>
                            <div className='cards-main-right-photo'>
                                <LazyLoadImage
                                    effect='blur'
                                    src={pokemonsAfterFilter[activePokemon].sprites.other.dream_world.front_default}
                                />
                            </div>
                        </CSSTransition>
                        {<BarChart stats={pokemonsAfterFilter[activePokemon].stats} />}
                    </>
                ) : (
                    <div className='emptyCard'>
                        <SkeletonComponent />
                    </div>
                )}
            </>
        );

    return (
        <>
            <div className='cards-main'>
                <div className='cards-main-left'>
                    {pokemonsAfterFilter.length === 0 ? (
                        <div className='sorry-msg'>Sorry, no Pokemons found</div>
                    ) : (
                        <ul className='cards-search'>{showPokemons}</ul>
                    )}
                </div>
                <div className='cards-main-right'>{content}</div>
                {pokemonsToCompareArr.length === 2 && showMarks ? <ComparePokemons /> : null}
            </div>

            {pokemonsAfterFilter.length === pokemons.length ? (
                <button className='btn btn-center' onClick={() => dispatch(fetchPokemons(null, 12))}>
                    Show more
                </button>
            ) : null}
        </>
    );
};

export default SearchCards;
