import { fetchPokemons } from "../../../asyncActions/pokemons";
import { setActivePokemonTimer } from "../../../store/reducer";
import { closeFirstBtn } from "../../../store/reducer";
import { openModal } from "../../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from '../../common/modal/Modal'

const Pokemons_Btns = () => {
    const dispatch = useDispatch();

    const closedFirstBtn = useSelector((state) => state.closeFirstBtn);

    const [closeSecondBtn, setCloseSecondBtn] = useState(true);
    const [closeThirdBtn, setCloseThirdBtn] = useState(true);

    const getPokemons = () => {
        const randomNumber = Math.floor(Math.random() * (600 - 1) + 1);
        dispatch(fetchPokemons(randomNumber));

        setCloseSecondBtn(true);
        setCloseThirdBtn(false);
    };

    const getPokemon = () => {
        setRunTimer(true);
        setCloseThirdBtn(true);
    };

    const getEmptyPokeballs = () => {
        dispatch(closeFirstBtn(true));
        setCloseSecondBtn(false);
    };

    const [runTimer, setRunTimer] = useState(false);

    let i = 0;

    useEffect(() => {
        const timer = setInterval(() => {
            if (runTimer) {
                i++;
                const random = Math.floor(Math.random() * (60 - 0) + 0);
                dispatch(setActivePokemonTimer(random));
            }
            if (i === 25) {
                dispatch(openModal(true));

                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, [runTimer]);

    return (
        <>
            <button
                disabled={closedFirstBtn}
                className='btn-background-slide'
                onClick={() => getEmptyPokeballs()}
            >
                Get pokeballs
            </button>
            <button
                disabled={closeSecondBtn}
                onClick={() => getPokemons()}
                className='btn-background-slide'
            >
                Open
            </button>
            <button
                disabled={closeThirdBtn}
                onClick={() => getPokemon()}
                className=' btn-background-slide'
            >
                Get Pokemon
            </button>
            <Modal />
        </>
    );
};

export default Pokemons_Btns;