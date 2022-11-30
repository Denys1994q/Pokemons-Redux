import "../../common/modal/modal.sass";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPokemons } from "../../../asyncActions/pokemons";
import {
    searchPokemons_setActivePokemon,
    searchPokemons_filterPokemons,
    searchPokemons_addPokemonsCompare,
    searchPokemons_deletePokemonsCompare,
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

    // покемон, по якому клікнули
    const activePokemon = useSelector(state => state.searchPokemonsSlice.activePokemon);
    // навички покемона, по якому клікнули
    const abilitiesDesc = useSelector(state => state.searchPokemonsSlice.pokemonAbilities);
    const pokemonAbilitiesLoading = useSelector(state => state.searchPokemonsSlice.pokemonAbilitiesLoading);
    // список відфільтровані покемони за типом
    const pokemonsAfterFilter = useSelector(state => state.searchPokemonsSlice.pokemonsAfterFilter);
    // список відстортовані покемони за висотом, вагою чи досвідом
    const pokemons = useSelector(state => state.searchPokemonsSlice.pokemonsOrdered);
    // покемон з списку пошуку
    const searchedPokemon = useSelector(state => state.searchPokemonsSlice.searchedPokemon);
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
                    onClick={() => dispatchAndAnimate(i)}
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

    // якщо клік на останнього відкритого покемона, то нічого. Якщо відкрили, то далі йде.
    // якщо довжина покемонсАфтерФільтр більше актівпокемон
    const showNext = () => {
        if (pokemonsAfterFilter.length-1 > activePokemon) {
            console.log(1);
            dispatch(searchPokemons_setActivePokemon(activePokemon + 1));
        }
    };

    const showPrev = () => {
        if (activePokemon != 0) {
            dispatch(searchPokemons_setActivePokemon(activePokemon - 1));
        }
    };

    // якщо з пошуку покемон, то він. А якщо з списку, то інший. А треба, щоб це був один показник. Щоб з пошуку записувався в активний покемон. Видалити searchedPokemon, залишити aсtivePokemon
    const content =
        searchedPokemon && !activePokemon && activePokemon !== 0 ? (
            <div className='active-card'>
                <div className='active-card__top'>
                    <div className='active-card__left'>
                        <p className='active-card__title'>{searchedPokemon.name}</p>
                        <p className='active-card__text'>Height: {searchedPokemon.height}</p>
                        <p className='active-card__text'>Weight: {searchedPokemon.weight}</p>
                        <p className='active-card__text'>Experience: {searchedPokemon.base_experience}</p>
                    </div>
                    <div className='active-card__right'>
                        <LazyLoadImage
                            effect='blur'
                            src={searchedPokemon.sprites.other.dream_world.front_default}
                            alt='pokemon-photo'
                        />
                    </div>
                </div>
                <div className='active-card__abilities'>
                    <div className='active-card__abilities-left'>
                        <p>Abilities:</p>
                    </div>
                    <div className='active-card__abilities-right'>
                        <ul>
                            {searchedPokemon.abilities.map((item, i) => {
                                return (
                                    <li key={i} className='active-card__ability'>
                                        {item.ability.name} <span onClick={() => getInfoAboutAbilities(item)}>?</span>{" "}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div
                        style={{ display: showAbilityInfo ? "flex" : "none" }}
                        className='cards-main-right-info-abilities-about'>
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
                        <span onClick={() => setShowAbilityInfo(false)}>X</span>
                    </div>
                </div>
                {<BarChart stats={searchedPokemon.stats} />}
            </div>
        ) : (
            <>
                {(pokemonsAfterFilter.length > 0 && activePokemon && pokemonsAfterFilter[activePokemon].name) ||
                activePokemon === 0 ? (
                    <div className='active-card'>
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
                        <div className='active-card__top'>
                            <div className='active-card__left'>
                                <p className='active-card__title'>{pokemonsAfterFilter[activePokemon].name}</p>
                                <p className='active-card__text'>Height: {pokemonsAfterFilter[activePokemon].height}</p>
                                <p className='active-card__text'>Weight: {pokemonsAfterFilter[activePokemon].weight}</p>
                                <p className='active-card__text'>
                                    Experience: {pokemonsAfterFilter[activePokemon].base_experience}
                                </p>
                            </div>
                            <CSSTransition in={animateFromList} timeout={500} classNames='scale-anim' unmountOnExit>
                                <div className='active-card__right'>
                                    <LazyLoadImage
                                        effect='blur'
                                        src={pokemonsAfterFilter[activePokemon].sprites.other.dream_world.front_default}
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
                                    {pokemonsAfterFilter[activePokemon].abilities.map((item, i) => {
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
                        {<BarChart stats={pokemonsAfterFilter[activePokemon].stats} />}
                    </div>
                ) : (
                    <div className='emptyCard'>
                        <SkeletonComponent />
                    </div>
                )}
            </>
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
