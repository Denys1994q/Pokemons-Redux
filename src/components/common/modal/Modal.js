import "../modal/modal.sass";

import { randomPokemons_openModal } from "../../random_Pokemons/randomPokemonsSlice";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

const Modal = () => {
    const dispatch = useDispatch();

    const showModal = useSelector((state) => state.randomPokemonsSlice.showModal);
    const pokemons = useSelector((state) => state.randomPokemonsSlice.pokemons);
    const activePokemon = useSelector((state) => state.randomPokemonsSlice.activePokemonTimer);

    const abilities = activePokemon
        ? pokemons[activePokemon].abilities.map((item, i) => {
              return <li key={i}>- {item.ability.name}</li>;
          })
        : null;

    return (
        <>
            {showModal ? (
                <CSSTransition in={showModal} timeout={4000} classNames='my-modal'>
                    <div onClick={() => dispatch(randomPokemons_openModal(false))} className='modal-wrapper'>
                        <div className='modall'>
                            <p>Pokemon of a day</p>
                            <p className='modall-title'>
                                {activePokemon ? pokemons[activePokemon].name : null}
                            </p>
                            <div className='modall-photo'>
                                <img
                                    src={
                                        activePokemon
                                            ? pokemons[activePokemon].sprites.other.dream_world
                                                  .front_default
                                            : null
                                    }
                                    alt=''
                                />
                            </div>
                            <ul>Abilities:{abilities}</ul>
                            <ul>
                                Experience:{" "}
                                {activePokemon ? pokemons[activePokemon].base_experience : null}
                            </ul>
                        </div>
                        <div onClick={() => dispatch(randomPokemons_openModal(false))} className='overlay'></div>
                    </div>
                </CSSTransition>
            ) : null}
        </>
    );
};

export default Modal;
