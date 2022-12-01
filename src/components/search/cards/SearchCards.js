import "../../common/modal/modal.sass";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPokemons } from "../../../asyncActions/pokemons";
import {
    searchPokemons_setActivePokemon,
    searchPokemons_filterPokemons,
    searchPokemons_addPokemonsCompare,
    searchPokemons_deletePokemonsCompare,
    searchPokemons_resetPokemonFromSearch,
    fetchPokemonAbilities,
} from "../searchPokemonsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale, faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { CSSTransition } from "react-transition-group";

import BarChart from "../../common/charts/Doughnut";
import SkeletonComponent from "../../common/skeleton/Skeleton";
import ComparePokemons from "../comparison/ComparePokemons";
import ClipLoader from "react-spinners/ClipLoader";

const SearchCards = () => {
    const dispatch = useDispatch();
    // звичайні з сервера (на сторінці не показуються)
    // фільтруються (якщо нічого, записуються всі звичайні у відфільтровані)
    // сортуються відфільтровані

    // покемон: зі списку, по якому клікнули
    const activePokemon = useSelector(state => state.searchPokemonsSlice.activePokemon);
    // покемон: з інпута
    const activePokemonBody = useSelector(state => state.searchPokemonsSlice.activePokemonBody);
    // навички покемона
    const abilitiesDesc = useSelector(state => state.searchPokemonsSlice.pokemonAbilities);
    const pokemonAbilitiesLoading = useSelector(state => state.searchPokemonsSlice.pokemonAbilitiesLoading);
    // список покемонів, відфільтровані за типом
    const pokemonsAfterFilter = useSelector(state => state.searchPokemonsSlice.pokemonsAfterFilter);
    // список покемонів, відстортовані за висотом, вагою чи досвідом
    const pokemons = useSelector(state => state.searchPokemonsSlice.pokemonsOrdered);
    // список покемонів, які порівнюються
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
            dispatch(searchPokemons_resetPokemonFromSearch());
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
            <li key={i} className='card-item'>
                <div
                    onClick={() => dispatchAndAnimate(i, item.name)}
                    className={i === activePokemon ? "card-item__photo card-item__photo-active" : "card-item__photo"}>
                    <LazyLoadImage
                        effect='blur'
                        src={item.sprites ? item.sprites.other.dream_world.front_default : null}
                        alt='pokemon_image'
                    />
                    {showMarks ? (
                        <p
                            className={
                                pokemonsToCompareArr.indexOf(i) > -1
                                    ? "card-item__comparison card-item__comparison-active"
                                    : "card-item__comparison"
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
                <div className='card-item__name'>{item.name}</div>
                <ul className='card-item__type'>
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
        dispatch(fetchPokemonAbilities(item.ability.name));
        setShowAbilityInfo(true);
    };

    const override = {
        display: "block",
        margin: "5px",
        marginRight: "45%",
    };

    const showNext = () => {
        if (pokemonsAfterFilter.length - 1 > activePokemon) {
            dispatch(searchPokemons_setActivePokemon(activePokemon + 1));
        }
    };

    const showPrev = () => {
        if (activePokemon != 0) {
            dispatch(searchPokemons_setActivePokemon(activePokemon - 1));
        }
    };

    // якщо покемон з пошуку, то він показується через запит до сервера. Якщо покемон зі списку вже завантажених, то запит не відбувається.
    const content =
        activePokemon || activePokemon === 0 || activePokemonBody ? (
            <div className='active-card'>
                {activePokemonBody ? null : (
                    <>
                        <div className='active-card__arrow-left'>
                            <FontAwesomeIcon
                                icon={faArrowAltCircleLeft}
                                onClick={() => showPrev()}
                                size='2x'
                                color='black'
                            />
                        </div>
                        <div className='active-card__arrow-right'>
                            <FontAwesomeIcon
                                icon={faArrowAltCircleRight}
                                onClick={() => showNext()}
                                size='2x'
                                color='black'
                            />
                        </div>
                    </>
                )}
                <div className='active-card__top'>
                    <div className='active-card__left'>
                        <p className='active-card__title'>
                            {activePokemonBody ? activePokemonBody.name : pokemonsAfterFilter[activePokemon].name}
                        </p>
                        <p className='active-card__text'>
                            Height:
                            {activePokemonBody ? activePokemonBody.height : pokemonsAfterFilter[activePokemon].height}
                        </p>
                        <p className='active-card__text'>
                            Weight:
                            {activePokemonBody ? activePokemonBody.weight : pokemonsAfterFilter[activePokemon].weight}
                        </p>
                        <p className='active-card__text'>
                            Experience:
                            {activePokemonBody
                                ? activePokemonBody.base_experience
                                : pokemonsAfterFilter[activePokemon].base_experience}
                        </p>
                    </div>
                    <CSSTransition in={animateFromList} timeout={500} classNames='scale-anim' unmountOnExit>
                        <div className='active-card__right'>
                            <LazyLoadImage
                                effect='blur'
                                src={
                                    activePokemonBody
                                        ? activePokemonBody.sprites.other.dream_world.front_default
                                        : pokemonsAfterFilter[activePokemon].sprites.other.dream_world.front_default
                                }
                            />
                        </div>
                    </CSSTransition>
                </div>
                <div className='active-card__abilities'>
                    <div className='active-card__abilities-left'>
                        <p>Abilities:</p>
                    </div>
                    <div className='active-card__abilities-right'>
                        <ul>
                            {activePokemonBody
                                ? activePokemonBody.abilities.map((item, i) => {
                                      return (
                                          <li key={i} className='active-card__ability'>
                                              {item.ability.name}
                                              <span onClick={() => getInfoAboutAbilities(item)}>?</span>
                                          </li>
                                      );
                                  })
                                : pokemonsAfterFilter[activePokemon].abilities.map((item, i) => {
                                      return (
                                          <li key={i} className='active-card__ability'>
                                              {item.ability.name}
                                              <span onClick={() => getInfoAboutAbilities(item)}>?</span>
                                          </li>
                                      );
                                  })}
                        </ul>
                    </div>
                    <div
                        style={{
                            display: showAbilityInfo ? "flex" : "none",
                        }}
                        className='active-card__abilities-about'>
                        {pokemonAbilitiesLoading ? (
                            <div>
                                <ClipLoader
                                    color={"#fd7d24"}
                                    loading={pokemonAbilitiesLoading}
                                    size={30}
                                    cssOverride={override}
                                />
                            </div>
                        ) : abilitiesDesc.effect_entries ? (
                            abilitiesDesc.effect_entries[1].effect
                        ) : (
                            <div>Sorry, something goes wrong</div>
                        )}
                        <span onClick={() => setShowAbilityInfo(false)}>X</span>{" "}
                    </div>
                </div>
                {
                    <BarChart
                        stats={activePokemonBody ? activePokemonBody.stats : pokemonsAfterFilter[activePokemon].stats}
                    />
                }
            </div>
        ) : (
            <div className='emptyCard'>
                <SkeletonComponent />
            </div>
        );

    return (
        <>
            <div className='cards'>
                <div className='cards__left'>
                    {pokemonsAfterFilter.length === 0 ? (
                        <div className='sorry-msg'>Sorry, no Pokemons found</div>
                    ) : (
                        <ul className='cards__list'>{showPokemons}</ul>
                    )}
                </div>
                <div className='cards__right'>{content}</div>
                {pokemonsToCompareArr.length === 2 && showMarks ? <ComparePokemons /> : null}
            </div>
            {pokemonsAfterFilter.length === pokemons.length ? (
                <button className='btn btn-showMore' onClick={() => dispatch(fetchPokemons(null, 12))}>
                    Show more
                </button>
            ) : null}
        </>
    );
};

export default SearchCards;
